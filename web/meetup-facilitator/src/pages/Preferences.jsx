import { createContext, useEffect, useState, useRef } from "react";
import LocationComponent from "../components/LocationComponent";
import TimeMain from "../components/TimeMain";
import Activities from "./Activities";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";

export const preferencesContext = createContext();


function Preferences() {
    const navigate = useNavigate();

    const {group_id} = useParams();
    const activitiesPrefs = useRef([]);
    const locationPrefs = useRef({});
    const timePrefs = useRef([]);


    useEffect(() => {

        fetch(import.meta.env.VITE_SERVER + `groups/${group_id}/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
            
        })
            .catch((e) => {console.error(e)})
            .then((response) => (response.json()))
            .then( (json) => { 

                if (json.length === 0)
                    navigate('/');

            })


    }, []);


    const updateActivitiesPrefs = (activities)  => {
        activitiesPrefs.current = activities;
    }

    const updateLocationPrefs = (coordinates, radius) => {
        locationPrefs.current = {coordinates, radius};
    }

    const updateTimePrefs = (dates) => {
        timePrefs.current = dates;
    }

    const postPrefs = () => {
        
        const activities = activitiesPrefs.current;
        const location = locationPrefs.current;

        const time = timePrefs.current.flat();
        console.log({time})
        
        console.log({activities, location, time});
        if (activities.length === 0 || Object.keys(location).length === 0 || time.length === 0)
            alert("Please make sure at least one option is chosen for every preference.")

        else
        {
            const data = {
                "group_id": group_id,
                "user_id": localStorage.getItem("email"),
                "categories": activities,
                "times": time,
                "lat": location["coordinates"]["lat"],
                "lon": location["coordinates"]["lng"],
                "radius": location["radius"]
            }

            fetch(import.meta.env.VITE_SERVER + `groups/${group_id}/users/${localStorage.getItem("email")}/prefs/`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(() => {console.error("Problem making POST request")})
            .then((response) => {
                if ("status" in response && response["status"] === 201) {
                    alert("Preferences successfully saved. Redirecting to Recommendations.")
                    navigate(`/recommendations/${localStorage.getItem("email")}`);
                } else
                    alert("There was an issue saving preferences. Please try again.");
            })

        }
        navigate(`/recommendations/${group_id}/`);

    }
    
    return (
        <>
            <preferencesContext.Provider value={{updateActivitiesPrefs, updateLocationPrefs, updateTimePrefs}}>
                <Activities/>
                <LocationComponent/>
                <TimeMain />
            </preferencesContext.Provider>
            <Button click={postPrefs} text="Save preferences" classList="bg-green-500 mt-4 mb-4" />
            
        </>
    )

}

export default Preferences;