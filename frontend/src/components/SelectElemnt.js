import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
      
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      

    },
    
    
  }));

 
  

const SelectElemnt = ({options,handler,title}) => {
    const classes = useStyles();
    const handleChange = (e) => {
        handler(e.target.value)
    };

    return (
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">{title}</InputLabel>
        <Select
          native
          onChange={handleChange}
        >
          <option aria-label="None" value={null} />
          {options.map(e => 
            <option key={e} value={e}>{e}</option>    
        )}
        </Select>
      </FormControl>
    )
}

export default SelectElemnt
