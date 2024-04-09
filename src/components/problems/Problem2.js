import countries from '../util/countries'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


// Install MUI https://mui.com/material-ui/getting-started/installation/
// Lets make an Autocomplete https://mui.com/material-ui/react-autocomplete/
// It will use the countries array, the same one used in the from-scratch autocomplete
// we made in an earlier exercise.
const Problem2 = () => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={countries}
      getOptionLabel={(country) => country.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Country" />}
    />
  );
}

export default Problem2;
