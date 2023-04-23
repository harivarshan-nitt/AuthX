const api = require('express').Router();

api.use("/clientApp",require('../routes/clientApp'))
api.use("/employee", require("../routes/employee"))
module.exports = api