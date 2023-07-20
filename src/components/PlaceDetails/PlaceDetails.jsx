import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { StyledCard, classes } from './styles';

function PlaceDetails({ place, selected, refProp }) {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <StyledCard elevation={1}>
      <CardContent>
        <CardMedia
          style={{ height: 350, marginBottom: '10px' }}
          image={
            place?.photo
              ? place.photo.images.large.url
              : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
          }
          title={place.name}
        />

        {place?.name && (
          <Typography gutterBottom variant="h5">
            {place.name}
          </Typography>
        )}

        {place?.rating && (
          <Box display="flex" justifyContent="space-between">
            <Rating size="small" value={+place.rating} readOnly />
            <Typography gutterBottom variant="subtitle1">
              out of {place.num_reviews} reviews
            </Typography>
          </Box>
        )}
        {place?.price_level && (
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Price</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.price_level}
            </Typography>
          </Box>
        )}

        {place?.ranking && (
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.ranking}
            </Typography>
          </Box>
        )}

        {place?.awards?.map((award) => (
          <Box
            display="flex"
            my={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="text.secondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}

        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}

        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="text.secondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}

        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="text.secondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}

        <CardActions>
          {place?.web_url && (
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => window.open(place.web_url, '_blank')}
            >
              Trip Advisor
            </Button>
          )}

          {place?.website && (
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => window.open(place.website, '_blank')}
            >
              Website
            </Button>
          )}
        </CardActions>
      </CardContent>
    </StyledCard>
  );
}

export default PlaceDetails;
