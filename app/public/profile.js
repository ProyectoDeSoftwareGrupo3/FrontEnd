
import { getToken } from './token.js';

const decodedToken = jwt_decode(getToken());

const userFullName = decodedToken.name || "Usuario";
console.log('hola');
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('hola');
    document.getElementById('user-fullname').textContent = userFullName;
});