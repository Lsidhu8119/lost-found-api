import express from 'express';
import {
  getAllFoundItems,
  createFoundItem,
  updateFoundItem,
  deleteFoundItem,
} from '../controllers/foundItemController';
import { validateFoundItem } from '../validations/foundItemValidation';

const router = express.Router();

router.get('/', getAllFoundItems);
router.post('/', validateFoundItem, createFoundItem);
router.put('/:id', validateFoundItem, updateFoundItem);
router.delete('/:id', deleteFoundItem);

export default router;
