import express from 'express';

import { router } from './routes/index';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to the API test' }));

app.use(router);

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
