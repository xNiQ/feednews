import axios from 'axios';
import decode from 'jwt-decode';

export async function auth(data, redirect) {
    const authResponse = await axios.post('/user/auth', data);
    if(authResponse.status == 200) {
        const token = authResponse.data.token;
        localStorage.setItem('token', token);
        const exp = decode(localStorage.getItem('token')).exp;
        if (Date.now() >= exp * 1000) {
            return false;
          }
    } else {
        return false;
    }

    const decoded = decode(localStorage.getItem('token')).payload;
    window.location.replace(redirect);
    return decoded;
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