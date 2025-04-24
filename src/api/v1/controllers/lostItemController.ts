import { Request, Response } from 'express';
import * as service from '../services/lostItemService';

export const getAllLostItems = async (_req: Request, res: Response) => {
  const items = await service.getAll();
  res.json(items);
};

export const createLostItem = async (req: Request, res: Response) => {
  const item = await service.create(req.body);
  res.status(201).json({
    message: 'Lost item reported successfully',
    item,
  });
};

export const updateLostItem = async (req: Request, res: Response) => {
  const item = await service.update(req.params.id, req.body);
  if (item) {
    res.status(200).json({
      message: 'Lost item updated successfully',
    });
  } else {
    res.status(404).json({ message: 'Lost item not found with the given ID' });
  }
};

export const deleteLostItem = async (req: Request, res: Response) => {
  const success = await service.remove(req.params.id);
  if (success) {
    res.status(200).json({ message: 'Lost item deleted successfully' });
  } else {
    res.status(404).json({ message: 'Lost item not found with the given ID' });
  }
};
