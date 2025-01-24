import axios from "axios";
import { showCategories } from './categories.js';

const filterTabs = document.querySelectorAll('.filter-tab-button');
const searchForm = document.querySelector('.filter-form-container');
const searchButton = document.querySelector('.search-button');
const additionalTextElement = document.querySelector('.additional-title-filter');
const slashElement = document.querySelector('.slash-in-filter');

const categoryMap = {
    'button-muscles': 'Muscles',
    'button-bodypart': 'Body parts',
    'button-equipment': 'Equipment'
}

axios.defaults.baseURL = "https://your-energy.b.goit.study";

export async function getFilters(filterName, limit, page=1) {
    return await axios.get('/api/filters', {
      params: {
          filter: filterName,
          page: page,
          limit: limit
        }
      })
}

export async function getExercises(params) {
    return await axios.get('/api/exercises', {
      params: params
      })
      //   {
//     keyword: keyword,
//     bodypart: bodypart,
//     muscles: muscles,
//     equipment: equipment,
//     page: page,
//     limit: limit,
//   }
}


filterTabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
        event.preventDefault()
        if (event.target && event.target.matches('button.filter-tab-button')) {
            filterTabs.forEach(btn => {
                btn.classList.remove('active');
            });
            tab.classList.add('active');
            const buttonId = event.target.id;
            const categoryName = categoryMap[buttonId];
            showCategories(categoryName, 1)
                .then(pages =>
                    console.log(`Execute function for pagination with parameter ${JSON.stringify(pages)}`)
                )
                .catch(err => console.log(err));
    
        }
})})


searchButton.addEventListener('click', (event) => {
    event.preventDefault()
    // call function in exircises carts
})

function updateTitle(someText) {
    slashElement.style.display = 'inline'
    additionalTextElement.textContent = someText
}

function clearFilter() {
    slashElement.style.display = 'none'
    searchForm.style.display = 'none'
    additionalTextElement.textContent = ''
}


export function renderFilterByCategory(filterName, categoryName) {
    updateTitle(categoryName)
    searchForm.style.display = 'block'
    // call function in exircises carts
}


