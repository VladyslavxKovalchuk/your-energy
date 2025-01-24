import Exercise from './exercise.Class';

const closebtn = document.querySelector('.const modal-card-close-button');
const modalpage = document.querySelector('.modal-page');
if (closebtn){
  closebtn.addEventListener('click', () => {
    if (modalpage){
        modalpage.classList.add('hidden');
        modalpage.innerHTML = '';
    }
  });
}


if (modalpage) {
  const modalExercises = await Exercise.fetchById('64f389465ae26083f39b17df');
  modalpage.append(modalExercises.renderCard());
}
