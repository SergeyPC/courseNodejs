import items from '../data/items.js';

export const getItems = (req, res) => {
  res.json(items);
};

export const createItem = (req, res) => {
  const { title } = req.body;
  const newItem = { id: items.length + 1, title, status: 'new' };
  items.push(newItem);
  res.status(201).json(newItem);
};

export const updateItemStatus = (req, res) => {
  const { itemId } = req.params;
  const { status } = req.body;

  const item = items.find(i => i.id === parseInt(itemId));
  if (!item) return res.status(404).json({ error: 'Item not found' });

  item.status = status;
  res.json(item);
};

export const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const index = items.findIndex(i => i.id === parseInt(itemId));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  const deletedItem = items.splice(index, 1);
  res.json(deletedItem[0]);
};
