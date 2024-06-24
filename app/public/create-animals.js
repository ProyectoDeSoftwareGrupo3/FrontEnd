import { getToken } from "./token.js";

document.addEventListener('DOMContentLoaded', () => {
    const adoptionForm = document.getElementById('adoptionForm');
  
    adoptionForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que el formulario se envíe por defecto
  
      // Captura de datos del formulario
      const formData = {
        razaId: document.getElementById('raza').value,
        nombre: document.getElementById('name').value,
        gender: document.getElementById('gender').value,
        edad: document.getElementById('age').value,      
        peso: document.getElementById('weight').value, 
        historia: document.getElementById('story').value,
      };
  
      createAnimal(formData)
  
    });
});

async function createAnimal(data){
    try {
        const token = getToken(); // Reemplaza 'TU_TOKEN_BEARER' con el token real
        console.log(token)
        const response = await fetch('https://localhost:7052/api/Animal', {
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
}