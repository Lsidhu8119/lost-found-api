import express from 'express';
import {
  getAllLostItems,
  createLostItem,
  updateLostItem,
  deleteLostItem,
} from '../controllers/lostItemController';
import { validateLostItem } from '../validations/lostItemValidation';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: LostItems
 *   description: Endpoints for managing lost items
 */

/**
 * @swagger
 * /api/v1/lost-items:
 *   get:
 *     summary: Get all lost items
 *     tags: [LostItems]
 *     responses:
 *       200:
 *         description: A list of lost items
 */
router.get('/', getAllLostItems);

/**
 * @swagger
 * /api/v1/lost-items:
 *   post:
 *     summary: Report a new lost item
 *     tags: [LostItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, category, location, description, dateReported]
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               dateReported:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Lost item created
 */
router.post('/', validateLostItem, createLostItem);

/**
 * @swagger
 * /api/v1/lost-items/{id}:
 *   put:
 *     summary: Update a lost item by ID
 *     tags: [LostItems]
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
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               dateReported:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Lost item updated
 */
router.put('/:id', validateLostItem, updateLostItem);

/**
 * @swagger
 * /api/v1/lost-items/{id}:
 *   delete:
 *     summary: Delete a lost item by ID
 *     tags: [LostItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lost item deleted
 */
router.delete('/:id', deleteLostItem);

export default router;
