import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryTable from './components/InventoryTable';
import AddItemForm from './components/AddItemForm';
import './App.css';

const API_URL = 'http://localhost:5000/api/inventory';

function App() {
  const [inventory, setInventory] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Track the sort order ('asc' or 'desc')

  // Fetch items from the server
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

  // Sort inventory based on quantity
  const sortInventoryByQuantity = () => {
    const sorted = [...inventory].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.quantity - b.quantity;
      } else {
        return b.quantity - a.quantity;
      }
    });

    setInventory(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  return (
    <div className="app">
      <h1>Inventory Management</h1>
      <AddItemForm onAddItem={addItem} />

      <div className="controls">
        <button onClick={sortInventoryByQuantity}>
          Sort by Quantity ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      <InventoryTable
        inventory={inventory}
        onUpdateItem={updateItem}
        onDeleteItem={deleteItem}
      />
    </div>
  );
}

export default App;
