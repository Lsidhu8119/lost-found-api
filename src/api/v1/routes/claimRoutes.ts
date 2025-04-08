import express from 'express';
import {
  getAllClaims,
  createClaim,
  updateClaim,
  deleteClaim,
} from '../controllers/claimController';
import { validateClaim } from '../validations/claimValidation';

const router = express.Router();

router.get('/', getAllClaims);
router.post('/', validateClaim, createClaim);
router.put('/:id', validateClaim, updateClaim);
router.delete('/:id', deleteClaim);

export default router;
