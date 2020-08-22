var express = require('express');
var router = express.Router();
const { Counter } = require('../models/Counter');
const Queue = require('../models/Queue');
const { QueueStatus } = require('./../appConstant');
router.get('/queue', async (req, res, next) => {

  // try {
  counters = await Counter.find();
  
  const newCounters = []

  for (let i = 0; i < counters.length; i++) {

    const queue = await Queue.findOne({
      counterId: counters[i]._id,
      status: QueueStatus.CALLED,
    }).sort({
      updatedAt: 'asc'
    }).select('isPriority ordinal')

    let queuetoJSON = {};
    let number = '';
    if(queue) {
      queuetoJSON = queue.toJSON();
      number = `${queuetoJSON.isPriority ? 'P' : ''}${queuetoJSON.ordinal.toString().padStart(4, '0')}`
    }

    newCounters.push({
      ...counters[i].toJSON(),
      queues: {
        ...queuetoJSON,
        number
      }
    })
  }

  res.status(200).send(newCounters);
  // } catch (e) {
  //   res.status(404).send({ e });
  // }

});

router.get('/', async (req, res, next) => {

  try {
    counters = await Counter.find();
    res.status(200).send(counters);
  } catch (e) {
    res.status(404).send({ e });
  }

});



router.post('/', async function (req, res, next) {
  try {
    const { name, description } = req.body;
    const counter = new Counter({ name, description });
    await counter.save();
    res.status(201).json({ counter });
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;