import { styled } from '@mui/material/styles';

const PREFIX = 'WeatherCard';

export const classes = {
  weatherCard: `${PREFIX}-weatherCard`,
  weatherIcon: `${PREFIX}-weatherIcon`,
};

export const StyledCard = styled('div')(({ theme }) => ({
  [`& .${classes.weatherCard}`]: {
    margin: '15px auto',
    textAlign: 'center',
    borderRadius: 12,
  },

  [`& .${classes.weatherIcon}`]: {
    margin: '-15px auto -30px',
  },
}));
