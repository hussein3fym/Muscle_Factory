import React from "react";
import "./Food.css";

const Food = () => {
  return (
    <div className="food">
      <h1>Know what you eat </h1>
      <p>
        we tell you about the kcal (calories), protein, carbs, fats and more in
        your food
      </p>
      <div class="food-search-container">
        <div class="food-search">
          <label>
            <input
              type="text"
              placeholder="Search for certain type of food or meal"
            />
            <button type="submit">Search</button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Food;
