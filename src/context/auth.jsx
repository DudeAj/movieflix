import React, { createContext, useState, useEffect } from 'react';


const AuthContext = createContext({
    token: "",
    name: "",
    email: "",

    login: (token) => {
    },
    logout: () => {
    }
});

const storeToken = () => {
    const sToken = localStorage.getItem("movieToken");
    const sName = localStorage.getItem("movieName");
    const sEmail = localStorage.getItem("movieEmail");
   
 
    return {
        token: sToken,
        name: sName,
        email: sEmail,
        
    }
}


export const AuthContextProvider = (props) => {
    const tokenData = storeToken()
    let iToken
    let iName
    let iEmail


    if (tokenData) {
        iToken = tokenData.token;
        iName = tokenData.name;
        iEmail = tokenData.email;

    }

    const [token, setToken] = useState(iToken);
    const [name, setName] = useState(iName);
    const [email, setEmail] = useState(iEmail);


    const userIsLoggedIn = !!token;


    const loginHandler = (token, name, email) => {
        setToken(token)
        setName(name);
        setEmail(email);
      

        localStorage.setItem("movieToken", token);
        localStorage.setItem("movieName", name);
        localStorage.setItem("movieEmail", email);
     
    }


    const logoutHandler = () => {

        localStorage.clear();
        setToken(null)

    }

    const contextValue = {
        token: token,
        name: name,
        email: email,
        login: loginHandler,
        logout: logoutHandler,
        isLoggedin: userIsLoggedIn
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )

}


export default AuthContext;