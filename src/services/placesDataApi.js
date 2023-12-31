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
