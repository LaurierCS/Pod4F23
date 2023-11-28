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
        console.log({activitiesPrefs, locationPrefs, timePrefs})

        // TODO: make sure there are no empty fields

        // TODO: make post request 


        navigate('/recommendation');

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