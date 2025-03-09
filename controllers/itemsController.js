import Item from "../models/DbItem.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.findAll(); 
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении данных" });
  }
};

export const createItem = async (req, res) => {
  const { title } = req.body;
  try {
    const newItem = await Item.create({ title }); 
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при создании элемента" });
  }
};

export const updateItemStatus = async (req, res) => {
  const { itemId } = req.params;
  const { status } = req.body;

  try {
    const item = await Item.findByPk(itemId); 
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.status = status;
    await item.save(); 
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении статуса" });
  }
};

export const deleteItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const deleted = await Item.destroy({ where: { id: itemId } }); 
    if (!deleted) return res.status(404).json({ error: "Item not found" });

    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении элемента" });
  }
};
