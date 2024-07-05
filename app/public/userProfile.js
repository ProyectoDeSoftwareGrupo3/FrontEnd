import { getToken, parseJwt } from './token.js';


const apiUrl = 'https://localhost:7055/api/Animal';
const userUrl = 'https://localhost:7054/api/User';

let allAnimals = [];
const user= 

document.addEventListener('DOMContentLoaded', async () => {
	const scrollContainer = document.querySelector('.scroll-container');
    const prev = document.querySelector('.control.prev');
	const next = document.querySelector('.control.next');

	prev.addEventListener('click', () => {
		scrollContainer.scrollLeft -= 500
	})

	next.addEventListener('click', () => {
		scrollContainer.scrollLeft += 500
	})
	const token = getToken();
	const decodedToken = parseJwt(token);
	const userId = decodedToken.uid;
	loadAnimalsByUser(userId);
	const user= await fetchUserDataById(userId);
	updateUserData(user);

	document.getElementById('userEdit').addEventListener('click', async (event) => {
		editUser(user)
	});

	
	document.querySelector('.default-card').addEventListener('click', () => {
		const adoptionModal = new bootstrap.Modal(document.getElementById('adoptionModal'));
		adoptionModal.show();
	  });
	

});

function loadAnimalsByUser(userId) {
	const url = `${apiUrl}/GetAnimalList?userId=${userId}`;
	const arrowLeft = document.getElementById('prev');
	const arrowRight = document.getElementById('pos');
  
	fetch(url)
	  .then(response => response.json())
	  .then(data => {
		allAnimals = data;
		renderAnimals(allAnimals.reverse());
  
		if (allAnimals.length <= 2) {
			arrowLeft.style.display = 'none';
			arrowRight.style.display = 'none';
		}
	  })
	  .catch(error => {
		console.error('Error fetching data:', error); 
	  });
}


async function fetchUserDataById(userId) {
    try {
        const response = await fetch(`${userUrl}/${userId}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error fetching user data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
	
}

function updateUserData(user) {
    const userName = document.getElementById('user-name');
    const userLocalidad = document.getElementById('user-localidad');
    const userEmail = document.getElementById('user-email');
	const userAddress = document.getElementById('user-address')

    userName.textContent = `${user.firstName} ${user.lastName}`;
    userLocalidad.textContent = `Localidad: ${user.city}`;
    userEmail.textContent = `Email: ${user.email}`;
	userAddress.textContent = `Direccion: ${user.address}`;
}





function renderAnimals(animals) {
	const container = document.getElementById('animal-cards-container');
	container.querySelectorAll('.animalCard:not(.default-card)').forEach(card => card.remove());
	if(animals.length > 0)
		{
			animals.forEach(animal => {
				const card = document.createElement('div');
				card.classList.add('col-lg-4', 'mb-4', 'd-flex', 'fade-in' , 'animalCard'); 
				card.innerHTML = `
				<div class="card border-0 flex-fill d-flex flex-column" type="button" id="animal-card" data-animal='${JSON.stringify(animal)}'>
					<div class="card-header position-relative border-0 p-0 mb-4 image-container">
					<img src="${animal.media[0]?.url || 'default-image.jpg'}" class="animal-image" alt="${animal.nombre}" />
					</div>
					<div class="card-body text-center p-0 flex-fill d-flex flex-column">
					<ul class="list-group list-group-flush mb-4">
						<li class="list-group-item p-2">
						<i class="fa fa-heart text-secondary mr-2"></i> ${animal.nombre.toUpperCase()}
						</li>
						<!--<li class="list-group-item p-2">
						<i class="text-secondary mr-2"></i> ${animal.edad} años
						</li>
						<li class="list-group-item p-2">
						<i class="text-secondary mr-2"></i> ${animal.historia}
						</li>-->
					</ul>
					
					</div>
				</div>
				`;
		
			container.appendChild(card);        
			});
			document.querySelectorAll('#animal-card').forEach(card => {
				card.addEventListener('click', (event) => {
				const animalData = JSON.parse(card.getAttribute('data-animal'));
				showAnimalDetails(animalData);
				});
			});
		}
0
	
}

function showAnimalDetails(animal) {
	const url = `${apiUrl}/${animal.id}`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
		document.getElementById('animal-name').textContent = data.nombre;
		document.getElementById('animal-age').textContent = data.edad;
		document.getElementById('animal-gender').textContent = data.genero ? 'Macho' : 'Hembra';
		document.getElementById('animal-image').src = data.media[0]?.url || 'default-image.jpg';
		document.getElementById('animal-history').textContent = data.historia;

		const modal = new bootstrap.Modal(document.getElementById('animalDetailsModal'));
		modal.show();
		})
    .catch(error => console.error('Error fetching animal details:', error));
}


function editUser(user) {
	const modal = new bootstrap.Modal(document.getElementById('UserEditModal'));
	const confirmationModal = new bootstrap.Modal(document.getElementById('ConfirmationModal'));
	modal.show();
	document.getElementById('staticEmail').value = user.email;
	document.getElementById('inputNombre').value = user.firstName;
	document.getElementById('inputApellido').value = user.lastName;
	document.getElementById('inputLocalidad').value = user.city;
	document.getElementById('inputDireccion').value = user.address;

	document.getElementById('editUserForm').addEventListener('submit', async (event) => {
		event.preventDefault();
		const updatedUser = {
			 
			firstName: normalizeName(document.getElementById('inputNombre').value),
        	lastName: normalizeName(document.getElementById('inputApellido').value),
			email: user.email,
			address: document.getElementById('inputDireccion').value,
			city: document.getElementById('inputLocalidad').value
		};
		try {
			const response = await fetch(`${userUrl}/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });
			if (response.ok) {
				modal.hide();
				confirmationModal.show();
				setTimeout(() => {
					location.reload();
				}, 3000);
				
			} else {
				console.error('Error updating user data:', response.status, response.statusText);
			}
		} catch (error) {
			console.error('Error updating user data:', error);
		}
	});
}

function normalizeName(name) {
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return name;
}