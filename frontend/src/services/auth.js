import axios from 'axios';


export const authorizationHeader = () => {
    const jwtToken = localStorage.getItem("user");
    return {
        token: `JWT ${jwtToken}`
    }
}


export const login = async (username, password) =>  {
    const headers = {
        "Content-Type": "application/json",
    }
    const data = {
        "username": username,
        "password": password
    }
    const response = await axios({
        url: "http://127.0.0.1:8000/api/accounts/login/",
        method: "POST",
        headers: headers,
        data: JSON.stringify(data)
    })
    if (response.status === 200) {
        localStorage.setItem("user", response.data.token);
    } 
    else {
        console.log({
            "error": response.data
        })
    }
}


export const register = async (username, email, password) => {
    const headers = {
        "Content-Type": "application/json",
    }
    const data = {
        "username": username,
        "email": email,
        "password": password
    }
    const response = await axios({
        url: "http://127.0.0.1:8000/api/accounts/register/",
        method: "POST",
        headers: headers,
        data: data
    });
    if (response === 201) {
        console.log(response.data)
    }

}


export const logout = (username) => {
    localStorage.removeItem("user")
}