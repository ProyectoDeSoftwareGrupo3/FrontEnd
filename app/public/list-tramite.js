import { getToken } from "./token.js";

document.addEventListener('DOMContentLoaded', function() {
    // Función para obtener los datos del endpoint con filtros
    async function getTramitesByFilters(tramiteEstadoId, animalId) {
        const token = getToken();
        const url = new URL('https://localhost:7285/api/Tramites/Filters');
        const params = { tramiteEstadoId, animalId };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                let data = await response.json();
                // Manejar la respuesta exitosa
                console.log('Datos de trámites:', data);
                // Llenar la tabla con los datos
                llenarTabla(data);
            } else if (response.status === 404) {
                let errorData = await response.json();
                console.error('Error: ', errorData.Message);
            } else {
                console.error('Error en la respuesta del servidor', response.status);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    // Ejemplo de llamada a la función con parámetros
    const tramiteEstadoId = 1; // Reemplaza con el ID del estado de trámite deseado
    const animalId = 123; // Reemplaza con el ID del animal deseado
    getTramitesByFilters('', '');

    // Función para llenar la tabla
    function llenarTabla(data) {
        const tbody = document.querySelector("#dataTable tbody");
        tbody.innerHTML = ""; // Limpiar el contenido previo de la tabla

        data.forEach(tramite => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = tramite.usuarioId; // Cambia esto a la propiedad correcta si es necesario
            row.appendChild(nameCell);

            const usuarioAdoptanteIdCell = document.createElement("td");
            usuarioAdoptanteIdCell.textContent = tramite.usuarioAdoptanteId; // Cambia esto a la propiedad correcta si es necesario
            row.appendChild(usuarioAdoptanteIdCell);

            const officeCell = document.createElement("td");
            officeCell.textContent = tramite.animalId; // Cambia esto a la propiedad correcta si es necesario
            row.appendChild(officeCell);

            const positionCell = document.createElement("td");
            positionCell.textContent = tramite.estadoResponse.descripcion;
            row.appendChild(positionCell);

            const startDateCell = document.createElement("td");
            startDateCell.textContent = new Date(tramite.fechaInicio).toLocaleDateString();
            row.appendChild(startDateCell);

            const salaryCell = document.createElement("td");
            salaryCell.textContent = tramite.adopcionResponse? tramite.adopcionResponse.cantidadPersonas : 1; 
            row.appendChild(salaryCell);

            tbody.appendChild(row);
        });
    }
});