var express = require('express');
var router = express.Router();
const Queue = require('../models/Queue');
const mongoose = require('mongoose');
const { QueueStatus } = require('./../appConstant');
let io = require('socket.io-client');

router.get('/', async (req, res, next) => {

  try {
    const services = await Queue.find({ status: { $in: [QueueStatus.CALLED, QueueStatus.QUEUED] } })
      .sort({ isPriority: 'desc', createdAt: 'asc' });

    const test = services.map((service) => {
      return {
        ...service.toJSON(),
        id: service._id
      }
    });

    res.status(200).json(test);
  } catch (e) {
    res.status(404).json({ e });
  }

});

router.patch('/call/:queueId', async (req, res, next) => {
  const { queueId } = req.params
  const { counterId } = req.body

  // try{

  if (!mongoose.Types.ObjectId.isValid(queueId)) {
    return res.status(400).json({ message: 'Invalid ID.' })
  }

  const queue = await Queue.findById(queueId).where('status').equals(QueueStatus.QUEUED)
  if (queue) {
    queue.status = QueueStatus.CALLED
    queue.counterId = counterId
    queue.calledAt = Date.now()
    await queue.save()

    socket = io(`${req.secure ? 'https' : 'http'}://localhost:${process.env.PORT}`, { secure: true, reconnect: true, rejectUnauthorized: false });
    socket.emit('message', 'Queue callled.');

    res.status(200).json({ message: 'Queue callled.' })
    return;


  }

  return res.status(404).json({ message: 'Not found.' })

  // } catch(e) {

  //   return res.status(400).json({e});

  // }

})

router.patch('/done/:queueId', async (req, res, next) => {
  const { queueId } = req.params
  const { counterId } = req.body

  // try{

  if (!mongoose.Types.ObjectId.isValid(queueId)) {
    return res.status(400).json({ message: 'Invalid ID.' })
  }

  const queue = await Queue.findById(queueId).where('status').equals(QueueStatus.CALLED)
  console.log(queue)
  if (queue) {
    queue.status = QueueStatus.DONE
    queue.counterId = counterId
    queue.doneAt = Date.now()
    await queue.save()

    socket = io(`${req.secure ? 'https' : 'http'}://localhost:${process.env.PORT}`, { secure: true, reconnect: true, rejectUnauthorized: false });
    socket.emit('message', 'Queue updated.');

    res.status(200).json({ message: 'Queue Done.' })
    return;
  }

  return res.status(404).json({ message: 'Not found.' })

  // } catch(e) {

  //   return res.status(400).json({e});

  // }

})

router.post('/', async (req, res, next) => {

  // try {

  const {
    customerName,
    customerType,
    services
  } = req.body;

  // get ordinal number
  const isPriority = customerType > 1;
  const queueCount = await (await Queue.find({ isPriority })).length
  const ordinal = queueCount + 1;

  status = QueueStatus.QUEUED;

  const queue = new Queue({
    customerName,
    customerType,
    isPriority,
    services,
    ordinal,
    status
  });

  await queue.save()

  socket = io(`${req.secure ? 'https' : 'http'}://localhost:${process.env.PORT}`, { secure: true, reconnect: true, rejectUnauthorized: false });
  socket.emit('message', 'New Queue created.');

  res.status(201).json({ queue });

  // } catch (e) {

  //   res.status(400).json(e);

  // }

});

module.exports = router;
