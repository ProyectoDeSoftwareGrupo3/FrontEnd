import { getToken } from "./token.js";

document.addEventListener('DOMContentLoaded', () => {
    const adoptionForm = document.getElementById('adoptionForm');
    console.log(adoptionForm);
    adoptionForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evita que el formulario se envíe por defecto
  
    //   Captura de datos del formulario
        const formData = new FormData(this);//   
        let data = createAnimalRequest(formData);
        let img = new FormData();
        img.append('foto', formData.get('Foto'));    
        createAnimal(data, img)
  
    });
});

function createAnimalRequest(formData)
{
    let data = 
    {
        razaId: parseInt(formData.get('raza')),
        nombre: formData.get('name'),
        genero: formData.get(gender) == 'true' ? true : false,
        edad: parseInt(formData.get('age')),      
        peso: parseInt(formData.get('weight')), 
        historia: formData.get('story'),
        imageFile: formData.get('image')
    }
    return data;
}


async function createAnimal(data, img){
    try {
        const token = getToken(); // Reemplaza 'TU_TOKEN_BEARER' con el token real
        console.log(token)
        const response = await fetch(`https://localhost:7055/api/Animal?RazaId=${data.razaId}&Nombre=${data.nombre}&Genero=${data.genero}&Edad=${data.edad}&Peso=${data.peso}&Historia=${data.historia}`, {
            method: 'POST',
            headers: {                
                'Authorization': `bearer ${token}`
            },
            body: img
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
            console.log(response);
            alert('Error inesperado: ' + response.status);
            console.error('Error inesperado:', response.status);
        }
    } catch (error) {
        console.log(response);
        alert('Error en la solicitud');
        console.error('Error en la solicitud:', error);
    }
}