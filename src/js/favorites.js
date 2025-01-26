'use strict';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import { drawMarkupList, fetchCardByID } from './fav-functions/helper';
import {
  getAllIdFromLocalStorage,
  removeIdFromLocalStorage,
} from './localStorage';

const list = document.querySelector('.fav-list-card');
const textDefault = document.querySelector('.fav-text-default');

let markupCards = '';
let getData = [];
let listId = [];

if (window.location.pathname === '/favorites.html') {
  list.addEventListener('click', e => {
    if (e.target.nodeName === 'use') {
      const idCard =
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .parentNode.dataset.id;
      const answer = removeIdFromLocalStorage(idCard);

      if (answer) {
        iziToast.success({
          title: 'OK',
          message: 'Exercise removed!',
          position: 'topRight',
        });
      } else {
        iziToast.error({
          title: 'Error',
          message: 'Exercise is not removed!',
          position: 'topRight',
        });
      }
      readFromLS();
    }
  });
}

const readFromLS = async () => {
  listId = getAllIdFromLocalStorage();

  if (listId.length === 0) {
    list.innerHTML = '';
    if (textDefault.classList.contains('is-visible')) {
      textDefault.classList.remove('is-visible');
    }
    return;
  } else {
    try {
      const promise = await Promise.all(listId.map(id => fetchCardByID(id)));
      getData = promise.map(obj => obj.data);
      markupCards = drawMarkupList(getData);
      if (!textDefault.classList.contains('is-visible')) {
        textDefault.classList.add('is-visible');
      }
      list.innerHTML = '';
      list.insertAdjacentHTML('beforeend', markupCards);
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: `${error.message}`,
        position: 'topRight',
      });
    }
  }
};
if (list) {
  readFromLS();
}
