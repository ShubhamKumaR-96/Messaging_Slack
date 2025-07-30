import express from 'express';
import {StatusCodes} from 'http-status-codes'

import { PORT } from './config/serverConfig.js';
import { connectDB } from './config/dbConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: 'pong'
  });
});

app.listen(PORT, async() => {
  console.log(`Server running at http://localhost:${PORT}`);
  await connectDB()
});
