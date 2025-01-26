'use strict';

import { fetchCategories } from './api.js';
import { showPagination, hidePagination } from './pagination.js';
import { getGategoriesOnPage } from './utils.js';
import { ShowExercisesByCategory, HideExercises } from './exercises.js';
import ExerciseFilterType from './exercise.filter-type.js';
import { renderFilterByCategory } from './filters.js';
import { showLoader, hideLoader } from './loader.js';

const categoryListEl = document.querySelector('.category-list');
const categoryContainerEl = document.querySelector('.category-container');

export const createCategoriesItems = categoriesArr => {
  return categoriesArr.reduce((acc, el) => {
    return (
      acc +
      `<li class="category-card" data-name="${el.name}" data-filter="${el.filter}">
      <img class="gallery-image"
           src="${el.imgURL}"
           alt="${el.name}"
           loading="lazy"
           width="335"
           height="225"
           />
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
    const { page, totalPages, results } = response.data;

    if (results.length === 0) {
      categoryListEl.innerHTML = '';
    }

    categoryListEl.innerHTML = createCategoriesItems(results);
    categoryListEl.addEventListener('click', onCategoryListElClick);
    categoryContainerEl.classList.add('active');
    HideExercises();
    showPagination(
      '.pagination-container',
      queriedPage,
      totalPages,
      showCategories,
      filter,
      page
    );
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
};

export const hideCategories = () => {
  categoryListEl.innerHTML = '';
  hidePagination('.pagination-container');
  categoryListEl.removeEventListener('click', onCategoryListElClick);
  categoryContainerEl.classList.remove('active');
};

const onCategoryListElClick = event => {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  const targetCard = event.target.closest(`li`);
  const filter = targetCard.getAttribute('data-filter');
  const name = targetCard.getAttribute('data-name');
  hideCategories();
  ShowExercisesByCategory(findExerciseFilterType(filter), name);
  renderFilterByCategory(filter, name);
};

const findExerciseFilterType = filter => {
  const lowerCaseFilter = filter.toLowerCase();
  return Object.values(ExerciseFilterType).find(
    value => value === lowerCaseFilter
  );
};
if (categoryContainerEl)
  showCategories('Muscles', 1);
