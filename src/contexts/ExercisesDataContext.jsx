import { createContext, useContext, useState, useEffect } from "react";
import { fetchData, exerciseOptions } from "../utils/fetchData";
import debounce from "lodash/debounce"; // Import lodash debounce

const ExercisesContext = createContext();

export const ExercisesDataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  const [exercises, setExercises] = useState([]);
  const [searchedExercises, setSearchedExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 10;

  // Implement debounced function to limit API requests
  const getAllExercisesDebounced = debounce(async () => {
    const exercisesData = await fetchData(
      "https://exercisedb.p.rapidapi.com/exercises",
      exerciseOptions
    );
    setExercises(exercisesData);
    setSearchedExercises(exercisesData);
  }, 1000); // Adjust the delay (in milliseconds) as needed

  useEffect(() => {
    const getBodyParts = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      setBodyParts(["all", ...bodyPartsData]);
    };

    getBodyParts();
  }, []);

  useEffect(() => {
    const getExercisesByBodyParts = () => {
      setSearchedExercises(exercises);

      if (bodyPart === "all") {
        setSearchedExercises(exercises);
        return;
      }

      if (searchedExercises.length === 0) return;

      const exercisesDataByBodyParts = exercises.filter(
        (exercise) => exercise.bodyPart.toLowerCase() === bodyPart
      );
      setSearchedExercises(exercisesDataByBodyParts);
    };

    getExercisesByBodyParts();
  }, [bodyPart]);

  // Call the debounced function when needed
  useEffect(() => {
    getAllExercisesDebounced();
  }, [search]); // Call when the search query changes

  return (
    <ExercisesContext.Provider
      value={{
        search,
        setSearch,
        bodyParts,
        setBodyParts,
        bodyPart,
        setBodyPart,
        exercises,
        searchedExercises,
        setSearchedExercises,
        currentPage,
        setCurrentPage,
        exercisesPerPage,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export function useExercisesData() {
  return useContext(ExercisesContext);
}
