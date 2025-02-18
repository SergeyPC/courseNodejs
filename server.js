import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

let items = [];
let idCounter = 1;

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const newItem = { id: idCounter++, title, status: 'new' };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:itemId', (req, res) => {
  const { itemId } = req.params;
  const { status } = req.body;
  const item = items.find(i => i.id === parseInt(itemId));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  if (!['new', 'done'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
  item.status = status;
  res.json(item);
});

app.delete('/items/:itemId', (req, res) => {
  const { itemId } = req.params;
  const index = items.findIndex(i => i.id === parseInt(itemId));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  const deletedItem = items.splice(index, 1);
  res.json(deletedItem);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});