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
        <div id="pop-up" className="absolute left-1/3 top-1/3 bg-gray-500 p-7">
            { subcategories.map((activity, i) => {
            return ( 
                <form key={i}>
                    <label htmlFor={activity}>{activity}</label>
                    <input value={activity} name="activity_pref" id={activity} type="radio" defaultChecked={activity in pendingPrefs && pendingPrefs[activity]}/>
                </form>
            )
            })}
            <Button click={hidePopUp} text="Save" classList="bg-green-500"/>
        </div>    
    )


}

export default PopUp;