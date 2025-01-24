import Exercise from "./exercise.Class";

const modalpage= document.querySelector('.modal-page');

if (modalpage) 
{
    const modalExercises = await Exercise.fetchById("64f389465ae26083f39b17df");
    modalpage.append(modalExercises.renderCard());
}
    