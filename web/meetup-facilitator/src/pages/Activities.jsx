import { useEffect, useState } from "react"
import Card from "../components/Card"
import Navbar from "../components/Navbar";

function Activities() {

    const [activities, setActivities] = useState({});

    const subactivities = Object.values(activities);

    const mainCategories = Object.keys(activities).map((category, i) => {


        const subcategories = Object.keys(subactivities[i]).map((activityName, index) => {
            return <li key={index}>{activityName}</li>
        })

        return (
            <li key={i}>
                <Card activity={category} subcategories={subcategories}/>
            </li>
        )
    })

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login');
        }
        else {
            fetch(import.meta.env.VITE_SERVER + "activities/", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
                
            })
                .catch((e) => {console.error(e)})
                .then((response) => (response.json()))
                .then( (json) => setActivities(json))
        }
    }, [])

    return (
        <>
            <Navbar />
            <h1 className="m-4 text-4xl">Activities</h1>
            <ul className="grid grid-cols-3 gap-6">{mainCategories}</ul> 
        </>
    )

}

export default Activities;