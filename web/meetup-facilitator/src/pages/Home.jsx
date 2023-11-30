import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button'
import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar';

function Home() {


    const buttonStyles = 'bg-green-700'
    const groupName = useRef('')
    const [isValid, setIsValid] = useState(true);
    const navigate = useNavigate();
    const [groupCreated, setGroupCreated] = useState(false);
    const [group_id, setGroup_Id] = useState('');


    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login');
        }
    })
    


    const updateGroupName = (e) => {
        groupName.current = e.target.value;
    }

    const onChange = (e) => {
        updateGroupName(e);
        validateInput();
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // Validate once on submit
        validateInput();

        // if isValid -> make API 
        if (isValid)
            createGroup();

    }

    const validateInput = () => {

        if (groupName.current === '')
            setIsValid(false);

        else
        setIsValid(true);
    }

    const createGroup = () => {
        const data = {
            name: groupName.current,
            host_id: localStorage.getItem('email'),
            max_capacity: 5,
            status: "A"
        }

        fetch(import.meta.env.VITE_SERVER + "groups/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => (response.json()))
        .then( (json) => { 

            if ('group_id' in json){
                const link = `http://localhost:5173/join/${json["group_id"]}`;
                navigator.clipboard.writeText(link);
                setGroupCreated(true);
                setGroup_Id(json["group_id"]);
            }
        })


    }

return (
    <>
        <Navbar />
        
        {(!groupCreated) ? 
            <div>
                <div className='flex-col flex my-3 gap-1'>
                    <label className='text-2xl' htmlFor='new-group-name'>Group Name:</label>
                    <input ref={groupName} onChange={onChange} className={`border-2 p-2 ${(isValid ? '' : 'border-red-500')} focus:outline-none`} name='new-group-name' id='new-group-name' type='text' placeholder='Enter the group name here.'/>
                    <div className={`text-red-500${(isValid) ? ' invisible' : ' visible'}`}>Please enter a valid group name.</div>
                </div>
                <Button click={onSubmit} classList={buttonStyles} text='Create Group' />
            </div>
            
                :
            <>
                <Link to={`/preferences/${group_id}`}>
                    <Button classList={buttonStyles} text="Select Preferences" />
                </Link>
                <div className='mt-4'>
                    {`Join link has been copied to your clipboard. Share it with your friends!`}
                    <div className='mt-6 text-3xl'>{`http://localhost:5173/join/${group_id}`}</div>
                </div>
            </>            
            }
        

    </>
    
        
 )

}

export default Home;