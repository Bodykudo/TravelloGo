import { styled } from '@mui/material/styles';
import { Marker } from '@react-google-maps/api';

const PREFIX = 'MapItem';
export const classes = {
  card: `${PREFIX}-card`,
  image: `${PREFIX}-image`,
};

export const StyledCard = styled('div')(() => ({
  [`& .${classes.card}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '200px',
  },

  [`& .${classes.image}`]: {
    cursor: 'pointer',
    width: '100%',
    marginBottom: '5px',
  },
}));
