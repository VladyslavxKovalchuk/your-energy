'use strict';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import { drawMarkupList, fetchCardByID } from './fav-functions/helper';
import getAllIdFromLocalStorage from './js/localStorage';

const list = document.querySelector('.fav-list-card');
const textDefault = document.querySelector('.fav-text-default');
const ulEl = document.querySelector('.fav-list-card');
let markupCards = '';
let getData = [];
let listId = [];

ulEl.addEventListener('click', e => {
  if (e.target.nodeName === 'use') {
    const idCard =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        .dataset.id;
    const newArray = getData.filter(obj => obj._id !== idCard);
    const newIDList = newArray.filter(obj => obj._id);
    const filtrMArkup = drawMarkupList(newArray);
    list.innerHTML = filtrMArkup;
    localStorage.setItem('keyID', JSON.stringify(newIDList));
  }
});

const readFromLS = async () => {
  listId = getAllIdFromLocalStorage();

  if (listId === null) {
    listId = [];
  }

  if (listId.length === 0) {
    if (textDefault.classList.contains('is-visible')) {
      textDefault.classList.remove('is-visible');
    }
    return;
  } else {
    try {
      const promise = await Promise.all(listId.map(id => fetchCardByID(id)));
      getData = promise.map(obj => obj.data);
      markupCards = drawMarkupList(getData);
      if (list) {
        textDefault.classList.add('is-visible');
        list.insertAdjacentHTML('beforeend', markupCards);
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: `${error.message}`,
        position: 'topRight',
      });
    }
  }
};

readFromLS();
