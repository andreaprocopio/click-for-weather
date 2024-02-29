import React from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import ErrorBanner from './ErrorBanner';
import MapOverlay from './MapOverlay';

const UpdateMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());

  return null;
};

const HandleMapClick = ({handleSetWeatherCords}) => {
  const map = useMapEvents ({
    click(e) {
      handleSetWeatherCords(e.latlng.lat, e.latlng.lng)
    }
  })
  return null;
};

const Map = ({handleSetWeatherCords, weatherCords}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  function handleBannerClose() {
    setError(null)
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        function(position) {
          handleSetWeatherCords(position.coords.latitude, position.coords.longitude)
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
      <MapContainer className='react-weather-map h-[400px] md:h-[500px] lg:h-[600px] rounded-lg relative' center={[weatherCords.latitude, weatherCords.longitude]} zoom={13} scrollWheelZoom={false}>
        {loading && !error && <MapOverlay />}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UpdateMapView center={[weatherCords.latitude, weatherCords.longitude]} />
        <HandleMapClick handleSetWeatherCords={handleSetWeatherCords} />
      </MapContainer>
    </>
  );
}

export default Map;
