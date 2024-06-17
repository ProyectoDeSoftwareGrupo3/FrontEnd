import { getToken } from './token.js';

const decodedToken = jwt_decode(getToken());

const userFullName = decodedToken.name || "Usuario";

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('user-fullname').textContent = userFullName;
});