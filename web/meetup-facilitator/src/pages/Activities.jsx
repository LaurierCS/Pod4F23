import { createContext, useEffect, useRef, useState } from "react"
import Card from "../components/Card"
import PopUp from "../components/PopUp";

export  const activitiesContext = createContext();


function Activities() {

    const [activities, setActivities] = useState({});
    const [showPopUp, setShowPopUp] = useState(false);
    const [targetCategory, setTargetCategory] = useState([]);
    const pendingPrefs = useRef({});

    const subactivities = Object.values(activities);

    const mainCategories = Object.keys(activities).map((category, i) => {

        return (
            <li key={i}>
                <activitiesContext.Provider value={{setShowPopUp, setTargetCategory, showPopUp}}>
                    <Card activity={category} subcategories={subactivities[i]}/>
                </activitiesContext.Provider>
            </li>
        )
    })
    console.log(pendingPrefs.current);
    // TODO: parse pendingPrefs to build array of google-ids to make POST request

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
                {showPopUp && <activitiesContext.Provider value={{setShowPopUp, pendingPrefs}}>
                        <PopUp className={(showPopUp) ? "block" : "hidden"} subcategories={targetCategory} setShowPopUp={setShowPopUp}/>
                    </activitiesContext.Provider>}
            </div>
        </div>
    )

}

export default Activities;