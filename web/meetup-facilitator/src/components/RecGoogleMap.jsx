import React, { useEffect, useRef } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../config';

function RecGoogleMap({ coordinates }) {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    if (!window.google) {
      const errorMessage = 'Error: Google Maps API not loaded.';
      console.error(errorMessage);
      return;
    }

    if (coordinates && coordinates.length > 0) {
      map.current = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: coordinates[0].lat, lng: coordinates[0].lng },
        zoom: 12, // Adjust the zoom level as needed
      });

      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];

      coordinates.forEach(({ lat, lng }) => {
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: map.current,
        });

        markers.current.push(marker);
      });
    }
  }, [coordinates]);

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '1000px', height: '800px' }} />
    </div>
  );
}

export default RecGoogleMap;
