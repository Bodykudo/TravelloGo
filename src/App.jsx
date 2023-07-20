import { CssBaseline, Grid } from '@mui/material';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { useEffect, useState } from 'react';
import { getPlacesData, getWeatherData } from './api';

function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [clickedPlace, setClickedPlace] = useState();
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);
  const [weatherData, setWeatherData] = useState({});
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

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

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      // console.log(coordinates);
      // console.log(bounds);
      setIsLoadingPlaces(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        // console.log(data);
        setFilteredPlaces([]);
        setPlaces(data.filter((place) => place.name));
        setIsLoadingPlaces(false);
      });
    }
  }, [type, bounds]);

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
              isLoadingWeather={isLoadingWeather}
              isLoadingPlaces={isLoadingPlaces}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
              weatherData={weatherData}
            />
          </Grid>

          <Grid item xs={12} sm={7} md={8}>
            <Map
              coordinates={coordinates}
              bounds={bounds}
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
