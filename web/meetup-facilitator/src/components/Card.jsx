import { useContext, useState } from "react";
import { activitiesContext } from "../pages/Activities";


function Card({activity, subcategories} ) {

    const context = useContext(activitiesContext);

    const handleOnClick = (e) => {

        if (!context.showPopUp) {
            context.setShowPopUp(true);
            context.setTargetCategory(subcategories);
        }
    }


    return (
        <div className="group card text-2xl border-2 border-black p-6 ml-auto mr-auto relative" onClick={handleOnClick}>
            {activity}
        </div>
    )
}

export default Card;