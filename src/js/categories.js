'use strict';

import { fetchCategories } from './api.js';
import { getGategoriesOnPage, getResolution } from './utils.js';
import { ShowExercisesByCategory } from './exercises.js';
import ExerciseFilterType from './exerciseFilterType.js';
import { renderFilterByCategory } from './filters.js';
import { showLoader, hideLoader } from './loader.js';


const categoryListEl = document.querySelector('.category-list');
const categoryContainerEl = document.querySelector('.category-container');

export const createGalleryCards = categoriesArr => {
  return categoriesArr.reduce((acc, el) => {
    return (
      acc +
      `<li class="category-card" data-name="${el.name}" data-filter="${el.filter}">
      <img class="gallery-image"
           src="${el.imgURL}"
           alt="${el.name}"/>
            <div class="category-title">
              <h3>${el.name}</h3>
              <p>${el.filter}</p>
            </div>
          </li>`
    );
  }, '');
};

export const showCategories = async (filter, queriedPage) => {
  try {
    showLoader();
    const response = await fetchCategories(
      filter,
      queriedPage,
      getGategoriesOnPage()
    );
    const { page, perPage, totalPages, results } = response.data;

    if (results.length === 0) {
      console.log('There are no categories for the specified filter');
      return { page, perPage, totalPages };
    }

    categoryListEl.innerHTML = createGalleryCards(results);
    categoryListEl.addEventListener('click', onCategoryListElClick);
    categoryContainerEl.classList.add('active');

    return { page, perPage, totalPages };
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
};

export const hideCategories = () => {
  categoryListEl.innerHTML = '';
  categoryListEl.removeEventListener('click', onCategoryListElClick);
  categoryContainerEl.classList.remove('active');
};

const onCategoryListElClick = event => {
  event.preventDefault();
  console.log(getResolution());
  if (event.target === event.currentTarget) {
    return;
  }
  const targetCard = event.target.closest(`li`);
  const filter = targetCard.getAttribute('data-filter');
  const name = targetCard.getAttribute('data-name');
  hideCategories();
  ShowExercisesByCategory(findExerciseFilterType(filter), name);
  renderFilterByCategory(filter, name)
  console.log(`Execute function for rendering exercises (${filter}; ${name})`);
};

 export const findExerciseFilterType = (filter) => {
  const lowerCaseFilter = filter.toLowerCase();
  return Object.values(ExerciseFilterType).find(
    value => value === lowerCaseFilter
  );
};
