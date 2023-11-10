import { useContext } from "react";
import Button from "./Button";
import { activitiesContext } from "../pages/Activities";

function PopUp({subcategories}) {

    const context = useContext(activitiesContext);

    const hidePopUp = () => {
        // TODO: save preferences

        context.setShowPopUp(false);
    }

    return (
        <div id="pop-up" className="absolute left-1/3 top-1/3 bg-gray-500 p-7">
            { subcategories.map((activity, i) => {
            return ( 
                <div key={i}>
                    <label htmlFor={activity}>{activity}</label>
                    <input value={activity} name="activity_pref" id={activity} type="radio"/>
                </div>
            )
            })}
            <Button click={hidePopUp} text="Save" classList="bg-green-500"/>
        </div>    
    )


}

export default PopUp;