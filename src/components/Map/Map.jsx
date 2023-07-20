import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import MapItem from '../MapItem/MapItem';
import { useMediaQuery } from '@mui/material';
import { mapStyles } from './mapStyles';

function Map({
  coordinates,
  setCoordinates,
  setBounds,
  places,
  setClickedPlace,
}) {
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const isPhone = useMediaQuery('(max-width: 600px)');

  useEffect(() => console.log(isPhone), [isPhone]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleDragEnd() {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    const newBounds = mapRef.current.getBounds();
    const sw = newBounds.getSouthWest().toJSON();
    const ne = newBounds.getNorthEast().toJSON();
    setCoordinates(newPos);
    setBounds({ sw, ne });
  }

  function handleZoomChanged() {
    if (!mapRef.current) return;
    const newBounds = mapRef.current.getBounds();
    const sw = newBounds.getSouthWest().toJSON();
    const ne = newBounds.getNorthEast().toJSON();
    setBounds({ ne, sw });
  }

  function handleMapClick() {
    setSelectedMarker(null);
    setClickedPlace();
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={
          isPhone
            ? { width: '100%', height: '60vh' }
            : { width: '100%', height: '100vh' }
        }
        center={coordinates}
        zoom={14}
        onLoad={handleLoad}
        onDragEnd={handleDragEnd}
        onZoomChanged={handleZoomChanged}
        options={{
          clickableIcons: false,
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
          styles: mapStyles,
        }}
        onClick={handleMapClick}
      >
        {places?.map((place, i) => (
          <div key={i}>
            <MapItem
              place={place}
              id={i}
              currentItem={selectedMarker}
              setSelectedMarker={setSelectedMarker}
              setClickedPlace={setClickedPlace}
            />
          </div>
        ))}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default Map;
