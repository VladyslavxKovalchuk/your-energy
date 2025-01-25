import Exercise from './exercise.js';

const getDynamicId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('exerciseId');
};

document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalPage = document.querySelector('.modal-page');
  const body = document.body;

  document.addEventListener('click', event => {
    if (event.target.closest('.exercise-start-btn')) {
      const dynamicId =
        event.target.closest('.exercise-start-btn').dataset.exerciseid ||
        getDynamicId();

      if (dynamicId) {
        Exercise.fetchById(dynamicId)
          .then(exercise => {
            modalPage.innerHTML = '';
            modalPage.append(exercise.renderCard());
            modalOverlay.classList.remove('hidden');
            modalPage.classList.remove('hidden');
            body.classList.add('no-scroll');
          })
          .catch(error => {
            console.error('Error fetching exercise:', error);
          });
      }
    }

    if (
      event.target.classList.contains('modal-overlay') ||
      event.target.closest('.modal-card-close-button')
    ) {
      modalOverlay.classList.add('hidden');
      modalPage.classList.add('hidden');
      modalPage.innerHTML = '';
      body.classList.remove('no-scroll');
    }
  });
});
