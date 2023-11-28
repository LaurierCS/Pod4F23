import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


function Navbar() {

    const [name, setName] = useState('');
    const [pictureURL, setPictureURL] = useState('');

    useEffect(() => {

        if (localStorage.getItem('user')) {
            setName(localStorage.getItem('name'));
            setPictureURL(localStorage.getItem('pictureURL'));
        }

    }, []);


    

    return (
        <div className=' w-screen bg-gray-400 flex items-center justify-between p-4 absolute top-0 left-0'>
            <div className="flex items-center">Optimeet</div>
            <ul>
                <li><a href="/activities">Activities</a></li>
            </ul>
            <ul>
                <li><a href="/recommendation">Recommendation</a></li>
            </ul>
            <div className="user-info flex justify-evenly items-center gap-4">
                <div className="name">{name}</div>
                <img src={pictureURL} className="profilePicture w-10 h-10 rounded-full" ></img>
            </div>
        </div>
    )

}

export default Navbar;