import { fetchExercises } from './api.js';
import Exercise from './exercise.js';

class ExerciseList {
  constructor() {
    this.exercises = [];
    this.page = 0;
    this.perPage = 10;
    this.totalPages = 0;
  }

  addExercise(exercise) {
    this.exercises.push(exercise);
  }

  static async fetchWithFilters(exerciseRequest) {
    const response = await fetchExercises(exerciseRequest.toParams());
    const data = response.data;
    const exerciseList = new ExerciseList();
    exerciseList.page = data.page;
    exerciseList.perPage = data.perPage;
    exerciseList.totalPages = data.totalPages;
    data.results.forEach(exerciseData => {
      const exercise = new Exercise(
        exerciseData._id,
        exerciseData.bodyPart,
        exerciseData.equipment,
        exerciseData.gifUrl,
        exerciseData.name,
        exerciseData.target,
        exerciseData.description,
        exerciseData.rating,
        exerciseData.burnedCalories,
        exerciseData.time,
        exerciseData.popularity
      );
      exerciseList.addExercise(exercise);
    });
    return exerciseList;
  }

  render(ratingVisible = true, trashVisible = false) {
    const list = document.createElement('div');
    list.className = 'exercise-list';

    this.exercises.forEach(exercise => {
      list.appendChild(exercise.render(ratingVisible,trashVisible));
    });
    return list;
  }
}

export default ExerciseList;
