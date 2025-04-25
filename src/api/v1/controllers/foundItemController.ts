import { Request, Response } from 'express';
import * as service from '../services/foundItemService';

export const getAllFoundItems = async (_req: Request, res: Response) => {
  const items = await service.getAll();
  res.json(items);
};

export const createFoundItem = async (req: Request, res: Response) => {
  const item = await service.create(req.body);
  res.status(201).json({
    message: 'Found item reported successfully',
    item,
  });
};

export const updateFoundItem = async (req: Request, res: Response) => {
  const item = await service.update(req.params.id, req.body);
  if (item) {
    res.status(200).json({
      message: 'Found item updated successfully',
    });
  } else {
    res.status(404).json({ message: 'Found item not found with the given ID' });
  }
};

export const deleteFoundItem = async (req: Request, res: Response) => {
  const success = await service.remove(req.params.id);
  if (success) {
    res.status(200).json({ message: 'Found item deleted successfully' });
  } else {
    res.status(404).json({ message: 'Found item not found with the given ID' });
  }
};
