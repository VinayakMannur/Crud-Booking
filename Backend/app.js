const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/routes');

const app = express();

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(userRoutes);


app.listen(8000)