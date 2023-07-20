import { styled } from '@mui/material/styles';

const PREFIX = 'List';

export const classes = {
  formControl: `${PREFIX}-formControl`,
  loading: `${PREFIX}-loading`,
  container: `${PREFIX}-container`,
  list: `${PREFIX}-list`,
};

export const ListContainer = styled('div')(({ theme }) => ({
  [`& .${classes.formControl}`]: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: '30px',
  },

  [`& .${classes.loading}`]: {
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  [`&.${classes.container}`]: {
    padding: '25px',
  },

  [`& .${classes.list}`]: {
    height: '60vh',
    overflow: 'auto',
    paddingBottom: '5px',
    [theme.breakpoints.down('md')]: {
      height: '80vh',
    },
  },
}));
