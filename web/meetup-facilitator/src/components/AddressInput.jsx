import React, { useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const AddressInput = ({ onAddressChange }) => {
  const [address, setAddress] = useState('');
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.API_KEY, // Add API_KEY to .env
    libraries,
  });

  const handleSelect = (address) => {
    if (!address) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const coordinates = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        onAddressChange(address, coordinates);
      }
    });
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
              handleSelect(place.formatted_address);
            }
          });
        }}
      >
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Autocomplete>
    </div>
  );
};

export default AddressInput;
