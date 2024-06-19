import { getToken, parseJwt } from "./token.js";

document.addEventListener('DOMContentLoaded', function() {    

    document.getElementById('transitForm').addEventListener('submit', async function(e)
    {        
        e.preventDefault();
        var formData = new FormData(this);
        let body = createTransitRequest(formData);
        let response = await sendTransitRequest(body);
        console.log(response);

    })
});
function createTransitRequest(formData)
{
    const token = getToken();
    const parsedToken = parseJwt(token);
    const params = getQueryParams();
    const { userId } = params;    
    let data = 
    {
        usuarioId : userId,
        usuarioSolicitanteId : parsedToken.uid,
        razonInteres : formData.get("interes"),
        experienciaDeTransito : formData.get("experiencia"),
        cantidadpersonas : formData.get("cantidadPersonas"),
        chicosYEdad : formData.get("ninos"),
        hayMascotas : formData.get("mascotas"),
        vacunadosCastrados : formData.get("vacunasCastracion"),
        tipoDeEspacio : formData.get("tipoDeEspacio"),
        propietarioInquilino : formData.get("propiedad"),
        disponibilidadHoraria : formData.get("disponibilidadHoraria"),
        rutina : formData.get("rutina"),
        emergencia : formData.get("emergencia"),
        medioDeTransporte : formData.get("transporte"),
        seguimiento : formData.get("seguimiento"),
        manejoAnimal : formData.get("manejoDelAnimal"),
        tiempoDeAcogida : formData.get("tiempoDeAcogida"),
        expectativa : formData.get("expectativas"),
        politicaOrganizacion : formData.get("politicasDeLaOrganizacion")
    }    
    return data;
}

async function sendTransitRequest(data)
{    
    try
    {        
        const token = getToken();   
        console.log(data);     
        const response = await fetch(`https://localhost:7285/api/Tramites/Transito`, 
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