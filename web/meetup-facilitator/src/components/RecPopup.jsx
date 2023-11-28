// RecPopup.jsx
import React, { useState } from 'react';

const RecPopup = ({ closeModal, times, onSelect }) => {
    
    const [selectedButton, setSelectedButton] = useState(null);

    
    const handleButtonClick = (buttonId) => {
        setSelectedButton(buttonId);
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-80" onClick={closeModal}></div>
    
          <div className="bg-white p-8 rounded-lg shadow-md relative z-10">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Choose a time</h2>
    
            {times.map((time, index) => (
            <div
                key={index}
                className={`rounded-lg p-4 mb-4 cursor-pointer ${
                selectedButton === index ? 'border-2 border-green-500 text-gray-700 bg-gray-300' : 'bg-gray-300'
                }`}
                onClick={() => {
                handleButtonClick(index);
                onSelect(time);
                
                }}
            >
                <p className={selectedButton === index ? 'text-gray-700' : ''}>
                {time}
                </p>
            </div>
            ))}
    
            <button
              className="mt-4 bg-slate-700 text-white py-2 px-4 rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      );
    };
    
    export default RecPopup;