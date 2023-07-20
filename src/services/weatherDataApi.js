import axios from 'axios';

export const getWeatherData = async (lat, lng) => {
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const URL = 'https://api.openweathermap.org/data/2.5/weather';

  const params = {
    lat: lat,
    lon: lng,
    appid: apiKey,
    units: 'metric',
  };

  try {
    const response = await axios.get(URL, { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
