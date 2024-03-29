import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256'

function GoogleAuth() {

    const navigate = useNavigate();
    

    const responseMessage = (response) => {
        const decodedJWT = JSON.parse(atob(response.credential.split('.')[1]))
        
        if(Object.keys(decodedJWT).length === 15) {

            localStorage.setItem('name', decodedJWT.given_name + ' ' + decodedJWT.family_name);
            localStorage.setItem('pictureURL', decodedJWT.picture);

            // Cache user token in session storage to persist user authorization until the browser is closed.
            localStorage.setItem("user", response.credential);

            // Hash the user's email and store in cookies
            localStorage.setItem("email", sha256(decodedJWT.email));

            navigate('/')

        }
    };

    const errorMessage = (error) => {
        console.log(error); 
    };

  return (
    <div>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  )
}

export default GoogleAuth