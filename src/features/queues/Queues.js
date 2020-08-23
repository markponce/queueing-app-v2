import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectQueues,
  fetchQueues
} from './queuesSlice';
import io from 'socket.io-client';
import CounterSelect from './../counters/CounterSelect';
import axios from 'axios';
import { selectCounters } from './../counters/countersSlice';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export default function Queues() {
  const {
    queues,
    status,
  } = useSelector(selectQueues);

  const { selectedCounter } = useSelector(selectCounters);
  // const [disableCallButton, setDisableCallButton] = useState(false);
  // const [disableDoneButton, setDisableDoneButton] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect')
    let promise
    promise = dispatch(fetchQueues());
    const socket = io();
    socket.on('message', (msg) => {
      dispatch(fetchQueues());
    });
    return () => {
      if (promise) {
        promise.abort()
      }
    }
  }, [])

  useEffect(() => {
    console.log('useEffect selectedCounter')
    let promise
    promise = dispatch(fetchQueues());
    return () => {
      if (promise) {
        promise.abort()
      }
    }
  }, [selectedCounter])

  // 1: 'NORMAL',
  // 2: 'SENIOR',
  // 3: 'PWD',
  // 4: 'PREGNANT'
  const getCustomerType = (customerType) => {
    switch (customerType) {
      case 2:
        return 'SENIOR'
      case 3:
        return 'PWD'
      case 4:
        return 'PREGNANT'
      default:
        return '-'
    }
  }

  const getServices = ({ services }) => {
    if (Array.isArray(services)) return (
      <ul>
        {
          services.map(s => <li key={s._id}>{s.name}</li>)
        }
      </ul>
    )
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  const showStatus = (status) => {
    if (status === 0) return 'QUEUED';
    if (status === 1) return 'CALLED';
  }

  const callQueue = (id) => {
    if (selectedCounter === '') {
      alert('Select counter first.')
      return
    }

    // setDisableCallButton(true)
    axios.patch('/queues/call/' + id, {
      counterId: selectedCounter
    }).then((d) => d.data)
      .then((d) => {
        // console.log(d)
      })
      .catch((e) => {
        // console.log(e)
        alert(e)
      })
    // .finally(() => )
  }

  const doneQueue = (id) => {
    if (selectedCounter === '') {
      alert('Select counter first.')
      return
    }
    // setDisableDoneButton(true)
    axios.patch('/queues/done/' + id, {
      counterId: selectedCounter
    })
      .then((d) => {
        // console.log(d.data)
        return d.data
      })
      .then((d) => {
        // console.log(d)
      })
      .catch((e) => {
        // console.log(e)
        alert(e)
      })
    // .finally(() => setDisableDoneButton(false))
  }

  return (
    <div style={{ padding: '20px' }}>
      <CounterSelect />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Number</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Service</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Array.isArray(queues) && queues.map(queue => {
                return (
                  <TableRow key={queue.id}>
                    <TableCell align="center" component="th" scope="row">
                      <div>{queue.id}</div>
                      {queue.isPriority && 'P'}{queue.ordinal.toString().padStart(4, '0')}
                    </TableCell>
                    <TableCell align="center">{getCustomerType(queue.customerType)}</TableCell>
                    <TableCell align="center">{queue.customerName}</TableCell>
                    <TableCell align="center">{getServices(queue)}</TableCell>
                    <TableCell align="center">{showStatus(queue.status)}</TableCell>
                    <TableCell align="center">
                      {(queue.status === 0 && selectedCounter)  && <Button variant="contained" color="primary" onClick={() => callQueue(queue.id)}>Call</Button>}
                      {(queue.status === 1 && selectedCounter) && <Button variant="contained" color="primary" onClick={() => doneQueue(queue.id)}>Done</Button>}
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
