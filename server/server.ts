export {};
import { Request, Response } from 'express';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const farmsRouter = require('./routes/farmsRouter');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(helmet());
app.use('/farms', farmsRouter);

app.use((err: { stack: any }, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('500 Server Error!');
});

app.use((_req: Request, res: Response) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
