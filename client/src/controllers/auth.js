import axios from 'axios';
import decode from 'jwt-decode';

export async function auth(data, redirect) {
    const authResponse = await axios.post('/user/auth', data);
    if(authResponse.data.success) {
        const token = authResponse.data.token;
        localStorage.setItem('token', token);
        const exp = decode(localStorage.getItem('token')).exp;
        if (Date.now() >= exp * 1000) {
            return false;
          }
        const decoded = decode(localStorage.getItem('token')).payload;
        return decoded;
         } else {
        return 0;
    }

}

export function getUserID() {
    const _id = decode(localStorage.getItem('token')).payload;
    return _id;
}

export function isLogged() {
    if(!localStorage.getItem('token')) {
        return false;
    }
    const exp = decode(localStorage.getItem('token')).exp;
    if (Date.now() >= exp * 1000) {
        return false;
      } else {
          return true;
      }
}

export function logout() {
    if(!localStorage.getItem('token')) {
        return false;
    } else {
        localStorage.removeItem('token');
        window.location.replace("/");
    }
}