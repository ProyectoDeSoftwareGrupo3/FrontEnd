import { getToken, parseJwt } from './token.js';


const apiUrl = 'https://localhost:7052/api/Animal';
const userUrl = 'https://localhost:7053/api/User';

let allAnimals = [];

document.addEventListener('DOMContentLoaded', async () => {
	const token = getToken();
	const decodedToken = parseJwt(token);
	const userId = decodedToken.uid;
	loadAnimalsByUser(userId);
	console.log(userId)
	fetchUserDataById(userId);

});

function loadAnimalsByUser(userId) {
	const url = `${apiUrl}/GetAnimalList?userId=${userId}`;
	//const noResults = document.getElementById('no-results');
	//noResults.style.display = 'none'; 
  
	fetch(url)
	  .then(response => response.json())
	  .then(data => {
		allAnimals = data;
		renderAnimals(allAnimals);
  
		if (allAnimals.length === 0) {
		  //noResults.style.display = 'block';
		}
	  })
	  .catch(error => {
		console.error('Error fetching data:', error);
		//loader.style.display = 'none'; 
	  });
}


async function fetchUserDataById(userId) {
    try {
        const response = await fetch(`${userUrl}/${userId}`);
        if (response.ok) {
            const data = await response.json();
            updateUserData(data);
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

    userName.textContent = `${user.firstName} ${user.lastName}`;
	console.log(user)
    userLocalidad.textContent = `Localidad: ${user.city}`;
    userEmail.textContent = `Email: ${user.email}`;
}





function renderAnimals(animals) {
	const container = document.getElementById('animal-cards-container');
	container.innerHTML = '';
	if(animals.length > 0)
		{
			animals.forEach(animal => {
				const card = document.createElement('div');
				card.classList.add('col-lg-4', 'mb-4', 'd-flex', 'fade-in'); // Add fade-in class for animation
				card.innerHTML = `
				<div class="card border-0 flex-fill d-flex flex-column" type="button" id="animal-card" data-animal='${JSON.stringify(animal)}'>
					<div class="card-header position-relative border-0 p-0 mb-4 image-container">
					<img src="${animal.media[0]?.url || 'default-image.jpg'}" class="animal-image" alt="${animal.nombre}" />
					<div class="position-absolute d-flex flex-column align-items-center justify-content-center "></div>
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
	else
	{
		const emptyCard = document.createElement('div');
		emptyCard.innerHTML = 'No hay ningun animal en adopcion';
		container.appendChild(emptyCard);
	}
	
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