import { useExercisesData } from "../contexts/ExercisesDataContext";
import CardLoader from "./CardLoader";
import ExerciseCard from "./ExerciseCard";
import Pagination from "./Pagination";

const Exercises = () => {
  const { searchedExercises, currentPage, exercisesPerPage, apiError } =
    useExercisesData();

  // Check if searchedExercises is an array and perform operations accordingly
  const isExercisesArray = Array.isArray(searchedExercises);
  const currentExercises = isExercisesArray
    ? searchedExercises.slice(
        currentPage * exercisesPerPage - exercisesPerPage,
        currentPage * exercisesPerPage
      )
    : [];

  return (
    <div className="mt-12 p-5 lg:mt-28">
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-20 dark:text-gray-200">
        Showing Results
      </h3>

      <div className="flex flex-row flex-wrap justify-center gap-12 container mx-auto max-w-screen-xl">
        {isExercisesArray && searchedExercises.length ? (
          currentExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))
        ) : apiError ? (
          <p className="text-center">API quota has been exceeded.</p>
        ) : (
          <CardLoader quantity={3} />
        )}
      </div>

      <div className="pagination mt-24 flex items-center">
        {isExercisesArray && searchedExercises.length > 10 && <Pagination />}
      </div>
    </div>
  );
};

export default Exercises;
