import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

// import routes from './routes';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
// app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Lost & Found API running on port ${PORT}`);
});
