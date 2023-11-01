import { GoogleLogin } from '@react-oauth/google'
import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleAuth() {

    const navigate = useNavigate();
    

    const responseMessage = (response) => {
        console.log(response);
        const decodedJWT = JSON.parse(atob(response.credential.split('.')[1]))
        console.log(decodedJWT);
        if(Object.keys(decodedJWT).length === 15) {

            sessionStorage.setItem('name', decodedJWT.given_name + ' ' + decodedJWT.family_name);
            sessionStorage.setItem('pictureURL', decodedJWT.picture);

            // Cache user token in session storage to persist user authorization until the browser is closed.
            sessionStorage.setItem("user", response.credential);
            navigate('/')

        }
    };

    const errorMessage = (error) => {
        console.log(import.meta.VITE_CLIENT_ID);
        console.log(error); 
    };

  return (
    <div>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  )
}

export default GoogleAuth