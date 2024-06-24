import { getToken } from "./token.js";

let tramitesData = [];
// document.addEventListener('DOMContentLoaded', function () {
//     // Función para obtener los datos del endpoint con filtros
//     async function getTramitesByFilters(tramiteEstadoId, animalId) {
//         const token = getToken();
//         const url = new URL('https://localhost:7285/api/Tramites/Filters');
//         const params = { tramiteEstadoId, animalId };
//         Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

//         try {
//             let response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (response.ok) {
//                 let data = await response.json();
//                 // Manejar la respuesta exitosa
//                 console.log('Datos de trámites:', data);
//                 // Llenar la tabla con los datos
//                 llenarTabla(data);
//             } else if (response.status === 404) {
//                 let errorData = await response.json();
//                 console.error('Error: ', errorData.Message);
//             } else {
//                 console.error('Error en la respuesta del servidor', response.status);
//             }
//         } catch (error) {
//             console.error('Error al obtener los datos:', error);
//         }
//     }

//     // Ejemplo de llamada a la función con parámetros
//     const tramiteEstadoId = 1; // Reemplaza con el ID del estado de trámite deseado
//     const animalId = 123; // Reemplaza con el ID del animal deseado
//     getTramitesByFilters('', '');

//     // Función para llenar la tabla
//     function llenarTabla(data) {
//         const tbody = document.querySelector("#dataTable tbody");
//         tbody.innerHTML = ""; // Limpiar el contenido previo de la tabla

//         data.forEach(tramite => {
//             const row = document.createElement("tr");

//             const nameCell = document.createElement("td");
//             nameCell.textContent = tramite.usuarioId; // Cambia esto a la propiedad correcta si es necesario
//             row.appendChild(nameCell);

//             const usuarioAdoptanteIdCell = document.createElement("td");
//             usuarioAdoptanteIdCell.textContent = tramite.usuarioAdoptanteId; // Cambia esto a la propiedad correcta si es necesario
//             row.appendChild(usuarioAdoptanteIdCell);

//             const officeCell = document.createElement("td");
//             officeCell.textContent = tramite.animalId; // Cambia esto a la propiedad correcta si es necesario
//             row.appendChild(officeCell);

//             const positionCell = document.createElement("td");
//             positionCell.textContent = tramite.estadoResponse.descripcion;
//             row.appendChild(positionCell);

//             const startDateCell = document.createElement("td");
//             startDateCell.textContent = new Date(tramite.fechaInicio).toLocaleDateString();
//             row.appendChild(startDateCell);

//             const salaryCell = document.createElement("td");
//             salaryCell.textContent = tramite.adopcionResponse ? tramite.adopcionResponse.cantidadPersonas : 1;
//             row.appendChild(salaryCell);

//             tbody.appendChild(row);
//         });
//     }
// });

let dataTable;
let dataTableInicialized = false;
const dataTableOptions = {
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
        { orderable: false, targets: [8] },
        { searchable: false, targets: [1] }
        //{ width: "50%", targets: [0] }
    ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún tramite encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún tramite encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
}
const initDataTable = async () => {
    if (dataTableInicialized) {
        dataTable.destroy();
    }

    await listTramites();

    dataTable = $("#datatable_users").DataTable(dataTableOptions);

    dataTableInicialized = true;
};

const listTramites = async () => {
    try {

        const token = getToken();
        const url = new URL('https://localhost:7285/api/Tramites/Filters');
        let tramiteEstadoId = '';
        let animalId = '';
        const params = { tramiteEstadoId, animalId };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const tramites = await response.json();
        tramitesData = tramites;
        let content = ``;
        
        tramites.forEach((tramite, index) => {
            const estado = tramite.estadoResponse.descripcion.toLowerCase();
            const isEditable = !(estado === 'aprobado' || estado === 'rechazado');
            content += `
            <tr>
            <td>${tramite.id}</td>
            <th>${tramite.adopcionResponse ? tramite.adopcionResponse.animalResponse.nombre : '-'}</td>
            <th>${tramite.adopcionResponse ? tramite.adopcionResponse.animalResponse.raza.tipo.descripcion : '-'}</td>
            <th>${tramite.adopcionResponse ? tramite.adopcionResponse.animalResponse.raza.descripcion : '-'}</td>
            <th>${formatDate(tramite.fechaInicio)}</td>
            <th>${tramite.usuarioReceptor.lastName}, ${tramite.usuarioReceptor.firstName}</td>
            <th>${tramite.usuarioRemitente.lastName}, ${tramite.usuarioRemitente.firstName}</td>
            <th>${tramite.estadoResponse.descripcion}</td>
            <td>
                <button class="btn btn-sm btn-secondary edit-button ${isEditable ? '' : 'disabled'}" data-id="${tramite.id}" data-toggle="modal" data-target="#editStatusModal" ${isEditable ? '' : 'disabled'}><i class="fa-solid fa-pencil"></i></button>
                <button class="btn btn-sm btn-info detail-button" data-id="${tramite.id}" data-toggle="modal" data-target="#detailModal"><i class="fa-solid fa-eye"></i></button>
            </td>
            </tr>
            `
            tableBody_users.innerHTML = content;
        })
    }
    catch (ex) {
        alert(ex);
    }
}
// window.addEventListener("load", async () => {
//     await initDataTable();
// });
initializeWindow();
async function initializeWindow()
{
    await initDataTable();
}

function formatDate(dateString) {
    // Crear un objeto de fecha a partir de la cadena de fecha
    const date = new Date(dateString);

    // Obtener el día, mes y año
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
    const year = date.getFullYear();

    // Formatear la fecha como dd/mm/yyyy
    return `${day}/${month}/${year}`;
}

document.addEventListener('click', function(event) {
    if (event.target.closest('.edit-button')) {
        const button = event.target.closest('.edit-button');
        const tramiteId = button.getAttribute('data-id');
        document.getElementById('tramiteId').value = tramiteId;

        // Opcional: Cargar el estado actual del trámite si es necesario
        // const currentStatus = ...
        // document.getElementById('statusSelect').value = currentStatus;
    }
});

document.getElementById('saveStatusButton').addEventListener('click', async function() {
    const tramiteId = document.getElementById('tramiteId').value;
    const newStatus = document.getElementById('statusSelect').value;

    if (!newStatus) {
        alert('Por favor, seleccione un estado.');
        return;
    }

    try {
        const token = getToken();
        const response = await fetch('https://localhost:7285/api/Tramites/UpdateState', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                TramiteId: parseInt(tramiteId, 10), 
                EstadoId: parseInt(newStatus, 10) 
            })
        });

        if (response.ok) {
            alert('Estado actualizado exitosamente');
            $('#editStatusModal').modal('hide');
            await initDataTable(); // Recargar la tabla de datos
        } else {
            const errorData = await response.json();
            alert('Error actualizando estado: ' + errorData.message);
        }
    } catch (ex) {
        alert('Error: ' + ex.message);
    }
});

// Lógica para abrir el modal de detalles y cargar la información
document.addEventListener('click', function(event) {
    if (event.target.closest('.detail-button')) {
        const button = event.target.closest('.detail-button');
        const tramiteId = button.getAttribute('data-id');
        
        // Llamar a la función para cargar los detalles
        loadTramiteDetails(tramiteId);
    }
});

async function loadTramiteDetails(tramiteId) {
    const tramite = tramitesData.find(t => t.id === parseInt(tramiteId));
    if (tramite) {
        displayTramiteDetails(tramite);
    } else {
        alert('Trámite no encontrado');
    }
}

function displayTramiteDetails(tramite) {
    const detailContent = document.getElementById('detailContent');
    detailContent.innerHTML = `
        <p><strong>N° Tramite:</strong> ${tramite.id}</p>
        <p><strong>Usuario:</strong> ${tramite.usuarioReceptor.lastName}, ${tramite.usuarioReceptor.firstName}</p>
        <p><strong>Usuario Solicitante:</strong> ${tramite.usuarioRemitente.lastName}, ${tramite.usuarioRemitente.firstName} </p>
        <p><strong>Fecha de Inicio:</strong> ${formatDate(tramite.fechaInicio)}</p>
        <p><strong>Fecha Final:</strong> ${formatDate(tramite.fechaFinal)}</p>
        <p><strong>Estado:</strong> ${tramite.estadoResponse.descripcion}</p>
        <h5>Adopción</h5>
        <p><strong>Animal:</strong> ${tramite.adopcionResponse.animalResponse.nombre}</p>
        <p><strong>Raza:</strong> ${tramite.adopcionResponse.animalResponse.raza.descripcion}</p>
        <p><strong>Edad:</strong> ${tramite.adopcionResponse.animalResponse.edad}</p>
        <p><strong>Peso:</strong> ${tramite.adopcionResponse.animalResponse.peso}</p>
        <p><strong>Historia:</strong> ${tramite.adopcionResponse.animalResponse.historia}</p>
        <img src="${tramite.adopcionResponse.animalResponse.media[0].url}" alt="Imagen del Animal" class="img-fluid">
        <!-- Añade más detalles según sea necesario -->
    `;
}