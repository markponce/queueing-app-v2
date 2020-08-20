var express = require('express');
var router = express.Router();
const Queue = require('../models/Queue');


router.get('/', async (req, res, next) => {
  
  try {
    const services = await Queue.find();

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

router.post('/', async (req, res, next) => {

  try {

    const {
      customerName,
      customerType,
      services
    } = req.body;

    console.log(req.body);

    const isPriority = customerType > 1;

    const queueCount = await (await Queue.find({ isPriority })).length

    const ordinal = queueCount + 1;

    const startedAt = null;
    const finishAt = null;

    const queue = new Queue({
      customerName,
      customerType,
      isPriority,
      startedAt,
      finishAt,
      services,
    });

    await queue.save()

    res.status(201).json({ queue });
  } catch (e) {
    res.status(400).json(e);
  }

});

module.exports = router;
