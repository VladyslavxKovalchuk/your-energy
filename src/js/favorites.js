const list = document.querySelector('.fav-list-card');

const listId = [1, 2, 3, 4, 5, 6, 7, 8];

const markupCards = listId.map(id => {
  return `<li class="list-card-item" data-id="${id}">
                <div class="list-card-wrapper">
                  <div class="box-buttons">
                    <div class="card-name-box">
                      <p class="list-card-name">tags</p>
                    </div>
                    <button class="btn-start" type="button">Start</button>
                  </div>
                  <h3 class="list-title-card">title card</h3>
                  <div class="info-text-box">
                    <p class="list-info-about-body">
                      Burned calories: <span class="info-text-body">220 / 3 min</span>
                    </p>
                    <p class="list-info-about-body">
                      Body part: <span class="info-text-body">Waist</span>
                    </p>
                    <p class="list-info-about-body">
                      Target: <span class="info-text-body">Biceps</span>
                    </p>
                  </div>
                </div>
              </li>`;
});

list.insertAdjacentHTML('beforeend', markupCards.join(''));
