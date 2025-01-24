import ExerciseList from './exerciseList.Class.js';
import ExerciseRequest from './exerciseRequest.Class.js';

const exerciseContainer = document.querySelector('.exercise-container');
let exerciseList = new ExerciseList();

const fetchAndRenderFilteredExercises = async (exerciseRequest) => {
  try {
    exerciseList = await ExerciseList.fetchWithFilters(exerciseRequest);
    const list = exerciseList.render(true,false);
    exerciseContainer.innerHTML = ''; // Clear existing exercises
    exerciseContainer.appendChild(list);
  } catch (error) {
    console.error( error);
  }
};

export function ShowExercisesByCategory(filterType,FilterValue) {
  const exerciseRequest = new ExerciseRequest({ page: 1, limit: 10 });
  exerciseRequest.addFilter(filterType, FilterValue);
  fetchAndRenderFilteredExercises(exerciseRequest);
  exerciseContainer.classList.remove('hidden');
}

export function HideExercises() {
  exerciseContainer.innerHTML = '';
  exerciseContainer.classList.add('hidden');
}
