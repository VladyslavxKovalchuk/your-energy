import Exercise from "./exercise.Class";

const modalpage= document.querySelector('.modal-page');

if (modalpage) 
{
    Exercise.fetchById("64f389465ae26083f39b17df").then((exercise) => {  modalpage.append(exercise.renderCard()); });
}
    