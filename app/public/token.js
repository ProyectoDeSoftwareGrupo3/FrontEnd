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

function parseJwt(token) {
	try {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	
		return JSON.parse(jsonPayload);
		} catch (e) {
		console.error('Invalid token:', e);
		return null;
		}
}

export { getToken, removeToken, setToken, parseJwt };
