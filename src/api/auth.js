import { API_HOST, TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode';

export function signUpApi(user){

    const url = `${API_HOST}/registro`;
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        fechaNacimiento: new Date()
    };
    delete userTemp.repeatPassword;

    console.log('Inside signUpApi -> ' , user);
    console.log('Url -> ' , url);

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userTemp)
    };

    return fetch (url, params)
        .then(response => {
            if(response.status >= 200 && response.status < 300) {
                return response.json();
            }
            return { code: 404, message: "A problem occurred, please try again later." };
        }).then(result => {
            return result;
        }).catch (err =>{
            return err;
        });
}

export function logInApi(user){

    const url = `${API_HOST}/login`;
    const data = {
        ...user,
        email: user.email.toLowerCase()
    };

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
        .then(response => {
            if(response.status >= 200 && response.status < 300) {
                return response.json();
            }
            return { code: 404, message: "Invalid email or password, please try again." };
        }).then(result => {
            return result;
        }).catch (err =>{
            return err;
        });
}

export function setTokenApi(token){

    localStorage.setItem(`${TOKEN}`, token);
}

export function getTokenApi(){
    return localStorage.getItem(TOKEN);
}

export function logoutApi(){
    localStorage.removeItem(TOKEN);
}

export function isUserLoggedInApi(){
    const token = getTokenApi();
    if(!token){
        logoutApi();
        return null;
    }
    console.log('is token expired? -> ', isTokenExpired(token));

    if(isTokenExpired(token)){
        logoutApi();
    }
    return jwtDecode(token);
}

function isTokenExpired(token){
    const { exp } = jwtDecode(token);
    const expired = exp * 1000;
    const timeout = expired - Date.now();

    if(timeout < 0){
        return true;
    }
    return false;
}