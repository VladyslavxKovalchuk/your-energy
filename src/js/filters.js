import axios from "axios";


axios.defaults.baseURL = "https://your-energy.b.goit.study"

var pageNum = 1
var limit = 9
const filterTabs = document.getElementById('filter-tabs')

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
}

filterTabs.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target && event.target.matches('button.filter-tab-button')) {
        const buttonId = event.target.id;
        getFilterElements(buttonId);
    }
});

function getFilterElements(id) {
    console.log('Button clicked:', id);
    // Add your logic here
}

//   {
//     keyword: keyword,
//     bodypart: bodypart,
//     muscles: muscles,
//     equipment: equipment,
//     page: page,
//     limit: limit,
//   }