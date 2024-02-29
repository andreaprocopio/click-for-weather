import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import ErrorBanner from './ErrorBanner';
import MapOverlay from './MapOverlay';

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
  const [loading, setLoading] = useState(false)

  function handleBannerClose() {
    setError(null)
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        function(position) {
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false)
        },
        function(error) {
          setLoading(false)
          setError(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setLoading(false)
      setError(true);
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      {error && <ErrorBanner text={"We were unable to get your starting position."} handleBannerClose={handleBannerClose} />}    
      <MapContainer className='react-weather-map h-[400px] md:h-[500px] lg:h-[600px] rounded-lg relative' center={[userPosition.latitude, userPosition.longitude]} zoom={13} scrollWheelZoom={false}>
        {loading && !error && <MapOverlay />}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UpdateMapView center={[userPosition.latitude, userPosition.longitude]} />
      </MapContainer>
    </>
  );
}

export default Map;
