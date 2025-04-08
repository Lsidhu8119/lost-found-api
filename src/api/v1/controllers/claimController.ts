import { Request, Response } from 'express';
import * as service from '../services/claimService';

export const getAllClaims = (_req: Request, res: Response) => {
  res.json(service.getAll());
};

export const createClaim = (req: Request, res: Response) => {
  const claim = service.create(req.body);
  res.status(201).json(claim);
};

export const updateClaim = (req: Request, res: Response) => {
  const claim = service.update(req.params.id, req.body);
  if (claim) res.json(claim);
  else res.status(404).json({ message: 'Claim not found' });
};

export const deleteClaim = (req: Request, res: Response) => {
  const success = service.remove(req.params.id);
  if (success) res.json({ message: 'Deleted' });
  else res.status(404).json({ message: 'Claim not found' });
};
