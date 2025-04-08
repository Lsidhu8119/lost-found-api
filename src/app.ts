import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base health check route
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Lost & Found API is running!',
    version: 'v1',
  });
});

export default app;
