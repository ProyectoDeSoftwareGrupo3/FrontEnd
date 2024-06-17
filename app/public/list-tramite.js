document.addEventListener('DOMContentLoaded', function() {
    // Función para obtener los datos del endpoint con filtros
    async function getTramitesByFilters(tramiteEstadoId, animalId) {
        const token = 'TU_TOKEN_BEARER'; // Reemplaza 'TU_TOKEN_BEARER' con el token real
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
                // Actualiza la interfaz de usuario según sea necesario
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
    getTramitesByFilters(tramiteEstadoId, animalId);
});
