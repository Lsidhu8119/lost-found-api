import express from 'express';
import { getAllLostItems, createLostItem, updateLostItem, deleteLostItem } from '../controllers/lostItemController';
import { validateLostItem } from '../validations/lostItemValidation';

const router = express.Router();

router.get('/', getAllLostItems);
router.post('/', validateLostItem, createLostItem);
router.put('/:id', validateLostItem, updateLostItem);
router.delete('/:id', deleteLostItem);

export default router;
