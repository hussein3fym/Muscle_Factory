import React, { useState, useEffect } from "react";
import { fetchCaloriesData } from "./../../../../Utils/fetchData";
import "./Food.css";
import "./Food.css";

const Food = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [servingQuantity, setServingQuantity] = useState(1);
  const [servingWeight, setServingWeight] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(true);
  const [adjustedFoodDetails, setAdjustedFoodDetails] = useState(null);

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedFood) {
      updateServingWeight(servingQuantity);
    }
  }, [servingQuantity, selectedFood]);

  const fetchSuggestions = async () => {
    try {
      const data = await fetchCaloriesData("search/instant", {
        method: "POST",
        data: { query: searchQuery, common: true, branded: true },
      });
      const common = data.common.slice(0, 3); // Limit to 3 common suggestions
      const branded = data.branded.slice(0, 3); // Limit to 3 branded suggestions
      setSuggestions([...common, ...branded]);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      alert("Input can't be empty");
      return;
    }

    try {
      const data = await fetchCaloriesData("natural/nutrients", {
        method: "POST",
        data: { query: searchQuery },
      });
      setSearchResults(data.foods);
      setSelectedFood(data.foods[0]);
      setServingQuantity(data.foods[0].serving_qty);
      setServingWeight(data.foods[0].serving_weight_grams);
      setIsSearchActive(false); // Hide search div and show results div
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.food_name || suggestion.brand_name_item_name);
    setSuggestions([]);
  };

  const handleServingQuantityChange = (event) => {
    const newQuantity = parseFloat(event.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setServingQuantity(newQuantity);
    }
  };

  const updateServingWeight = (quantity) => {
    if (selectedFood) {
      const weightPerServing =
        selectedFood.serving_weight_grams / selectedFood.serving_qty;
      setServingWeight(weightPerServing * quantity);
    }
  };
  const updateFoodDetails = (newQuantity) => {
    if (selectedFood) {
      const ratio = newQuantity / selectedFood.serving_qty;
      const adjustedDetails = {
        ...selectedFood,
        serving_qty: newQuantity,
        nf_calories: selectedFood.nf_calories * ratio,
        nf_total_fat: selectedFood.nf_total_fat * ratio,
        nf_saturated_fat: selectedFood.nf_saturated_fat * ratio,
        nf_cholesterol: selectedFood.nf_cholesterol * ratio,
        nf_sodium: selectedFood.nf_sodium * ratio,
        nf_total_carbohydrate: selectedFood.nf_total_carbohydrate * ratio,
        nf_sugars: selectedFood.nf_sugars * ratio,
        nf_protein: selectedFood.nf_protein * ratio,
        serving_weight_grams: selectedFood.serving_weight_grams * ratio,
      };
      setAdjustedFoodDetails(adjustedDetails);
    }
  };
  const handleBackToSearch = () => {
    setIsSearchActive(true);
    setSearchResults([]);
    setSelectedFood(null);
  };

  return (
    <div className="food">
      <h1>Know what you eat</h1>
      <p>
        We tell you about the kcal (calories), protein, carbs, fats and more in
        your food.
      </p>
      {isSearchActive ? (
        <div className="food-search-container">
          <div className="food-search">
            <label>
              <input
                type="text"
                placeholder="Search for certain type of food or meal"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <button type="button" onClick={handleSearch}>
                Search
              </button>
            </label>
            <div className="suggestions">
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <img
                        src={suggestion.photo.thumb || suggestion.photo}
                        alt={
                          suggestion.food_name ||
                          suggestion.brand_name_item_name
                        }
                        className="suggestion-image"
                      />
                      <h3>
                        {suggestion.food_name ||
                          suggestion.brand_name_item_name}
                      </h3>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="food-search-results">
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>
                  <img
                    src={selectedFood.photo.thumb}
                    alt={selectedFood.food_name}
                  />
                  <div>
                    <h2>{result.food_name}</h2>
                    <h3>Calories: {result.nf_calories}</h3>
                    <h3>Total Fat: {result.nf_total_fat}</h3>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {selectedFood && (
        <div className="food-details-container">
          <h2>Nutrient Details for {selectedFood.food_name}</h2>
          <div className="food-details">
            <p>
              Serving Quantity:
              <input
                type="number"
                value={servingQuantity}
                onChange={handleServingQuantityChange}
              />
            </p>
            <p>Serving Unit: {selectedFood.serving_unit}</p>
            <p>Serving Weight: {servingWeight} gm</p>
            <p>Calories: {selectedFood.nf_calories}</p>
            <p>Saturated Fat: {selectedFood.nf_saturated_fat}</p>
            <p>Protein: {selectedFood.nf_protein}</p>
            <p>Cholesterol: {selectedFood.nf_cholesterol}</p>
            <p>Carbohydrate: {selectedFood.nf_total_carbohydrate}</p>
            <p>Sodium: {selectedFood.nf_sodium}</p>
            <p>Total Fat: {selectedFood.nf_total_fat}</p>
            <p>Sugar: {selectedFood.nf_sugars}</p>
          </div>
        </div>
      )}
      <button onClick={handleBackToSearch}>Back to Search</button>
    </div>
  );
};

export default Food;
