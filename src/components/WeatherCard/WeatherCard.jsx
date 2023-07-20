import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import { StyledCard, classes } from './styles';
import { countries } from 'country-data';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

function WeatherCard({ isLoadingWeather, weatherData }) {
  return (
    <StyledCard>
      <Card className={classes.weatherCard} elevation={1}>
        {isLoadingWeather ? (
          <CircularProgress />
        ) : (
          <>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`}
              className={classes.weatherIcon}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {weatherData?.name} -{' '}
                {countries[weatherData?.sys?.country]?.name}
              </Typography>
              <Box
                display="flex"
                justifyContent="space-around"
                flexDirection={{
                  xs: 'column',
                  sm: 'row',
                  md: 'column',
                  lg: 'row',
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <ThermostatIcon />
                  <Typography variant="body1">
                    Temperature: {weatherData?.main?.temp}°C
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <WaterDropIcon />
                  <Typography variant="body1">
                    Humidity: {weatherData?.main?.humidity}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </>
        )}
      </Card>
    </StyledCard>
  );
}

export default WeatherCard;
