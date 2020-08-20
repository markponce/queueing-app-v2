import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import queuesReducer from '../features/queues/queuesSlice';


export default configureStore({
  reducer: {
    counter: counterReducer,
    queues: queuesReducer
  },
});
