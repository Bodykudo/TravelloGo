import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;

  const blLat = sw?.lat;
  const blLng = sw?.lng;
  const trLat = ne?.lat;
  const trLng = ne?.lng;

  const content = {
    params: {
      bl_latitude: blLat,
      tr_latitude: trLat,
      bl_longitude: blLng,
      tr_longitude: trLng,
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_TRAVEL_API_KEY,
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    },
  };

  try {
    const {
      data: { data },
    } = await axios.request(URL, content);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const params = {
    lat: lat,
    lon: lng,
    appid: apiKey,
    units: 'metric', // You can change this to 'imperial' for Fahrenheit.
  };

  try {
    const response = await axios.get(apiBaseUrl, { params });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
