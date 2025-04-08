import express from 'express';
import {
  getAllFoundItems,
  createFoundItem,
  updateFoundItem,
  deleteFoundItem,
} from '../controllers/foundItemController';
import { validateFoundItem } from '../validations/foundItemValidation';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: FoundItems
 *   description: Endpoints for managing found items
 */

/**
 * @swagger
 * /api/v1/found-items:
 *   get:
 *     summary: Get all found items
 *     tags: [FoundItems]
 *     responses:
 *       200:
 *         description: A list of found items
 */
router.get('/', getAllFoundItems);

/**
 * @swagger
 * /api/v1/found-items:
 *   post:
 *     summary: Report a found item
 *     tags: [FoundItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, category, location, description, dateFound]
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               dateFound:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Found item created
 */
router.post('/', validateFoundItem, createFoundItem);

/**
 * @swagger
 * /api/v1/found-items/{id}:
 *   put:
 *     summary: Update a found item by ID
 *     tags: [FoundItems]
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
 *               dateFound:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Found item updated
 */
router.put('/:id', validateFoundItem, updateFoundItem);

/**
 * @swagger
 * /api/v1/found-items/{id}:
 *   delete:
 *     summary: Delete a found item by ID
 *     tags: [FoundItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Found item deleted
 */
router.delete('/:id', deleteFoundItem);

export default router;
