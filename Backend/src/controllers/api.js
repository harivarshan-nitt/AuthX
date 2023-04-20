const api = require('express').Router();

api.use("/clientApp",require('./routes/clientApp'))
module.exports = api