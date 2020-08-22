import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import queuesReducer from '../features/queues/queuesSlice';
import countersReducer from '../features/counters/countersSlice';



export default configureStore({
  reducer: {
    counter: counterReducer,
    queues: queuesReducer,
    counters : countersReducer
  },
});
