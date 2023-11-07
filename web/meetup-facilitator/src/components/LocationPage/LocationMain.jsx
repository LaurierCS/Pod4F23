import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import GoogleMapComponent from './GoogleMapComponent';
import AddressInput from './AddressInput';

function ContinuousSlider({ value, onChange }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Slider
        value={value}
        onChange={onChange}
        min={1}
        max={100}
        sx={{ flex: 1 }}
      />

      <Typography variant="body1" sx={{ paddingLeft: 1, paddingRight: 1 }}>
        {value} km
      </Typography>
    </Box>
  );
}
function LocationMain() {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [sliderValue, setSliderValue] = useState(30);
  
    function handleAddressChange(newAddress, newCoordinates) {
      setAddress(newAddress);
      setCoordinates(newCoordinates);
    }
  
    const handleSliderChange = (event, newValue) => {
      setSliderValue(newValue);
    };
  
    return (
      <div className="flex h-screen">
        <div className="w-1/2 p-10 border border-gray-300">
          <h1>Slider</h1>
          <ContinuousSlider value={sliderValue} onChange={handleSliderChange} />
          <Typography variant="body2">
            Slider Value: {sliderValue} km
          </Typography>
        </div>
        <div className="w-1/2 p-10 border border-gray-300">
          <h1>Enter your location</h1>
          <AddressInput onAddressChange={handleAddressChange} />
          {coordinates && (
            <Typography variant="body2">
              Coordinates: {coordinates.lat}, {coordinates.lng}
            </Typography>
          )}
          
        </div>
        <div className="w-1/2 p-10 border border-gray-300">
          <h1>Place Google Maps API here</h1>
          <GoogleMapComponent address={address} coordinates={coordinates} radius={sliderValue} />

        </div>
      </div>
    );
  }
  
  export default LocationMain;
  