'use strict';
import axios from 'axios';

const fetchCardByID = async id => {
  return await axios.get(
    `https://your-energy.b.goit.study/api/exercises/${id}`
  );
};

const drawMarkupList = listCards => {
  return listCards
    .map(obj => {
      return `<li class="list-card-item" data-id="${obj._id}">
        <div class="list-card-wrapper">
          <div class="box-buttons">
            <div class="trash-box">
              <div class="card-name-box">
                <p class="list-card-name">Workout</p>
              </div>
              <button class="btn-trash" type="button">
              <svg class="icon-trash" width="16px" height="16px">
                <use href="./img/sprite.svg#trash"></use>
              </svg>
              </button>
            </div>
            <button class="btn-start" type="button">
              Start
              <svg width="16px" height="16px">
                <use href="./img/sprite.svg#arrow"></use>
              </svg>
            </button>
          </div>
          <div class="icon-run-box">
          <div class="icon-run-wrapper">
          <svg class="icon-run" width="14px" height="16px">
              <use href="./img/sprite.svg#group"></use>
          </svg>
          </div>
          <h3 class="list-title-card">${obj.name}</h3>
          </div>
          <div class="info-text-box">
            <p class="list-info-about-body">
              Burned calories:
              <span class="info-text-body"
                >${obj.burnedCalories} / ${obj.time} min</span
              >
            </p>
            <p class="list-info-about-body">
              Body part: <span class="info-text-body">${obj.bodyPart}</span>
            </p>
            <p class="list-info-about-body">
              Target: <span class="info-text-body">${obj.target}</span>
            </p>
          </div>
        </div>
      </li>`;
    })
    .join('');
};

export { drawMarkupList, fetchCardByID };
