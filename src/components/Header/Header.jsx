import { Autocomplete } from '@react-google-maps/api';
import { Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  Search,
  SearchIconWrapper,
  StyledAppBar,
  StyledInputBase,
  classes,
} from './styles';
import { useState } from 'react';

function Header({ setCoordinates }) {
  const [autocomplete, setAutocomplete] = useState(null);

  function handleLoad(autoC) {
    setAutocomplete(autoC);
  }

  function handlePlaceChanged() {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  }

  return (
    <StyledAppBar position="static">
      <Toolbar className={classes.toolbar}>
        <img src="icon.png" style={{ height: '40px', cursor: 'pointer' }} />

        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Autocomplete>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Header;
