import { useNavigate, useParams } from "react-router";
import Button from "../components/Button";
import { useEffect, useState } from "react";


export default function Join() {

    const {group_id} = useParams();
    const [groupInfo, setGroupInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login');
        }
    })
    

    useEffect(() => {

        fetch(import.meta.env.VITE_SERVER + `groups/${group_id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
            
        })
            .catch((e) => {console.error(e)})
            .then((response) => (response.json()))
            .then( (json) => { 

                if (json.length > 0)
                    setGroupInfo(json[0])
                else
                    navigate('/');
            })


    }, []);

    
    const joinGroup = () => {
        // make post request to join group
        console.log("group joined!");
    }

    return (
        <>
            <h3>You've been invited to join</h3>
            <h1>{groupInfo['name']}</h1>
            <Button click={joinGroup} text="Accept Invite" classList="bg-green-500 mt-3" />
        </>
    )

}