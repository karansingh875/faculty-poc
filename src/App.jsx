import { useState } from "react";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 60000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };
  return (
    loading ? <h4 color="red">please wait while we are fetching the location...</h4> : <>
      <button onClick={getLocation}>Show your location</button>

      {longitude && <h3>
        Longitude: {longitude}
      </h3>}
      {latitude && <h3>
        lattitude: {latitude}
      </h3>}
      {error && <h3>
        Error: {error}
      </h3>}
    </>
  );
}

export default App;
