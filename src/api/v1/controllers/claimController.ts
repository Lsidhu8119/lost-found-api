import { Request, Response } from 'express';
import * as service from '../services/claimService';

export const getAllClaims = async (_req: Request, res: Response) => {
  const claims = await service.getAll();
  res.json(claims);
};

export const createClaim = async (req: Request, res: Response) => {
  const claim = await service.create(req.body);
  res.status(201).json({ message: 'Claim submitted successfully', claim });
};

export const updateClaim = async (req: Request, res: Response) => {
  const updated = await service.update(req.params.id, req.body);
  if (updated) {
    res.status(200).json({ message: 'Claim updated successfully' });
  } else {
    res.status(404).json({ message: 'Claim not found with the given ID' });
  }
};

export const deleteClaim = async (req: Request, res: Response) => {
  const success = await service.remove(req.params.id);
  if (success) {
    res.status(200).json({ message: 'Claim deleted successfully' });
  } else {
    res.status(404).json({ message: 'Claim not found' });
  }
};
