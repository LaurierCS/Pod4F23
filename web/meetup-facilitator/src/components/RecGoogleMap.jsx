import React, { useEffect, useRef } from 'react';

function RecGoogleMap({ coordinates, recommendations }) {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const infoWindow = useRef(null);

  useEffect(() => {
    if (!window.google) {
      const errorMessage = 'Error: Google Maps API not loaded.';
      console.error(errorMessage);
      return;
    }

    if (coordinates && coordinates.length > 0) {
      map.current = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: coordinates[0].lat, lng: coordinates[0].lng },
        zoom: 12,
      });

      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];

      infoWindow.current = new window.google.maps.InfoWindow({
        maxWidth: 200, // Set max width to control the size of the InfoWindow
      });

      coordinates.forEach(({ lat, lng }, index) => {
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: map.current,
        });

        markers.current.push(marker);

        marker.addListener('mouseover', () => {
          if (recommendations && recommendations[index]) {
            const content = recommendations[index].place_name;
            console.log('Hovered Place Name:', content);
        
            infoWindow.current.setContent(`<div style="font-size: 16px; color: black;">${content}</div>`);
        
            // Disable the close button ('x') on the info window
            infoWindow.current.setOptions({
              disableAutoPan: true, // Disable auto-panning
              maxWidth: 200,
            });
        
            infoWindow.current.open(map.current, marker);
          }
        });

        marker.addListener('mouseout', () => {
          infoWindow.current.close();
        });
      });
    }
  }, [coordinates, recommendations]);

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '1000px', height: '800px' }} />
    </div>
  );
}

export default RecGoogleMap;
