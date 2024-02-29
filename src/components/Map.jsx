import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';

const UpdateMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());

  return null;
};

const Map = () => {
  const [error, setError] = useState(null);
  const [userPosition, setUserPosition] = useState({
    latitude: 51.505,
    longitude: -0.09,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function(error) {
          setError(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError(true);
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <MapContainer className='react-weather-map' center={[userPosition.latitude, userPosition.longitude]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UpdateMapView center={[userPosition.latitude, userPosition.longitude]} />
      </MapContainer>
      {error && <p className='react-weather-error-msg'>We were unable to get your starting position.</p>}
    </>
  );
}

export default Map;
