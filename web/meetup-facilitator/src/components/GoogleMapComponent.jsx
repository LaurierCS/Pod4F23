import React, { useEffect, useRef, useState } from 'react';

function GoogleMapComponent({ address, coordinates, radius, sliderValue }) {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const circle = useRef(null);

  useEffect(() => {
    if (coordinates) {
      const { lat, lng } = coordinates;

      // Determine the zoom level manually
      let zoom;

      if (radius < 4) {
        zoom = 13;
      } else if (radius >= 4 && radius < 6) {
        zoom = 12;
      } else if (radius >= 6 && radius < 10) {
        zoom = 11;
      } else if (radius >= 10 && radius < 15) {
        zoom = 10.5;
      } else if (radius >= 15 && radius < 20) {
        zoom = 10;
      } else if (radius >= 20 && radius < 30) {
        zoom = 9.5;
      } else if (radius >= 30 && radius < 40) {
        zoom = 9;
      } else if (radius >= 40 && radius < 60) {
        zoom = 8.5;
      } else {
        zoom = 8;
      }

      // Create a new map instance with adjusted zoom, marker and circle added
      map.current = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat, lng },
        zoom,
      });

      new window.google.maps.Marker({
        position: { lat, lng },
        map: map.current,
        title: address,
      });

      circle.current = new window.google.maps.Circle({
        strokeColor: '#006400', 
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'transparent',
        fillOpacity: 0,
        map: map.current,
        center: { lat, lng },
        radius: radius * 1000, 
      });
    }
  }, [coordinates, address, radius]);

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '1100px', height: '450px' }} />


    </div>
  );
}

export default GoogleMapComponent;
