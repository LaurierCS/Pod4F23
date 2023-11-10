import { useContext, useState } from "react";
import { activitiesContext } from "../pages/Activities";


function Card({activity, subcategories} ) {

    const context = useContext(activitiesContext);

    const handleOnClick = (e) => {
        context.setShowPopUp(true);
        context.setTargetCategory(subcategories);
    }


    return (
        <div className="group card text-2xl border-2 border-black p-6 ml-auto mr-auto relative" onClick={handleOnClick}>
            {activity}
            {/* <ul className="text-lg group-hover:block hidden ml-auto mr-auto relative">{subcategories}</ul> */}
        </div>
    )
}

export default Card;