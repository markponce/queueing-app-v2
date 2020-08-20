var express = require('express');
var router = express.Router();
const {Service} = require('../models/Service');

router.get('/', async (req, res, next) => {

  try {
    services = await  Service.find();
    res.status(200).send(services);
  } catch (e) {
    res.status(404).send({e});
  }

});

router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const service = new Service({ name, description });
    await service.save();
    res.status(201).json({ service });
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
