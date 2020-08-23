import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQueues = createAsyncThunk('queues/fetchQueues', async () => {
  const res = await axios.get('queues');
  // console.log(res.data)
  return res.data;
})

// export const callQueue = createAsyncThunk('queues', async (id, counterId) => {
//   const res = await axios.patch('queues/' + id);
//   return res.data;
// })

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
    // [callQueue.fulfilled]: (state, action) => {
    //   state.status = 'success'
    //   // state.queues = action.payload
    //   // console.log('success')
    // },
    // [callQueue.rejected]: (state, action) => {
    //   state.status = 'failed'
    //   state.error = action.payload
    //   // console.log('failed')
    // },
    [fetchQueues.pending]: (state, action) => {
      state.status = 'loading'
      // console.log('loading')
    },
    [fetchQueues.fulfilled]: (state, action) => {
      state.status = 'success'
      state.queues = action.payload
      // console.log('success')
    },
    [fetchQueues.rejected]: (state, action) => {
      state.status = 'failed'
      // console.log(action);
      state.error = action.payload
      // console.log('failed')
    },

    // [callQueue.pending]: (state, action) => {
      // state.status = 'loading'
      // console.log('loading')
    // },

    // [callQueue.rejected]: (state, action) => {
      // state.status = 'failed'
      // console.log(action);
      // state.error = action.payload
      // console.log('failed')
    // },
  }
});

// const { setQueues } = queuesSlice.actions;

export const selectQueues = (state) => {
  return state.queues;
}

export default queuesSlice.reducer;
