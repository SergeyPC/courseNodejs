import express from 'express';
import { getItems, createItem, updateItemStatus, deleteItem } from '../controllers/itemsController.js';
import { validate } from '../middlewares/validate.js';
import { itemSchema, statusSchema } from '../validators/itemValidator.js';

const router = express.Router();

router.get('/', (req, res) => {
    getItems(req, res);
  });

router.post('/', validate(itemSchema), createItem);
router.put('/:itemId', validate(statusSchema), updateItemStatus);
router.delete('/:itemId', deleteItem);

export default router;