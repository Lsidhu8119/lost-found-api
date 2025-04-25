import express from 'express';
import {
  getAllLostItems,
  createLostItem,
  updateLostItem,
  deleteLostItem,
} from '../controllers/lostItemController';
import { validateLostItem } from '../validations/lostItemValidation';
import { verifyToken, checkAdmin } from '../middleware/authMiddleware';

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                   location:
 *                     type: string
 *                   description:
 *                     type: string
 *                   dateReported:
 *                     type: string
 *                     format: date
 *                   reportedBy:
 *                     type: string
 *
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
 *             required: [name, category, location, description, dateReported, reportedBy]
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
 *               reportedBy:
 *                 type: string
 *           example:
 *             name: "Black Leather jacket"
 *             category: "clothing"
 *             location: "Elgin Building main floor"
 *             description: "Black leather jacket with spikes on Soulders"
 *             dateReported: "2025-04-10"
 *             reportedBy: "Lovedeep Sidhu"
 *     responses:
 *       201:
 *         description: Lost item reported successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Lost item reported successfully"
 */
router.post('/', verifyToken, validateLostItem, createLostItem);

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
 *         description: ID of the lost item to update
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
 *               reportedBy:
 *                 type: string
 *           example:
 *             name: "iPhone 12"
 *             category: "electronics"
 *             location: "Main Hall"
 *             description: "Lost when playing cards with others"
 *             dateReported: "2025-04-11"
 *             reportedBy: "Amandeep Singh"
 *     responses:
 *       200:
 *         description: Lost item updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Lost item updated successfully"
 *       404:
 *         description: Lost item not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Lost item not found with the given ID"
 */
router.put('/:id', verifyToken, validateLostItem, updateLostItem);

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
 *         description: ID of the lost item to delete
 *     responses:
 *       200:
 *         description: Lost item deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Lost item deleted successfully"
 *       404:
 *         description: Lost item not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Lost item not found with the given ID"
 */
router.delete('/:id',verifyToken, checkAdmin, deleteLostItem);

export default router;
