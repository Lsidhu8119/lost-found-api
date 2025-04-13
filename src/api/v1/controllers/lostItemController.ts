import { Request, Response } from 'express';
import * as service from '../services/lostItemService';

export const getAllLostItems = (_req: Request, res: Response) => {
  res.json(service.getAll());
};

export const createLostItem = (req: Request, res: Response) => {
  service.create(req.body);
  res.status(201).json({
    message: 'Lost item reported successfully',
  });
};

export const updateLostItem = (req: Request, res: Response) => {
  const item = service.update(req.params.id, req.body);
  if (item) {
    res.status(200).json({
      message: 'Lost item updated successfully',
    });
  } else {
    res.status(404).json({ message: 'Lost item not found with the given ID' });
  }
};

export const deleteLostItem = (req: Request, res: Response) => {
  const success = service.remove(req.params.id);
  if (success) {
    res.status(200).json({ message: 'Lost item deleted successfully' });
  } else {
    res.status(404).json({ message: 'Lost item not found with the given ID' });
  }
};
