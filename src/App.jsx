import { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@mui/material';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import { getPlacesData } from './services/placesDataApi';
import { getWeatherData } from './services/weatherDataApi';

function App() {
  // Map Props & States
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [clickedPlace, setClickedPlace] = useState();

  // Places Data
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);

  // Weather Data
  const [weatherData, setWeatherData] = useState({});
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  // Filters States
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);

  // Default coordinates to user coords once the application starts
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setBounds({
          ne: { lat: latitude + 0.15, lng: longitude + 0.3 },
          sw: { lat: latitude - 0.15, lng: longitude - 0.3 },
        });
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // Load new places when user changes the map state
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoadingPlaces(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setFilteredPlaces([]);
        setPlaces(data.filter((place) => place.name));
        setIsLoadingPlaces(false);
      });
    }
  }, [type, bounds]);

  // Filter the places list when the user change the rating
  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  // Load weather data
  useEffect(() => {
    setIsLoadingWeather(true);
    getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
      setWeatherData(data);
      setIsLoadingWeather(false);
    });
  }, [coordinates]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />

      <div style={{ paddingTop: 5 }}>
        <Grid container style={{ width: '100%' }}>
          <Grid item xs={12} sm={5} md={4}>
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              clickedPlace={clickedPlace}
              isLoadingPlaces={isLoadingPlaces}
              weatherData={weatherData}
              isLoadingWeather={isLoadingWeather}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>

          <Grid item xs={12} sm={7} md={8}>
            <Map
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              places={filteredPlaces.length ? filteredPlaces : places}
              setClickedPlace={setClickedPlace}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
