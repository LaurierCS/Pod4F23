import { useState } from "react";
// import "./card.css"

function Card({activity, subcategories} ) {


    return (
        <div className="group card text-2xl border-2 border-black p-6 ml-auto mr-auto relative">
            <div>{activity}</div>
            <ul className="text-lg group-hover:block hidden ml-auto mr-auto relative">{subcategories}</ul>
        </div>
    )
}

export default Card;