import { useEffect, useState } from "react";


function Navbar() {

    const [name, setName] = useState('');
    const [pictureURL, setPictureURL] = useState('');

    useEffect(() => {

        if (sessionStorage.getItem('user')) {
            setName(sessionStorage.getItem('name'));
            setPictureURL(sessionStorage.getItem('pictureURL'));
        }

    }, []);


    

    return (
        <div className='flex items-center justify-between'>
            <div className="logo">Optimeet</div>
            <div className="user-info">
                <div className="name">{name}</div>
                <img src={pictureURL} className="profilePicture" style={{height:'50 px', width:'50 px'}}></img>
            </div>
        </div>
    )

}

export default Navbar;