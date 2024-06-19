import { getToken, parseJwt } from "./token.js";


document.addEventListener('DOMContentLoaded', function() {
const animal = document.querySelector('#animal');
document.getElementById('adoptionForm').addEventListener('submit', async function(e)
    {        
        e.preventDefault();
        var formData = new FormData(this);
        // formData.forEach(function(value, key) {
        //     console.log(key + ': ' + value);
        // });
        let body = await createAdoptionRequest(formData);
        let response = await sendAdoptionRequest(body);
        console.log(response);
    })
function toggleAnimalButtons()
{
    console.log(animal);
    if(animal.checked)
        {
            const vaccinedBtn = document.querySelector('#vacunado');
            vaccinedBtn.disabled = false;            

            const castratedBtn = document.querySelector('#castrado');
            castratedBtn.disabled = false;            
        }
    else
    {
        const vaccinedBtn = document.querySelector('#vacunado');
        vaccinedBtn.disabled = true;
        vaccinedBtn.checked = false;       

        const castratedBtn = document.querySelector('#castrado');
        castratedBtn.disabled = true;
        castratedBtn.checked = false;        
    }
}

animal.addEventListener('click', () => {toggleAnimalButtons()});

function toggleChildAge()
{
    console.log(ninos.value);
    if(ninos.value == 'Si')
        {
            const childrenAge = document.querySelector('#NinosEdad');
            childrenAge.disabled = false;
        }
    else
    {
        const childrenAge = document.querySelector('#NinosEdad');
        childrenAge.disabled = true;
        childrenAge.value = "1";
    }
}
const ninos = document.querySelector('#Ninos');
ninos.addEventListener('click', () => {toggleChildAge()});
});

async function createAdoptionRequest(formData)
{
    const token = getToken();
    const parsedToken = parseJwt(token);
    const params = getQueryParams();
    const { animalId } = params;
    const animal = await fetchAnimalById(animalId);
    console.log(animal);
    let data = 
    {
        usuarioId: "19BB7F59-3372-433F-B343-00E75953D3A3",
        usuarioAdoptanteId: parsedToken.uid,
        animalId: parseInt(animalId),
        cantidadPersonas: parseInt(formData.get("Personas")),
        hayChicos: formData.get("Ninos") == "Si" ? true : false,
        edadHijoMenor: formData.get("NinosEdad") != null ? parseInt(formData.get("NinosEdad")) : null,
        hayMascotas: formData.get("animal") != null ? true : false,
        vacunados: formData.get("vacunado") == "on" ? true : false,
        castrados: formData.get("castrado") == "on" ? true : false,    //Agregar tipo de lugar en el que vivira
        lugar: formData.get("Lugar"),
        propietarioInquilino: formData.get("PropietarioOInquilino") == "Propietario" ? true : false,
        aireLibre: formData.get("EspacioLibre"),
        motivoAdopcion: formData.get("Razon"),
        horasSolo: parseInt(formData.get("HorasSolo")),
        paseoXMes: parseInt(formData.get("Paseo"))
    }    
    return data;
}

async function sendAdoptionRequest(data)
{    
    try
    {        
        const token = getToken();   
        console.log(data);     
        const response = await fetch(`https://localhost:7285/api/Tramites/Adopcion`, 
            {
                method: 'POST',
                headers: 
                {
                    'Authorization' : `bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
            });
        if(!response.ok)
            {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        return response.json();
    }
    catch (Error)
    {
        console.error('Error fetching data:', error);
    }    
}

async function fetchAnimalById(animalId)
{
    try
    {
        const response = await fetch(`https://localhost:7052/api/Animal/${animalId}`);
        if(!response.ok)
            {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        return response.json();
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
    }
}

function getQueryParams() {
	// Get the current URL's query string
	const queryString = window.location.search;

	// Create a new URLSearchParams object from the query string
	const urlParams = new URLSearchParams(queryString);

	// Create an object to hold the query parameters
	const params = {};

	// Iterate over the URLSearchParams object and populate the params object
	for (const [key, value] of urlParams.entries()) {
		params[key] = value;
	}

	// Return the params object
	return params;
}