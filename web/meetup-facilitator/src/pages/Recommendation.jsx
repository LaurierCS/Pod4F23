// ... (imports)
import RecGoogleMap from './RecGoogleMap';
import RecPopup from './RecPopup'; // Import RecPopup component
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";



const Recommendation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [sampleCoordinates, setSampleCoordinates] = useState([]);
  const [popupTimes, setPopupTimes] = useState([]);
  const [votesData, setVotesData] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const {group_id} = useParams();
  const userdata = {
    'user_id': localStorage.getItem('email')
  } 
  //handle on select recpopup
  const onSelectHandler = (selectedTime) => {
    updateVotes(selectedTime, recommendations[selectedDiv].id);
  };

  //update vote when time is selected
  const updateVotes = (selectedTime, recommendationId) => {
    const index = recommendations.findIndex((rec) => rec.id === recommendationId);
    const updatedRecommendations = [...recommendations];
    updatedRecommendations[index].votes = (updatedRecommendations[index].votes || 0) + 1;
    setRecommendations(updatedRecommendations);
    setSelectedTime(selectedTime);
  };
  //get coordinates and open modal
  const openModal = (index) => {
    setSelectedDiv(index);
    setIsModalOpen(true);

    const currentRecommendation = recommendations[index];

    // Extract coordinates
    const coordinates = {
      lat: currentRecommendation.loc_lat,
      lng: currentRecommendation.loc_long,
    };

    setSampleCoordinates([coordinates]);

    // Set other required state variables
    const timesArray = currentRecommendation.times.map((time) => {
      const dateObject = new Date(time);
      const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      return dateObject.toLocaleString('en-US', options);
    });

    setPopupTimes(timesArray);
  };

  useEffect(() => {
    // Fetch votes data
    fetch(import.meta.env.VITE_SERVER + `groups/${group_id}/votes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setVotesData(json);
      })
      .catch((error) => {
        console.error('Error fetching votes:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch recommendations data
    fetch(import.meta.env.VITE_SERVER + `groups/${group_id}/recs/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((json) => {
        json.map((rec) => {
          rec.times = JSON.parse(rec.times);
        });
        setRecommendations(json);
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
      });
  }, []);

  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //error check if no recommendation
  if (recommendations.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">
          We couldn't find a place for your group to meet. Try changing your activities, times, or location range!
        </p>
      </div>
    );
  }

  //webpage format
  return (
    <div className="flex">
      <div className="flex-row w-1/2 px-10"> 
        <h2 className="py-8 text-2xl">Recommendation</h2>

        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className={`py-2 mb-6 h-44 rounded-lg bg-slate-500 cursor-pointer ${
              selectedDiv === index ? 'border-2 border-green-500' : ''
            }`}
            onClick={() => openModal(index)}
          >

            <div className="flex flex-col items-center h-full">
              <button
                onClick={() => window.open(recommendation.place_url, '_blank')}
                className="text-white text-xl bg-slate-500 mb-4" 
              >
                {recommendation.place_name}
              </button>
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <strong>Type of Activity:</strong> <br /> {recommendation.activity_id.replace(/[_+]/g, ' ')}
                </div>
                <div className=" bg-green-700 w-8 h-8 rounded-full flex items-center justify-center">
                  {votesData.filter(vote => vote.rec_id === recommendation.id).length}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
            
      <div className="w-2/3">
        <RecGoogleMap coordinates={sampleCoordinates} recommendations={recommendations} />
      </div>

      {isModalOpen && (<RecPopup
      closeModal={closeModal} 
      times={popupTimes}
      onSelect={onSelectHandler}
      coordinates={sampleCoordinates}
      />
      )}
        <button
        className={`fixed bottom-4 right-4 bg-green-800 text-white py-2 px-4 rounded-md cursor-pointer
        }`}
        onClick={() => {

          if (selectedDiv !== null && selectedDiv !== undefined && selectedTime !== null && selectedTime !== undefined) {
            // The logic to save the vote
            const selectedRecommendation = recommendations[selectedDiv];
            const voteData = {
              rec_id: selectedRecommendation.id,
              selected_time: selectedTime,
              user_id: userdata.user_id,
              group_id: group_id,
            };

            // Perform an API request to save the vote
            fetch(import.meta.env.VITE_SERVER + `groups/${group_id}/votes/`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(voteData),
            })
              .then((response) => response.json())
              .then((json) => {
                console.log('POST Request Data:', {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(voteData),
                });
                // Handle the response as needed
                console.log('Vote saved successfully:', json);
              })
              .catch((error) => {
                console.error('Error saving vote:', error);
              });
            } else {
              // Handle the case where the button is disabled (e.g., show an error message)
              alert('Cannot save vote. Please select a recommended location and time before saving a vote.');
            }
        }}
        >
        Save Vote
        </button>
    </div>
  );
};


export default Recommendation;
