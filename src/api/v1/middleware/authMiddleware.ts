import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
      return;
    }
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export const checkAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }
  try {
    const user = (req as any).user;
    if (user?.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  } catch (error) {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};
