// import { getToken } from './token.js';


var decodedToken = '';
import("./token.js")                   // Dynamic import
  .then(data => { decodedToken = data.getToken() });
  
document.addEventListener('DOMContentLoaded', function() {
    console.log('hola');
    // Función para obtener los datos del endpoint
    async function getTramiteByMonth() {
        const token = decodedToken; // Reemplaza 'TU_TOKEN_BEARER' con el token real

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
                // Actualizar los valores en la interfaz
                document.querySelector('.solicitudes-aprobadas .h5').textContent = data.EstadoAprobado;
                document.querySelector('.solicitudes-pendientes .h5').textContent = data.EstadoRevision;
                document.querySelector('.solicitudes-rechazadas .h5').textContent = data.EstadoRechazado;
            } else {
                console.error('Error en la respuesta del servidor', response.status);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    // Llamar a la función para obtener los datos
    getTramiteByMonth();
});