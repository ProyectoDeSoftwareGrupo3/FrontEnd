
const toggleMenu = () => {
    const navigation = document.querySelector(".navigation");

    const burgerMenu = document.querySelector(".menu-icon");
    const src = burgerMenu.getAttribute("src");

    const isBurger = src === "assets/burger-menu.svg";
    const iconName = isBurger ? "assets/close.svg" : "assets/burger-menu.svg";

    burgerMenu.setAttribute("src", iconName);

    if (!isBurger) {
        navigation.classList.add("navigation--mobile--fadeout");
        setTimeout(() => {
            navigation.classList.toggle("navigation--mobile");
        }, 300);
    } else {
        navigation.classList.remove("navigation--mobile--fadeout");
        navigation.classList.toggle("navigation--mobile");
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const authLink = document.getElementById('auth-link');
    const token = localStorage.getItem('authToken'); // Asegúrate de que 'token' es la clave que usas

    if (token) {
        authLink.innerHTML = '<img id="avatar-navbar" class="avatar-profile" src="assets/profile_new.jpg" alt="Profile">';
    } else {
        authLink.innerHTML = '<a title="Inicia sesión" href="/login">Inicia sesión </a>';
    }

    // Agregar el evento de cerrar sesión si el token existe
    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('token'); // Elimina el token
            window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
        });
    }
});