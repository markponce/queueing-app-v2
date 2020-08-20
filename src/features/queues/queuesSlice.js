import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQueues = createAsyncThunk('queues', async () => {
  const res = await axios.get('queues');
  return await res.data;
})

export const queuesSlice = createSlice({
  name: 'queues',
  initialState: {
    queues: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setQueues: (state, action) => {

    }
  },
  extraReducers: {
    [fetchQueues.pending]: (state, action) => {
      state.status = 'loading'
      console.log('loading')
    },
    [fetchQueues.fulfilled]: (state, action) => {
      state.status = 'success'
      state.queues = action.payload
      console.log('success')
    },
    [fetchQueues.rejected]: (state, action) => {
      state.status = 'failed'
      console.log(action);
      state.error = action.payload
      console.log('failed')
    },
  }
});

// const { setQueues } = queuesSlice.actions;

export const selectQueues = (state) => {
  return state.queues;
}

export default queuesSlice.reducer;
