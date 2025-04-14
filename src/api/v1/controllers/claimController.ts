import { Request, Response } from 'express';
import * as service from '../services/claimService';

export const getAllClaims = (_req: Request, res: Response) => {
  res.json(service.getAll());
};

export const createClaim = (req: Request, res: Response) => {
  service.create(req.body);
  res.status(201).json({ message: 'Claim submitted successfully' });
};

export const updateClaim = (req: Request, res: Response) => {
  const updated = service.update(req.params.id, req.body);
  if (updated) {
    res.status(200).json({ message: 'Claim updated successfully' });
  } else {
    res.status(404).json({ message: 'Claim not found with the given ID' });
  }
};

export const deleteClaim = (req: Request, res: Response) => {
  const success = service.remove(req.params.id);
  if (success) {
    res.status(200).json({ message: 'Claim deleted successfully' });
  } else {
    res.status(404).json({ message: 'Claim not found' });
  }
};
