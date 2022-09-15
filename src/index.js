require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'sql6518741',
    'sql6518741',
    'ywcQHCnsIL',
    {
        host: 'sql6.freesqldatabase.com',
        dialect: 'mysql'
    }
)

const router = require('./routes/router');
const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

// SEQUIELIZE --> cek koneksi database
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

// app.use('/', router);
app.use('/user', userRoutes);

app.listen(process.env.SERVER_PORT, () => {console.log('Server Running on 8080')});
