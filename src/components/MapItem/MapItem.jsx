import { Rating, Typography } from '@mui/material';
import { InfoWindow, Marker } from '@react-google-maps/api';
import { StyledCard, classes } from './styles';

function MapItem({
  id,
  place,
  currentItem,
  setSelectedMarker,
  setClickedPlace,
}) {
  const handleMarkerClick = (marker) => {
    setSelectedMarker((current) => (current === marker ? null : marker));
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <Marker
      key={id}
      position={{ lat: +place.latitude, lng: +place.longitude }}
      onClick={() => handleMarkerClick(id)}
    >
      {currentItem === id && (
        <InfoWindow
          position={{ lat: +place.latitude, lng: +place.longitude }}
          onCloseClick={handleInfoWindowClose}
        >
          <StyledCard>
            <div className={classes.card}>
              <Typography variant="subtitle2" gutterBottom>
                {place.name}
              </Typography>
              <img
                className={classes.image}
                src={
                  place.photo
                    ? place.photo.images.large.url
                    : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                }
                alt={place.name}
                onClick={() => setClickedPlace(id)}
              />
              <Rating size="small" value={+place.rating} readOnly />
            </div>
          </StyledCard>
        </InfoWindow>
      )}
    </Marker>
  );
}

export default MapItem;
