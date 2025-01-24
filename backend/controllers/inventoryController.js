let inventory = [
    { id: 1, name: 'Item A', category: 'Category 1', quantity: 15 },
    { id: 2, name: 'Item B', category: 'Category 2', quantity: 8 },
  ];
  
  let nextId = 3;
  
  // Get all items
  const getItems = (req, res) => {
    res.json(inventory);
  };
  
  // Add a new item
  const addItem = (req, res) => {
    const { name, category, quantity } = req.body;
    const newItem = { id: nextId++, name, category, quantity: parseInt(quantity, 10) };
    inventory.push(newItem);
    res.status(201).json(newItem);
  };
  
  // Update an item
  const updateItem = (req, res) => {
    const { id } = req.params;
    const { name, category, quantity } = req.body;
    const item = inventory.find(item => item.id === parseInt(id, 10));
    if (item) {
      item.name = name || item.name;
      item.category = category || item.category;
      item.quantity = quantity !== undefined ? parseInt(quantity, 10) : item.quantity;
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  };
  
  // Delete an item
  const deleteItem = (req, res) => {
    const { id } = req.params;
    inventory = inventory.filter(item => item.id !== parseInt(id, 10));
    res.status(204).end();
  };
  
  module.exports = { getItems, addItem, updateItem, deleteItem };
  