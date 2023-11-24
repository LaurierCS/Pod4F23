// ... (imports)
import RecGoogleMap from './RecGoogleMap';
import RecPopup from './RecPopup'; // Import RecPopup component
import React, { useState, useEffect } from 'react';

const extract_coordinates_from_google_maps_url = (url) => {
  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

  if (match && match.length === 3) {
    const [_, latitude, longitude] = match;
    return { lat: parseFloat(latitude), lng: parseFloat(longitude) };
  }

  return null;
};

const Recommendation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [sampleCoordinates, setSampleCoordinates] = useState([]);
  const [popupTimes, setPopupTimes] = useState([]);
  const [votesData, setVotesData] = useState([]);
  const isSaveButtonDisabled = isModalOpen && selectedTime === null;
  //update vote when time is selected
  const updateVotes = (selectedTime, recommendationId) => {
    const index = recommendations.findIndex((rec) => rec.id === recommendationId);
    const updatedRecommendations = [...recommendations];
    updatedRecommendations[index].votes = (updatedRecommendations[index].votes || 0) + 1;
    setRecommendations(updatedRecommendations);
  };

  useEffect(() => {
    // Fetch votes data
    fetch("http://127.0.0.1:8000/groups/group1/votes/", {
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
    fetch("http://127.0.0.1:8080/groups/group1/recs", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setRecommendations(json);

        // Extract coordinates from place_url and save to sampleCoordinates
        const coordinatesArray = json.map((recommendation) => {
          const coordinates = extract_coordinates_from_google_maps_url(recommendation.place_url);
          return coordinates || { lat: 0, lng: 0 }; // Default to (0, 0) if they cant find coordinates fails
        });
        setSampleCoordinates(coordinatesArray);
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
      });
  }, []);

  const openModal = (index) => {
    setSelectedDiv(index);
    setIsModalOpen(true);
    setPopupTimes(recommendations[index].times || []);
  };

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


  return (
    <div className="flex">
      <div className="flex-row w-1/2 px-10"> 
        <h2 className="py-8 text-2xl">Recommendation Page</h2>

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
                  <strong>Type of Activity:</strong> <br />{recommendation.activity_id}
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
        <RecGoogleMap coordinates={sampleCoordinates} />
      </div>

      {isModalOpen && (<RecPopup
      closeModal={closeModal} 
      times={popupTimes}
      onSelect={(selectedTime) => {
        updateVotes(selectedTime, recommendations[selectedDiv].id);
        closeModal();
      }}
      />
      )}
        <button
        className={`fixed bottom-4 right-4 bg-green-800 text-white py-2 px-4 rounded-md cursor-pointer ${
          isSaveButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => {
          if (!isSaveButtonDisabled) {
            // The logic to save the vote
            const selectedRecommendation = recommendations[selectedDiv];
            const voteData = {
              rec_id: selectedRecommendation.id,
              selected_time: selectedTime,
              // Add any other relevant data for the vote
            };

            // Perform an API request to save the vote
            fetch("http://127.0.0.1:8000/groups/group1/votes/", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(voteData),
            })
              .then((response) => response.json())
              .then((json) => {
                // Handle the response as needed
                console.log('Vote saved successfully:', json);
              })
              .catch((error) => {
                console.error('Error saving vote:', error);
              });
            }
        }}
        disabled={isSaveButtonDisabled}
        >
        Save Vote
        </button>
    </div>
  );
};

export default Recommendation;
