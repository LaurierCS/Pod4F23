import React, { useState, useContext } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import GoogleMapComponent from './GoogleMapComponent';
import AddressInput from './AddressInput';
import { Link } from 'react-router-dom';
import { preferencesContext } from '../pages/Preferences';

function ContinuousSlider({ value, onChange }) {
  return (
    <div className="flex items-center">
      <Slider
        value={value}
        onChange={onChange}
        min={1}
        max={100}
        style={{ color: 'darkgreen', marginLeft: '40px' }}
      />
      <Typography variant="body1" sx={{ marginLeft: 1 }}>
        
         Maximum distance you would travel: {value} km
      </Typography>
    </div>
  );
}

function LocationComponent() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [sliderValue, setSliderValue] = useState(30);
  const prefsContext = useContext(preferencesContext);

  function handleAddressChange(newAddress, newCoordinates) {
    setAddress(newAddress);
    setCoordinates(newCoordinates);
    prefsContext.updateLocationPrefs(newCoordinates, sliderValue);
  }

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    prefsContext.updateLocationPrefs(coordinates, newValue);

  };

  return (

    <div className="flex items-center flex-col h-screen p-8">
  <h1 className="mb-4">Location</h1>

  <div className="flex space-x-20">
    <div className="p-4 flex flex-col w-1/2">
      <h1 className="text-2xl mb-2">Distance</h1>
      <ContinuousSlider value={sliderValue} onChange={handleSliderChange} />
    </div>

    <div className="p-4 flex items-center flex-col w-1/2">
      <h1 className="text-2xl mb-2">Enter your location</h1>
      <br></br>
      <AddressInput onAddressChange={handleAddressChange} />
      {coordinates && (
        <Typography variant="body2">
        </Typography>
      )}
    </div>
  </div>

            
      <div className="p-4 border flex justify-center items-center mt-4 border-none">
        <div className="w-50">
          {(address !== '') && <GoogleMapComponent address={address} coordinates={coordinates} radius={sliderValue} />}
        </div>

      </div>
    </div>
  );
}

export default LocationComponent;
