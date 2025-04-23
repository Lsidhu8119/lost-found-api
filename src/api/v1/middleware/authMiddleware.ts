import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).user = decodedToken;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
