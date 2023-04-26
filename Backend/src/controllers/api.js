const verifyJWT = require('../middlewares/verifyJWT');

const api = require('express').Router();

api.use("/clientApp", require('../routes/clientApp'))
api.use("/employee", require("../routes/employee"))
api.use("/user", verifyJWT, require('../routes/userData'))
module.exports = api