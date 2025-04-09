import { Request, Response } from 'express';
import * as service from '../services/foundItemService';

export const getAllFoundItems = (_req: Request, res: Response) => {
  res.json(service.getAll());
};

export const createFoundItem = (req: Request, res: Response) => {
  const item = service.create(req.body);
  res.status(201).json({
    message: 'Found item reported successfully',
    item,
  });
};

export const updateFoundItem = (req: Request, res: Response) => {
  const item = service.update(req.params.id, req.body);
  if (item) {
    res.status(200).json({
      message: 'Found item updated successfully',
      item,
    });
  } else {
    res.status(404).json({ message: 'Found item not found with the given ID' });
  }
};

export const deleteFoundItem = (req: Request, res: Response) => {
  const success = service.remove(req.params.id);
  if (success) {
    res.status(200).json({ message: 'Found item deleted successfully' });
  } else {
    res.status(404).json({ message: 'Found item not found with the given ID' });
  }
};
