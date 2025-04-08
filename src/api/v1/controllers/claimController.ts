import { Request, Response } from 'express';
import * as service from '../services/claimService';

export const getAllClaims = (_req: Request, res: Response): void => {
  res.json(service.getAll());
};

export const createClaim = (req: Request, res: Response): void => {
  const claim = service.create(req.body);
  res.status(201).json(claim);
};

export const updateClaim = (req: Request, res: Response): void => {
  const updated = service.update(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ message: 'Claim not found' });
    return;
  }

  res.status(200).json({ message: `Claim updated Succesfully` });
};

export const deleteClaim = (req: Request, res: Response): void => {
  const existingClaim = service.getAll().find(c => c.id === req.params.id);

  if (!existingClaim) {
    res.status(404).json({ message: 'Claim not found' });
    return;
  }

  const success = service.remove(req.params.id);

  if (success) {
    res
      .status(200)
      .json({ message: `Claim deleted successfully` });
  } else {
    res.status(500).json({ message: 'Failed to delete claim' });
  }
};
