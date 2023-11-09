import Button from "./Button";

function PopUp({subcategories, setShowPopUp}) {


    const hidePopUp = () => {
        // setShowPopUp(false);
    }

    if (subcategories.length > 0)
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
                <Button click={setShowPopUp} text="Save" classList="bg-green-500"/>
            </div>    
        )
    else
        return (<></>)

}

export default PopUp;