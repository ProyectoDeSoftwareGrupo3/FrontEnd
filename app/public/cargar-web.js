document.getElementById("nav-tables").addEventListener("click", function(event) {
    event.preventDefault(); // Previene la acción por defecto del enlace

    fetch('/tables')
        .then(response => response.text())
        .then(data => {
            const contentWrapper = document.getElementById("content-wrapper");
            contentWrapper.innerHTML = ''; // Limpia el contenido anterior
            contentWrapper.insertAdjacentHTML('beforeend', data);
            initializeContent(contentWrapper);  
        })
        .catch(error => console.error('Error al cargar la página:', error));
});

document.getElementById("nav-dog").addEventListener("click", function(event) {
    event.preventDefault(); // Previene la acción por defecto del enlace

    fetch('/create-animals')
        .then(response => response.text())
        .then(data => {            
            const contentWrapper = document.getElementById("content-wrapper");
            contentWrapper.innerHTML = ''; // Limpia el contenido anterior
            contentWrapper.insertAdjacentHTML('beforeend', data);
            initializeContent(contentWrapper);  
        })
        .catch(error => console.error('Error al cargar la página:', error));
});

document.getElementById("nav-panel").addEventListener("click", async function(event) {
    event.preventDefault(); // Previene la acción por defecto del enlace
    fetch('/panel')
        .then(response => response.text())
        .then(data => {
            const contentWrapper = document.getElementById("content-wrapper");
            contentWrapper.innerHTML = ''; // Limpia el contenido anterior
            contentWrapper.insertAdjacentHTML('beforeend', data);                        
            // Llama a la función de inicialización después de insertar el contenido
            
            initializeContent(contentWrapper);                  
                        
        })
        .catch(error => console.error('Error al cargar la página:', error));
        });

function initializeContent(container) {
    // Encuentra todos los elementos script dentro del nuevo contenido
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        newScript.text = oldScript.text; // Copia el contenido del script
        // Copia los atributos del script (por ejemplo, src)
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));

        if (oldScript.type === 'module') {
            newScript.type = 'module';
        }

        // Reemplaza el viejo script por el nuevo para forzar su ejecución
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });

    console.log("Contenido inicializado y scripts cargados");
}
