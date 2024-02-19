import React, { useEffect, useState } from "react";
import axios from "axios";
import { exerciseOptions } from "./../../Utils/fetchData";
import HorizontalScrollbar from "./../Scrollbar/HorizontalScrollbar";
const Search = ({ setExercise, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      setBodyParts(["all", ...bodyPartsData]);
    };
    fetchExercisesData();
  }, []);

  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // Prevents the form from submitting and reloading the page
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );
      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );
      setSearch("");
      setExercise(searchedExercises);
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
      <div>
        {bodyParts.map((bodyPart, index) => (
          <button key={index} onClick={() => setSearch(bodyPart.toLowerCase())}>
            {bodyPart}
          </button>
        ))}
      </div>
      <div>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </div>
    </div>
  );
};

export default Search;
