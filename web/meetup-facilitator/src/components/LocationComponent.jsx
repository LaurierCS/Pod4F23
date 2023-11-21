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
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="flex space-x-4">
        <div className="p-4 border flex justify-center items-center flex-col">
          <h1>Slider</h1>
          <ContinuousSlider value={sliderValue} onChange={handleSliderChange} />
        </div>

        <div className="p-4 border flex justify-center items-center flex-col">
          <h1>Enter your location</h1>
          <AddressInput onAddressChange={handleAddressChange} />
          {coordinates && (
            <Typography variant="body2">
              Coordinates: {coordinates.lat}, {coordinates.lng}
            </Typography>
          )}
        </div>
      </div>

      <div className="p-4 border flex justify-center items-center mt-4">
        <h1>Place Google Maps API here</h1>
        <div className="w-50">
          <GoogleMapComponent address={address} coordinates={coordinates} radius={sliderValue} />
        </div>

      </div>
    </div>
  );
}

export default LocationComponent;
