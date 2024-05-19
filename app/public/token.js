// import jwtDecode from 'jwt-decode';

function getToken() {
    return localStorage.getItem('authToken');
}

function removeToken() {
    localStorage.removeItem('authToken');
}

function setToken(token) {
    localStorage.setItem('authToken', token);
}

// function decodeToken(token) {
//     try {
//         const decoded = jwtDecode(token);
//         console.log(decoded);
//         return decoded;
//     } catch (error) {
//         console.error('Error decoding token:', error);
//         return null;
//     }
// }

export { getToken, removeToken, setToken };
