import items from '../data/items.js';
import { itemSchema, statusSchema } from '../validators/itemValidator.js';


export const getItems = (req, res) => {
  res.json(items);
};


export const createItem = (req, res) => {
  const { error, value } = itemSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const newItem = { id: items.length + 1, title: value.title, status: 'new' };
  items.push(newItem);
  res.status(201).json(newItem);
};


export const updateItemStatus = (req, res) => {
  const { itemId } = req.params;
  const { error, value } = statusSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const item = items.find(i => i.id === parseInt(itemId));
  if (!item) return res.status(404).json({ error: 'Item not found' });

  item.status = value.status;
  res.json(item);
};


export const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const index = items.findIndex(i => i.id === parseInt(itemId));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  const deletedItem = items.splice(index, 1);
  res.json(deletedItem[0]);
};
