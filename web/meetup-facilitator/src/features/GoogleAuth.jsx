import { GoogleLogin } from '@react-oauth/google'
import { useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';

function GoogleAuth() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pictureURL, setPictureURL] = useState('');
    // const [isAuthorized, setIsAuthorized] = useState(false);
    const  { isAuthorized, setIsAuthorized } = useContext(MyContext);
    const navigate = useNavigate();
    


    const responseMessage = (response) => {
        console.log(response);
        const decodedJWT = JSON.parse(atob(response.credential.split('.')[1]))
        console.log(decodedJWT);
        if(Object.keys(decodedJWT).length === 15) {
            setEmail(decodedJWT.email);
            setName(decodedJWT.given_name + ' ' + decodedJWT.family_name);
            setPictureURL(decodedJWT.picture);
            setIsAuthorized(true);
            navigate('/home');

        }
    };

    const errorMessage = (error) => {
        console.log(import.meta.VITE_CLIENT_ID);
        console.log(error); 
    };

  return (
    <div>
        <div className={`${(isAuthorized) ? 'visible' : 'invisible'}`}>
            <div className="name">{name}</div>
            <div className="email">{email}</div>
            <img src={pictureURL} alt='Your google profile picture' referrerPolicy="no-referrer"/>
        </div>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  )
}

export default GoogleAuth