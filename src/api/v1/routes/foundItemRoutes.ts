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
 *                   dateFound:
 *                     type: string
 *                     format: date
 *                   foundBy:
 *                     type: string
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
 *           example:
 *             name: "Lakers Cap"
 *             category: "clothing"
 *             location: "Princess building 3rd Floor"
 *             description: "Black Cap with lakers Logo in front"
 *             dateFound: "2025-04-10"
 *             foundBy: "Lovedeep Sidhu"
 *     responses:
 *       201:
 *         description: Found item reported successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Found item reported successfully"
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
 *         description: ID of the found item to update
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
 *           example:
 *             name: "iPhone 12"
 *             category: "electronics"
 *             location: "Main Hall"
 *             description: "Updated - iPhone 12 cracked from back, found near Student Association"
 *             dateFound: "2025-04-11"
 *             foundBy: Akashdeep Singh
 *     responses:
 *       200:
 *         description: Found item updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Found item updated successfully"
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Found item not found with the given ID"
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
 *         description: ID of the found item to delete
 *     responses:
 *       200:
 *         description: Found item deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Found item deleted successfully"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Found item not found with the given ID"
 */
router.delete('/:id', deleteFoundItem);

export default router;
