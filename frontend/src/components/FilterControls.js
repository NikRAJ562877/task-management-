import React from "react";

const FilterControls = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div style={styles.container}>
      <label htmlFor="categoryFilter" style={styles.label}>
        Filter by Category:
      </label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={styles.select}
      >
        <option value="">All</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
  },
  label: {
    marginRight: "8px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  select: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
};

export default FilterControls;
