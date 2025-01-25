import ExerciseList from './exerciseList.Class.js';
import ExerciseRequest from './exerciseRequest.Class.js';
import { showLoader, hideLoader } from './loader.js';

const exerciseContainer = document.querySelector('.exercise-container');
let exerciseList = new ExerciseList();

const fetchAndRenderFilteredExercises = async exerciseRequest => {
  try {
    showLoader();
    exerciseList = await ExerciseList.fetchWithFilters(exerciseRequest);
    const list = exerciseList.render(true, false);
    exerciseContainer.innerHTML = ''; // Clear existing exercises
    exerciseContainer.appendChild(list);
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
};

export function ShowExercisesByCategory(filterType, FilterValue, keyword=null) {
  const exerciseRequest = new ExerciseRequest({ page: 1, limit: 10 });
  if (keyword) {
    exerciseRequest.addKeyword(keyword)
  }
  exerciseRequest.addFilter(filterType, FilterValue);
  fetchAndRenderFilteredExercises(exerciseRequest);
  exerciseContainer.classList.remove('hidden');
}

export function HideExercises() {
  exerciseContainer.innerHTML = '';
  exerciseContainer.classList.add('hidden');
}
