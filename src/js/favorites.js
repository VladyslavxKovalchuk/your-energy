'use strict';
import { drawMarkupList, fetchCardByID } from './fav-functions/helper';

const list = document.querySelector('.fav-list-card');
const textDefault = document.querySelector('.fav-text-default');

let listId = [];
const arrayID = [
  '64f389465ae26083f39b17a7',
  '64f389465ae26083f39b17a3',
  '64f389465ae26083f39b17a7',
  '64f389465ae26083f39b17a3',
  '64f389465ae26083f39b17a7',
  '64f389465ae26083f39b17a3',
  '64f389465ae26083f39b17a7',
  '64f389465ae26083f39b17a3',
  '64f389465ae26083f39b17a7',
  '64f389465ae26083f39b17a3',
  '64f389465ae26083f39b17a7',
  '64f389465ae26083f39b17a3',
  '64f389465ae26083f39b17a7',
  '64f389465ae26083f39b17a3',
  '64f389465ae26083f39b17a7',
  '64f389465ae26083f39b17a3',
];
let markupCards = '';
let getData = [];

const readFromLS = async () => {
  listId = JSON.parse(localStorage.getItem('keyID'));

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
      console.log(error.message);
    }
  }
};

localStorage.setItem('keyID', JSON.stringify(arrayID));
if (list) 
  readFromLS();
