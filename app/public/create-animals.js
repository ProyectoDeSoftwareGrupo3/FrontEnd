import { getToken } from "./token.js";

document.getElementById('createAnimalForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const form = event.target;
    const data = {
        RazaId: form.razaId.value,
        Nombre: form.nombre.value,
        Genero: form.genero.value === 'true',
        Edad: form.edad.value,
        Peso: form.peso.value,
        Historia: form.historia.value
    };

    try {
        const token = getToken(); // Reemplaza 'TU_TOKEN_BEARER' con el token real
        const response = await fetch('https://localhost:7055/api/Animal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.status === 201) {
            const result = await response.json();
            alert('Animal creado con éxito');
            console.log('Animal creado:', result);
        } else if (response.status === 409) {
            const errorData = await response.json();
            alert('Error: ' + errorData.message);
            console.error('Error de conflicto:', errorData.message);
        } else {
            alert('Error inesperado: ' + response.status);
            console.error('Error inesperado:', response.status);
        }
    } catch (error) {
        alert('Error en la solicitud');
        console.error('Error en la solicitud:', error);
    }
});