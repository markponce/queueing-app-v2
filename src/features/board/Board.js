import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import io from 'socket.io-client';

export default function Board() {

  const [countersQueue, setcountersQueue] = useState([])




  useEffect(() => {

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let promise = axios.get('counters/queue', {
      cancelToken: source.token
    })
      .then(res => setcountersQueue(res.data))
      .catch(e => console.log(e))

    const socket = io();
    socket.on('message', (msg) => {
      promise = axios.get('counters/queue', {
        cancelToken: source.token
      })
        .then(res => setcountersQueue(res.data))
        .catch(e => console.log(e))
    });

    return () => {
      source.cancel()
    }

  }, [])


  return (
    <TableContainer component={Paper}>
      <Table aria-label="Counter Queues">
        <TableHead>
          <TableRow>
            <TableCell>Counter</TableCell>
            <TableCell align="right">Number</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {countersQueue.map((cq) => (
            <TableRow key={cq._id}>
              <TableCell component="th" scope="row">
                {cq.name}
              </TableCell>
              <TableCell align="right">{cq.queues.number ?? '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}