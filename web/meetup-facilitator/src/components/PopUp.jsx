import { useContext, useRef } from "react";
import Button from "./Button";
import { activitiesContext } from "../pages/Activities";

const pendingPrefs = {};

function PopUp({subcategories}) {

    const context = useContext(activitiesContext);

    const hidePopUp = () => {
        const inputs = document.getElementsByName("activity_pref");

        for (let i = 0; i <  inputs.length; i++)
            pendingPrefs[inputs[i].id] = inputs[i].checked;

        context.setShowPopUp(false);
        context.pendingPrefs.current = pendingPrefs;
    }

    return (
        <form id="activities-pop-up" className="absolute left-1/3 top-1/3 bg-gray-500 p-7">
            { Object.keys(subcategories).map((activity, i) => {
            return ( 
                <div key={i}>
                    <label htmlFor={subcategories[activity]}>{activity}</label>
                    <input value={activity} name="activity_pref" id={subcategories[activity]} type="checkbox" defaultChecked={subcategories[activity] in pendingPrefs && pendingPrefs[subcategories[activity]]}/>
                </div>
            )
            })}
            <Button click={hidePopUp} text="Save" classList="bg-green-500"/>
        </form>    
    )


}

export default PopUp;