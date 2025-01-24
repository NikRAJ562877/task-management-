import React from 'react';

function InventoryTable({ inventory, onUpdateItem, onDeleteItem }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map(item => (
          <tr key={item.id} className={item.quantity < 10 ? 'low-stock' : ''}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.quantity}</td>
            <td>
              <button onClick={() => onUpdateItem(item.id, { quantity: item.quantity + 1 })}>+1</button>
              <button onClick={() => onUpdateItem(item.id, { quantity: item.quantity - 1 })}>-1</button>
              <button onClick={() => onDeleteItem(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;
