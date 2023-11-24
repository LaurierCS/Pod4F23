import { createContext, useEffect, useState, useRef } from "react";
import LocationComponent from "../components/LocationComponent";
import TimeMain from "../components/TimeMain";
import Activities from "./Activities";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export const preferencesContext = createContext();


function Preferences() {
    const navigate = useNavigate();

    const activitiesPrefs = useRef([]);
    const locationPrefs = useRef({});
    const timePrefs = useRef([]);



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


        navigate('/');

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