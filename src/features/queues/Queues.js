import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectQueues,
  fetchQueues
} from './queuesSlice';


export default function Queues() {

  const { queues, status, error } = useSelector(selectQueues);
  const dispatch = useDispatch();

  useEffect(() => {
    let promise;
    if(status === 'idle') {
      promise = dispatch(fetchQueues());
    }

    return () => {
      if(promise) {
        promise.abort()
      }
    }
  }, [queues])

  return (
  
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {
          Array.isArray(queues) && queues.map(queue => {
            return (<tr key={queue.id}>
              <td>{queue.id}</td>
              <td>{queue.customerName}</td>
            </tr>)
          })

        }
      </tbody>
    </table>
  )
}
