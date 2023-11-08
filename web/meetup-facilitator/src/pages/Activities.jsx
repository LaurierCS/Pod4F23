import { useEffect, useState } from "react"
import Card from "../components/Card"
import Navbar from "../components/Navbar";

function Activities() {

    const activities = {
        "Food and Dining": {
            "Cafe": "cafes",
            "Restaurant": "restaurants",
            "Food Marekt": "food+markets",
            "Bar": "bars",
            "Bakery": "bakery"
        },
        "Lively Indoor Entertainment": {
            "Movie Theatres": "movie+theatres",
            "Arcades": "arcades",
            "Karaoke Bars": "karaoke+bars",
            "Bowling Alley": "bowling+alley",
            "Night Club": "night+club"
        },
        "Relaxation and Leisure": {
            "Spa": "spa",
            "Shopping Mall": "shopping+mall",
            "Bookstore": "bookstore",
            "Library": "library",
            "Museum": "museum",
            "Aquarium": "aquarium",
            "Art Gallery": "art+gallery",
            "Jewelry Store": "jewelry+store",
            "Clothing Store": "clothing+store"
        },
        "Nature and Outdoors": {
            "Parks": "parks",
            "Beaches and Waterfronts": "beaches+and+waterfronts",
            "Amusement Park": "amusement+park",
            "Hiking Trails": "hiking+trails",
            "Botanical Gardens": "botanical+gardens",
            "Zoo": "zoo",
            "Florist": "florist"
        },
        "Health and Wellness": {
            "Spa and Wellness Centers": "spa+and+wellness+centers",
            "Yoga and Meditation Studios": "yoga+and+meditation+studios",
            "Gym or Fitness Studios gym": "gym",
            "Nail Salon": "nail+salon",
            "Beauty Salon": "beauty+salon"
        },
        "Sports and Recreation": {
            "Community Centers": "community+centers",
            "Rock Climbing Gym": "rock+climbing+gym",
            "Golf Course": "golf+course",
            "Indoor Trampoline Parks": "indoor+trampoline+parks",
            "Swimming Pool": "swimming+pool"
        }
    }

    const subactivities = Object.values(activities);

    const mainCategories = Object.keys(activities).map((category, i) => {


        const subcategories = Object.keys(subactivities[i]).map((activityName, index) => {
            return <li key={index}>{activityName}</li>
        })

        return (
            <li key={i}>
                <Card activity={category} subcategories={subcategories}/>
            </li>
        )
    })

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login');
        }
        // else {
        //     fetch(import.meta.env.VITE_SERVER + "activities/", {
        //         method: "GET",
        //         // "Access-Control-Allow-Origin": "http://localhost:5173/"
        //         headers: {
        //             // "Access-Control-Allow-Origin": "http://localhost:5173/",
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         }
                
        //     })
        //         .catch((e) => {console.error(e)})
        //         .then((response) => console.log(response))
        // }
    }, [])

    return (
        <>
            <Navbar />
            <h1 className="m-4">Activities</h1>
            <ul className="grid grid-cols-3 gap-6">{mainCategories}</ul> 
        </>
    )

}

export default Activities;