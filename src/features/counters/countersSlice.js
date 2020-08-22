import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCounters = createAsyncThunk('counters', async () => {
  const res = await axios.get('counters');
  // console.log('countersSlice fetchCounters')
  // console.log(res.data)
  return res.data;
})

export const countersSlice = createSlice({
  name: 'counters',
  initialState: {
    counters: [],
    status: 'idle',
    error: null,
    selectedCounter: ''
  },
  reducers: {
    setSelectedCounter(state, action) {
      // console.log(action.payload);
      state.selectedCounter = action.payload;
    },
  },
  extraReducers: {
    [fetchCounters.pending]: (state, action) => {
      state.status = 'loading'
      // console.log('loading')
    },
    [fetchCounters.fulfilled]: (state, action) => {
      state.status = 'success'
      state.counters = action.payload
      // console.log('success')
    },
    [fetchCounters.rejected]: (state, action) => {
      state.status = 'failed'
      // console.log(action);
      state.error = action.payload
      // console.log('failed')
    },
  }
});

export const {setSelectedCounter} = countersSlice.actions;

export const selectCounters = (state) => {
  // console.log('selectCounters');
  // console.log(state.counters)
  return state.counters;
}

export const selectedCounter = (state) => {
  // console.log('selectCounters');
  // console.log(state.counters)
  return state.selectedCounter;
}

export default countersSlice.reducer;
