import { setToken } from './token.js';

const mensajeError = document.getElementsByClassName("error")[0]
const loginUrl = 'https://localhost:7052/api/Auth/login';

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginRequest = {
        email: e.target.elements.email.value,
        password: e.target.elements.password.value
    };

    const res = await login(loginRequest);

    setToken(res.token);
    window.location.href = '/';
});

async function login(loginRequest) {
    try {

        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}