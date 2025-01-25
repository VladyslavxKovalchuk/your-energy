import { fetchExerciseById } from './api.js';
import sprite from '../img/sprite.svg';
import noImage from '../img/no-image.jpg';
import { createRating } from './create-rating.js';
import { showLoader, hideLoader } from './loader.js';
import { isIdPresentInLocalStorage} from './localStorage.js'

class Exercise {
  constructor(
    id,
    bodyPart,
    equipment,
    gifUrl,
    name,
    target,
    description,
    rating,
    burnedCalories,
    time,
    popularity
  ) {
    this.id = id;
    this.bodyPart = bodyPart;
    this.equipment = equipment;
    this.gifUrl = gifUrl;
    this.name = name;
    this.target = target;
    this.description = description;
    this.rating = rating;
    this.burnedCalories = burnedCalories;
    this.time = time;
    this.popularity = popularity;
  }
  setRatingVisible(visible) {
    this.ratingVisible = visible;
  }
  setTrashVisible(visible) {
    this.trashVisible = visible;
  }

  static async fetchById(id) {
    try {
      showLoader();
      const response = await fetchExerciseById(id);
      const data = response.data;
      return new Exercise(
        data._id,
        data.bodyPart,
        data.equipment,
        data.gifUrl,
        data.name,
        data.target,
        data.description,
        data.rating,
        data.burnedCalories,
        data.time,
        data.popularity
      );
    } catch (error) {
      console.error('Error fetching exercise:', error);
      throw error;
    } finally {
      hideLoader();
    }
  }

  render(ratingVisible = true, trashVisible = false) {
    const card = document.createElement('div');
    card.className = 'exercise-card';

    card.innerHTML = `  
        <div class="exercise-header">
          <div class="badge">workout</div>
          <div class="rating ${!ratingVisible ? 'hidden' : ''}">
            ${this.formatRating()}
            <svg width="18" height="18">
              <use href="${sprite}#star-active"></use>
            </svg>
          </div>
          <button type="button" data-exerciseid="${
            this.id
          }" class="exercise-card-trash ${!trashVisible ? 'hidden' : ''}">
            <svg width="16" height="16">
              <use href="${sprite}#trash"></use>
            </svg>
          </button>
          <button type="button" data-exerciseid="${
            this.id
          }" class="exercise-start-btn">
            Start
            <svg width="16" height="16">
              <use href="${sprite}#arrow"></use>
            </svg>
          </button>
        </div>
        <div class="exercise-title-container">
          <div class="exercise-icon">
            <svg width="18" height="18">
              <use href="${sprite}#group"></use>
            </svg>
          </div>
          <div class="exercise-title">${this.name}</div>
        </div>
        <ul class="exercise-details">
          <li class="exercise-details-item">Burned calories: <span class="exercise-details-item-value">${
            this.burnedCalories
          }</span></li>
          <li class="exercise-details-item">Body Part: <span class="exercise-details-item-value">${
            this.bodyPart
          }</span></li>
          <li class="exercise-details-item">Target: <span class="exercise-details-item-value">${
            this.target
          }</span></li>
        </ul>
      `;
    return card;
  }
  renderCard() {
    const card = document.createElement('div');
    card.className = 'exercise-modal-card';

    const properties = [
      { name: 'Target', value: this.target },
      { name: 'Body Part', value: this.bodyPart },
      { name: 'Equipment', value: this.equipment },
      { name: 'Popular', value: this.popularity },
      { name: 'Burned Calories', value: this.burnedCalories },
    ];

    const propertiesHTML = properties
      .filter(property => property.value)
      .map(
        property => `
        <div class="modal-card-property">
        <span class="modal-card-property-name">${property.name}</span>
          <span class="modal-card-property-value">${property.value}</span>
          
        </div>`
      )
      .join('');

    var isExerciseInFavorites = isIdPresentInLocalStorage(this.id)

    card.innerHTML = `
      <button type="button" class="modal-card-close-button">
       <svg width="24" height="24">
              <use href="${sprite}#close"></use>
            </svg>
        </button>
      <div class="modal-card-header">
      
      <div class="image-container">
        <img 
          src="${this.gifUrl}"
          alt="${this.name}"
          onerror="this.src='${noImage}'"
          loading="lazy" />
      </div>
      <div class="modal-card-data">

      <h3 class="modal-card-title">${this.name}</h3>
      <div class="modal-card-rating">
        <span class="rating-value">${this.formatRating()}</span>
       ${createRating(this.rating, sprite)}            
      </div>
      <hr class="divider" />
      <div class="modal-card-properties">
        ${propertiesHTML}
      </div>
      <hr class="divider" />
      <p class="modal-card-description">${this.description}</p>
      <div class="modal-card-buttons">
        <button type="button" data-exerciseid="${
          this.id
        }" class="modal-card-button favorite-button">
        <span>${isExerciseInFavorites ? 'Remove favorite' : 'Add to favorites'}</span>
        <svg width="18" height="18">
            <use href="${sprite}#heart" fill="${isExerciseInFavorites ? 'black' : 'none'}"></use>
          </svg>
        </button>
        <button type="button" data-exerciseid="${
          this.id
        }"class="modal-card-button rating-button">Give a rating</button>
      </div>
      </div>
      </div>
    `;

    return card;
  }
  formatRating() {
    return this.rating.toFixed(1);
  }
  getStarRatingHTML() {
    let starsHtml = '';
    const activestar =
      '<svg width="18" height="18"><use href="${sprite}#star-active"></use></svg>';
    const inactivestar =
      '<svg width="18" height="18"><use href="${sprite}#star-inactive"></use></svg>';
    starsHtml += activestar.repeat(this.rating.toFixed(0));
    starsHtml += inactivestar.repeat(5 - this.rating.toFixed(0));
    return starsHtml;
  }
}

export default Exercise;
