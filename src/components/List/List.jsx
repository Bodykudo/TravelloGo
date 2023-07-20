import { createRef, useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { ListContainer, classes } from './styles';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import WeatherCard from '../WeatherCard/WeatherCard';

function List({
  places,
  clickedPlace,
  isLoadingPlaces,
  weatherData,
  isLoadingWeather,
  type,
  setType,
  rating,
  setRating,
}) {
  // Set the list of refs to empty
  const [elRefs, setElRefs] = useState([]);

  // Once places data is loaded, create ref for each place
  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  // Handle filters
  function onTypeChange(e) {
    setType(e.target.value);
  }

  function onRatingChange(e) {
    setRating(e.target.value);
  }

  return (
    <ListContainer className={classes.container}>
      <WeatherCard
        weatherData={weatherData}
        isLoadingWeather={isLoadingWeather}
      />

      {isLoadingPlaces ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select value={type} label="Type" onChange={onTypeChange}>
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Rating</InputLabel>
              <Select value={rating} label="Rating" onChange={onRatingChange}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={2} className={classes.list}>
            {places?.map(
              (place, i) =>
                place.name && (
                  <Grid ref={elRefs[i]} item key={i} xs={12}>
                    <PlaceDetails
                      place={place}
                      selected={+clickedPlace === i}
                      refProp={elRefs[i]}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </>
      )}
    </ListContainer>
  );
}

export default List;
