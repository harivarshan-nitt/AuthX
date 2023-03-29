const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ src: ".env" })
require('./src/models/db');
app.get('/', (req, res) => {
    res.send('AuthX backend is up and running!!!');
});

app.use(cors());
app.use(express.json());

app.use('/api', require('./src/controllers/api'));
app.use('/auth', require('./src/controllers/auth'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})