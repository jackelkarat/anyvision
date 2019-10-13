const express = require('express');
const cors = require('cors');
const pg = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const connectionString = process.env.DATABASE_URL;


const linkRouter = require('./routes/links');
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
app.use('/links', linkRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
