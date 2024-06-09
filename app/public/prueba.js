document.getElementById("nav-tables").addEventListener("click", function(event) {
    event.preventDefault(); // Previene la acción por defecto del enlace

    fetch('/tables')
        .then(response => response.text())
        .then(data => {
            document.getElementById("content-wrapper").innerHTML = data;
        })
        .catch(error => console.error('Error al cargar la página:', error));
});

document.getElementById("nav-panel").addEventListener("click", function(event) {
    event.preventDefault(); // Previene la acción por defecto del enlace

    fetch('/panel')
        .then(response => response.text())
        .then(data => {
            document.getElementById("content-wrapper").innerHTML = data;
        })
        .catch(error => console.error('Error al cargar la página:', error));
});