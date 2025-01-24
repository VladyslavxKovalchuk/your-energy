import { fetchExerciseById } from './api.js';

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
              <use href="./img/sprite.svg#star-active"></use>
            </svg>
          </div>
          <button class="exercise-card-trash ${!trashVisible ? 'hidden' : ''}">
            <svg width="16" height="16">
              <use href="./img/sprite.svg#trash"></use>
            </svg>
          </button>
          <button class="exercise-start-btn">
            Start
            <svg width="16" height="16">
              <use href="./img/sprite.svg#arrow"></use>
            </svg>
          </button>
        </div>
        <div class="exercise-title-container">
          <div class="exercise-icon">
            <svg width="18" height="18">
              <use href="./img/sprite.svg#group"></use>
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
  formatRating() {
    return this.rating.toFixed(1);
  }
}

export default Exercise;
