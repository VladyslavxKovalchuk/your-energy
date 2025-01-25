import { showCategories } from './categories.js';
import { ShowExercisesByCategory} from './exercises.js'
import ExerciseFilterType from './exercise.filter-type.js';

const filterTabs = document.querySelectorAll('.filter-tab-button');
const searchForm = document.querySelector('.filter-form-container');
const searchButton = document.querySelector('.search-button');
const canselSearchButton = document.querySelector('.cansel-search-button');
const searchStringElement = document.querySelector('.search-string')
const additionalTextElement = document.querySelector('.additional-title-filter');
const slashElement = document.querySelector('.slash-in-filter');
var filterName = ''
var categoryName = ''
var searchString = ''

const categoryMap = {
    'button-muscles': 'Muscles',
    'button-bodypart': 'Body parts',
    'button-equipment': 'Equipment'
}

if (searchStringElement) {
    searchStringElement.addEventListener('input', function() {
        canselSearchButton.style.display = this.value.length > 0 ? 'block' : 'none';
    });
}

if (canselSearchButton) {
    canselSearchButton.addEventListener('click', function() {
        searchStringElement.value = '';
        this.style.display = 'none';
    });
}

filterTabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
        event.preventDefault()
        clearFilter()
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

if (searchButton) {
    searchButton.addEventListener('click', (event) => {
        event.preventDefault()
        searchString = searchStringElement.value
        ShowExercisesByCategory(findExerciseFilterType(filterName), categoryName, searchString)
    })
}

function findExerciseFilterType(filter) {
    var lowerCaseFilter = filter.toLowerCase();
    if (lowerCaseFilter === 'body parts') {
        lowerCaseFilter = 'bodypart'
    }
    return Object.values(ExerciseFilterType).find(
      value => value === lowerCaseFilter
    );
  };


function updateTitle(someText) {
    slashElement.style.display = 'inline'
    additionalTextElement.textContent = someText
}

function clearFilter() {
    slashElement.style.display = 'none'
    searchForm.style.display = 'none'
    additionalTextElement.textContent = ''
    clearParams()
}


export function renderFilterByCategory(filter, category) {
    updateParams(filter, category)
    updateTitle(category)
    searchForm.style.display = 'block'
    // call function in exircises carts
    console.log(`filterName: ${filterName}  categoryName: ${categoryName}`)
}

function updateParams(filter, category) {
    filterName = filter
    categoryName = category
}

function clearParams() {
    filterName = ''
    categoryName = ''
    searchStringElement.value = ''
    searchString = ''
}
