import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const PREFIX = 'PlaceDetails';
export const classes = {
  chip: `${PREFIX}-chip`,
  subtitle: `${PREFIX}-subtitle`,
  spacing: `${PREFIX}-spacing`,
};

export const StyledCard = styled(Card)(() => ({
  [`& .${classes.chip}`]: {
    margin: '5px 5px 5px 0',
  },

  [`& .${classes.subtitle}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
  },

  [`& .${classes.spacing}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
