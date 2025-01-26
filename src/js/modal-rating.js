import sprite from '../img/sprite.svg';
import { submitRating } from './api.js';
import iziToast from 'izitoast';
import { addIdToLocalStorage, removeIdFromLocalStorage, isIdPresentInLocalStorage } from './localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  const modalPage = document.querySelector('.modal-page');

  document.addEventListener('click', event => {
    const favoriteButton = modalPage.querySelector('.favorite-button')
    if(favoriteButton) {
      if (event.target === favoriteButton 
        || favoriteButton.contains(event.target)) {
          const exerciseId = favoriteButton.getAttribute('data-exerciseid');
          if(exerciseId) {
            if (isIdPresentInLocalStorage(exerciseId)) {
              removeIdFromLocalStorage(exerciseId)
              favoriteButton.querySelector('span').textContent = 'Add to favorites'
              favoriteButton.querySelector('use').setAttribute('fill', 'none')
            } else {
              addIdToLocalStorage(exerciseId)
              favoriteButton.querySelector('span').textContent = 'Remove favorite'
              favoriteButton.querySelector('use').setAttribute('fill', 'black')
            }

          }
        }
      }

    if (!event.target.matches('.rating-button')) return;

    const exerciseid = event.target.dataset.exerciseid;
    const exerciseModal = document.querySelector('.exercise-modal-card');
    const card = createRatingModal()

    toggleModalVisibility(exerciseModal, false)
    modalPage.append(card);

    const stars = card.querySelectorAll('.rating-modal__stars span');
    const ratingValue = card.querySelector('.rating-modal__value');
    const hiddenRatingInput = card.querySelector('.rating-modal__hidden-rating');
    const form = card.querySelector('.rating-modal__form');

    let selectedRating = 0;

    stars.forEach((star) => {
      star.addEventListener('mouseenter', () => updateStars(stars, parseInt(star.dataset.value, 10)));
      star.addEventListener('mouseleave', () => updateStars(stars, selectedRating));
      star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value, 10);
        hiddenRatingInput.value = selectedRating;
        ratingValue.textContent = selectedRating.toFixed(1);
        updateStars(stars, selectedRating);
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const rate = parseInt(hiddenRatingInput.value);
      const email = form.querySelector('.rating-modal__email').value.trim();
      const comment = form.querySelector('.rating-modal__comment').value.trim();

      if (!rate || !email || !comment) {
        iziToast.error({ title: 'Помилка', message: 'Всі поля повинні бути заповнені' });
        return;
      }

      try {
        await submitRating(exerciseid, rate, email, comment);
        iziToast.success({ title: 'Успіх', message: 'Ви упсішно відправили рейтинг' });
        card.remove();
        exerciseModal.style.display = 'block';
      } catch (error) {
        iziToast.error({
          title: 'Помилка',
          message: error.response?.data?.message || 'Щось пішло не так',
        });
      }
    });
  });
});





function toggleModalVisibility(modal, isVisible) {
  modal.style.display = isVisible ? 'block' : 'none';
}

function updateStars(stars, value) {
  stars.forEach((star) => {
    const starValue = parseInt(star.dataset.value, 10);
    const svg = star.querySelector('svg use');
    svg.setAttribute('href', `${sprite}#${starValue <= value ? 'star-active' : 'star-inactive'}`);
  });
}

function createRatingModal() {
  const card = document.createElement('div');
  card.className = 'rating-modal-card';
  card.innerHTML = `
      <button type="button" class="modal-card-close-button">
        <svg width="24" height="24">
          <use href="${sprite}#close"></use>
        </svg>
      </button>
      <div class="rating-modal">
        <h2 class="rating-modal__title">Rating</h2>
        <form class="rating-modal__form">
          <div class="rating-modal__mark">
            <div class="rating-modal__value">0.0</div>
            <div class="rating-modal__stars">
              ${[1, 2, 3, 4, 5]
    .map(
      (value) => `
                  <span data-value="${value}">
                    <svg class="rating-modal__stars__item" width="18" height="18">
                      <use href="${sprite}#star-inactive"></use>
                    </svg>
                  </span>`
    )
    .join('')}
            </div>
          </div>
          <input type="hidden" name="rate" class="rating-modal__hidden-rating" value="0">
          <input type="email" class="rating-modal__email" placeholder="Email" required />
          <textarea class="rating-modal__comment" placeholder="Your comment" required></textarea>
          <button type="submit" class="rating-modal__submit-btn">Send</button>
        </form>
      </div>
    `;
  return card;
}