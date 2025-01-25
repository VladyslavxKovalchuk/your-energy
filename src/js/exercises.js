import ExerciseList from './exercise.list.js';
import ExerciseRequest from './exercise.request.js';
import { showLoader, hideLoader } from './loader.js';
import { showPagination, hidePagination } from './pagination.js';
import { getExercisesOnPage } from './utils.js';

const exerciseContainer = document.querySelector('.exercise-container');
let exerciseList = new ExerciseList();

const fetchAndRenderFilteredExercises = async (exerciseRequest, queriedPage = 1) => {
  try {
    showLoader();
    exerciseRequest.page = queriedPage;
    exerciseList = await ExerciseList.fetchWithFilters(exerciseRequest);
    const list = exerciseList.render(true, false);
    exerciseContainer.innerHTML = ''; // Clear existing exercises
    exerciseContainer.appendChild(list);
    showPagination(
      '.pagination-container',
      exerciseList.page,
      exerciseList.totalPages,
      fetchAndRenderFilteredExercises,
      exerciseRequest,
      exerciseList.page
    );
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
};

export function ShowExercisesByCategory(filterType, FilterValue, keyword = null) {
  const exerciseRequest = new ExerciseRequest({ page: 1, limit: getExercisesOnPage() });
  if (keyword) {
    exerciseRequest.addKeyword(keyword);
  }
  exerciseRequest.addFilter(filterType, FilterValue);
  fetchAndRenderFilteredExercises(exerciseRequest);
  exerciseContainer.classList.add('active');
}

export function HideExercises() {
  exerciseContainer.innerHTML = '';
  if (exerciseContainer.classList.contains('active'))
    exerciseContainer.classList.remove('active');
  hidePagination('.pagination-container');
}