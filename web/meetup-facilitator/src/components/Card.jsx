import { useState } from "react";


function Card({activity, subcategories, setShowPopUp, setTargetCategory} ) {
    

    const handleOnClick = (e) => {
        setShowPopUp(true);
        console.log(e.target.textContent);
        setTargetCategory(subcategories);
    }


    return (
        <div className="group card text-2xl border-2 border-black p-6 ml-auto mr-auto relative" onClick={handleOnClick}>
            {activity}
            {/* <ul className="text-lg group-hover:block hidden ml-auto mr-auto relative">{subcategories}</ul> */}
        </div>
    )
}

export default Card;