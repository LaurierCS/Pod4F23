import { createContext, useEffect, useState } from "react";
import LocationComponent from "../components/LocationComponent";
import TimeMain from "../components/TimeMain";
import Activities from "./Activities";

export const preferencesContext = createContext();


function Preferences() {

    const [activitiesPrefs, setActivitiesPrefs] = useState([]);
    const [locationPrefs, setLocationPrefs] = useState({});
    const [timePrefs, setTimePrefs] = useState([]);

    const updateActivitiesPrefs = (activities)  => {
        console.log(activities);
        setActivitiesPrefs(activitiesPrefs);
    }

    const updateLocationPrefs = (coordinates, radius) => {
        console.log({coordinates, radius});
        setLocationPrefs({coordinates, radius});
    }
    
    return (
        <>
            <preferencesContext.Provider value={{updateActivitiesPrefs, updateLocationPrefs, setTimePrefs}}>
                <Activities/>
                <LocationComponent/>
                <TimeMain />
            </preferencesContext.Provider>
            
        </>
    )

}

export default Preferences;