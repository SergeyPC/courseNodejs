import express from 'express';
import { getItems, createItem, updateItemStatus, deleteItem } from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.put('/:itemId', updateItemStatus);
router.delete('/:itemId', deleteItem);

export default router;
