import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dbConnection from './config/dbConnection';
import locationRouter from './route/location';

mongoose.connect(dbConnection, {useNewUrlParser: true});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1/location', locationRouter);
app.get('/', (req, res) => {
  return res.send('Server started.');
});

const port = process.env.NODE_ENV || 3000;

app.listen(port, () => {
  console.log('Server started on port', port);
});

export default app;
