// import { getToken } from './token.js';

import { getToken } from "./token.js";


var decodedToken = '';
import("./token.js")                   // Dynamic import
  .then(data => { decodedToken = data.getToken() });
  
document.addEventListener('DOMContentLoaded', async () => {
    console.log('hola');
    console.log('adios');
    console.log(decodedToken);
    console.log('Token');
    // Función para obtener los datos del endpoint
    

    // Llamar a la función para obtener los datos
    await getTramiteByMonth();
    console.log('Finished');
});

async function getTramiteByMonth() {
    const token = getToken(); // Reemplaza 'TU_TOKEN_BEARER' con el token real
    console.log(token);
    try {
        let response = await fetch('https://localhost:7285/api/Tramites/Thismonth', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {            
            let data = await response.json();
            console.log(data);
            // Actualizar los valores en la interfaz
            document.querySelector('.solicitudes-aprobadas .h5').textContent = data.estadoAprobado;
            document.querySelector('.solicitudes-pendientes .h5').textContent = data.estadoRevision;
            document.querySelector('.solicitudes-rechazadas .h5').textContent = data.estadoRechazado;
        } else {
            console.error('Error en la respuesta del servidor', response.status);
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}