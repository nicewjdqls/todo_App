const express = require('express');
const router = express.Router();
const taskApi = require('./task.api');

router.use('/tasks', taskApi);

module.exports = router;
