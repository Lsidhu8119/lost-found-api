import express from 'express';
import {
  getAllClaims,
  createClaim,
  updateClaim,
  deleteClaim,
} from '../controllers/claimController';
import { validateClaim } from '../validations/claimValidation';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Claims
 *   description: Endpoints for item claims
 */

/**
 * @swagger
 * /api/v1/claims:
 *   get:
 *     summary: Get all claims
 *     tags: [Claims]
 *     responses:
 *       200:
 *         description: List of all submitted claims
 */
router.get('/', getAllClaims);

/**
 * @swagger
 * /api/v1/claims:
 *   post:
 *     summary: Submit a new claim
 *     tags: [Claims]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [itemId, claimantName, claimantEmail, justification, dateClaimed]
 *             properties:
 *               itemId:
 *                 type: string
 *               claimantName:
 *                 type: string
 *               claimantEmail:
 *                 type: string
 *               justification:
 *                 type: string
 *               dateClaimed:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Claim submitted
 */
router.post('/', validateClaim, createClaim);

/**
 * @swagger
 * /api/v1/claims/{id}:
 *   put:
 *     summary: Update a claim
 *     tags: [Claims]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               claimantName:
 *                 type: string
 *               claimantEmail:
 *                 type: string
 *               justification:
 *                 type: string
 *               dateClaimed:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Claim updated
 */
router.put('/:id', validateClaim, updateClaim);

/**
 * @swagger
 * /api/v1/claims/{id}:
 *   delete:
 *     summary: Delete a claim
 *     tags: [Claims]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Claim deleted
 */
router.delete('/:id', deleteClaim);

export default router;
