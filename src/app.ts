import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import lostItemRoutes from './api/v1/routes/lostItemRoutes';
import foundItemRoutes from './api/v1/routes/foundItemRoutes';
import claimRoutes from './api/v1/routes/claimRoutes';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger docs
setupSwagger(app);

// Base health check route
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Lost & Found API is running!',
    version: 'v1',
  });
});

// API Routes
app.use('/api/v1/lost-items', lostItemRoutes);
app.use('/api/v1/found-items', foundItemRoutes);
app.use('/api/v1/claims', claimRoutes);

export default app;
