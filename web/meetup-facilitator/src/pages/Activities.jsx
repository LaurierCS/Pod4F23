import { useEffect, useState } from "react"
import Card from "../components/Card"
import PopUp from "../components/PopUp";


function Activities() {

    const [activities, setActivities] = useState({});
    const [showPopUp, setShowPopUp] = useState(false);
    const [targetCategory, setTargetCategory] = useState([])

    const subactivities = Object.values(activities);

    const hidePopUp = (e) => {

        const popup = document.getElementById('popup');

        if (popup !== e.target && !popup.contains(e.target)) {   
            console.log("outside popup!")
            setShowPopUp(false);
          }
    }

    if (showPopUp) {
        document.addEventListener('click', hidePopUp)
    }
    else
        document.removeEventListener('click', hidePopUp)



    const mainCategories = Object.keys(activities).map((category, i) => {


        const subcategories = Object.keys(subactivities[i]).map((activityName, index) => {
            return <li key={index}>{activityName}</li>
        })

        return (
            <li key={i}>
                {/* <Card activity={category} subcategories={subcategories}/> */}
                <Card activity={category} setShowPopUp={setShowPopUp} setTargetCategory={setTargetCategory} subcategories={Object.keys(subactivities[i])}/>
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
        <div className="relative">
            <h1 className="m-4 text-4xl">Activities</h1>
            <ul className="grid grid-cols-3 gap-6">{mainCategories}</ul> 
            <div id="popup">
                <PopUp className={(showPopUp) ? "block" : "hidden"} subcategories={targetCategory} setShowPopUp={setShowPopUp}/>
            </div>
        </div>
    )

}

export default Activities;