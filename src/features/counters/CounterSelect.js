import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';

import { selectCounters, fetchCounters, setSelectedCounter } from './countersSlice';
import { useSelector, useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CounterSelect() {

  const classes = useStyles();
  const { counters, selectedCounter, status } = useSelector(selectCounters);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCounters())
    // dispatch(fetchCounters());
    // effect
    // return () => {
    //   cleanup
    // }
    // console.log(selectedCounter)
  }, [counters])


  const handleChange = (e) => {
    e.preventDefault();
    const val = e.target.value
    // console.log(val)
    dispatch(setSelectedCounter(val))
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="counter">Counter</InputLabel>
        <Select
          native
          value={selectedCounter}
          onChange={handleChange}
          inputProps={{
            name: 'counter',
            id: 'select-ounter',
          }}
        >
          <option aria-label="None" value="" />
          {
            counters.map(c => {
              return (<option key={c._id} value={c._id}>{c.name}</option>)
            })
          }
        </Select>
      </FormControl>
    </div>
  )
}
