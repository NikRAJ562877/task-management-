import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryTable from './components/InventoryTable';
import AddItemForm from './components/AddItemForm';
import FilterControls from './components/FilterControls'; // Import FilterControls
import './App.css';

const API_URL = 'http://localhost:5000/api/inventory';

function App() {
  const [inventory, setInventory] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState(''); // Track selected category

  const fetchInventory = async () => {
    try {
      const response = await axios.get(API_URL);
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const addItem = async (newItem) => {
    try {
      await axios.post(API_URL, newItem);
      fetchInventory();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      fetchInventory();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchInventory();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const sortInventoryByQuantity = () => {
    const sorted = [...inventory].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.quantity - b.quantity;
      } else {
        return b.quantity - a.quantity;
      }
    });

    setInventory(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredInventory = selectedCategory
    ? inventory.filter((item) => item.category === selectedCategory)
    : inventory;

  const categories = [...new Set(inventory.map((item) => item.category))];

  return (
    <div className="app">
      <h1>Inventory Management</h1>
      <AddItemForm onAddItem={addItem} />

      <FilterControls
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="controls">
        <button onClick={sortInventoryByQuantity}>
          Sort by Quantity ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      <InventoryTable
        inventory={filteredInventory}
        onUpdateItem={updateItem}
        onDeleteItem={deleteItem}
      />
    </div>
  );
}

export default App;
