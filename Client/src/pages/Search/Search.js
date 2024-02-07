import React, { useState } from "react";
import axios from "axios";
import { exerciseOptions } from "./../../Utils/fetchData";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // Prevents the form from submitting and reloading the page
    if (search) {
      try {
        const exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          exerciseOptions
        );
        console.log(exercisesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url, exerciseOptions);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
