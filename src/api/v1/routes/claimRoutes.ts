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
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 itemId: "abc123"
 *                 claimantName: "Subhpreet"
 *                 claimantEmail: "Subhpreet@gmail.com"
 *                 justification: "I can identify the Asus Laptop with black logo and my favourite sticker"
 *                 dateClaimed: "2025-04-10"
 *               - id: "2"
 *                 itemId: "abc999"
 *                 claimantName: "Amandeep Singh"
 *                 claimantEmail: "amandeepSingh@gmail.com"
 *                 justification: "I can identify my black iPhone 12 with a cracked back and a red cover"
 *                 dateClaimed: "2025-04-11"
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
 *           example:
 *             itemId: "999"
 *             claimantName: Sukhtab Warya
 *             claimantEmail: Sukhtabwarya@gmail.com
 *             justification: I can identify my laptop was broken from left side
 *             dateClaimed: 2025-04-08
 *     responses:
 *       201:
 *         description: Claim submitted successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "2"
 *               itemId: "999"
 *               claimantName: Sukhtab Warya
 *               claimantEmail: Sukhtabwarya@gmail.com
 *               justification: I can identify my laptop was broken from left side
 *               dateClaimed: 2025-04-08
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
 *         description: ID of the claim to update
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
 *           example:
 *             itemId: "abc123"
 *             claimantName: Subhpreet
 *             claimantEmail: Subhpreet@gmail.com
 *             justification: My laptop was not only broken from left side but also had a keyboard cover
 *             dateClaimed: 2025-04-11
 *     responses:
 *       200:
 *         description: Claim updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Claim updated sucessfully
 *       404:
 *         description: Claim not found
 *         content:
 *           application/json:
 *             example:
 *               message: Claim not found with the given ID
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
 *         description: ID of the claim to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Claim deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Claim deleted successfully
 *       404:
 *         description: Claim not found
 *         content:
 *           application/json:
 *             example:
 *               message: Claim not found with the given ID
 */
router.delete('/:id', deleteClaim);

export default router;
