import { parseJwt } from './token.js';

const userUrl = 'https://localhost:44350/api/User';


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
    const token = localStorage.getItem('authToken');
    if (token) {
        const user= parseJwt(token);
        if(user.role === "Administrador"){
            authLink.innerHTML = `
            <ul class="nav nav-tabs">
       
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Bienvenido</a>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/userProfile">Mi Perfil</a></li>
            <li><a class="dropdown-item" href="/administrador">Dashboard</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" id="logout">Cerrar sesion</a></li>
            </ul>
        </li>
        
        </ul>
    `;
        }
        else{
            authLink.innerHTML = `
            <ul class="nav nav-tabs">
       
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Bienvenido</a>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/userProfile">Mi Perfil</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" id="logout">Cerrar sesion</a></li>
            </ul>
        </li>
        
        </ul>
    `;
        }
        
        
    } else {
        authLink.innerHTML = '<a title="Inicia sesión" href="/login">Inicia sesión </a>';
    }

    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('authToken'); 
            window.location.href = '/'; 
        });
    }
});

