import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
import { exerciseOptions, fetchData } from "../../Utils/fetchData";
import HorizontalScrollbar from "../Scrollbar/HorizontalScrollbar";
const Search = ({ setExercises, bodyPart, setBodyPart }) => {
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

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );

      const searchedExercises = exercisesData.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.target.toLowerCase().includes(search) ||
          item.equipment.toLowerCase().includes(search) ||
          item.bodyPart.toLowerCase().includes(search)
      );

      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });

      setSearch("");
      setExercises(searchedExercises);
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
    <div className="Search">
      <h2>Search for exercises</h2>
      <div className="SearchContainer">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </div>
      {/* <div>
        {bodyParts.map((bodyPart, index) => (
          <button key={index} onClick={handleSearch}>
            {bodyPart}
          </button>
        ))}
      </div> */}
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
