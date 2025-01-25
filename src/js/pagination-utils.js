'use strict';
import sprite from '../img/sprite.svg';

const PAGINATION_ICO = {
  0: sprite + '#two-angle-left',
  1: sprite + '#one-angle-left',
  6: sprite + '#one-angle-right',
  7: sprite + '#two-angle-right',
};

const generateInnerPagesArr = (currentPage, totalPages) => {
  const arr = [];

  if (currentPage < 4) {
    for (let i = 0; i < 4; i++) {
      arr.push(1 + i);
    }
  }

  if (totalPages - currentPage < 3 && arr.length === 0) {
    for (let i = 0; i < 4; i++) {
      arr.unshift(totalPages - i);
    }
  }

  if (arr.length === 0) {
    for (let i = -1; i < 3; i++) {
      arr.push(currentPage + i);
    }
  }

  if (arr[3] < totalPages) {
    arr[3] = 0;
  }
  if (arr[3] === totalPages && arr[0] != 1) {
    arr[0] = 0;
  }

  for (let i = 0; i < 4; i++) {
    if (arr[i] > totalPages) {
      arr[i] = -1;
    }
  }

  arr.unshift(currentPage > 1 ? currentPage - 1 : -1);
  arr.unshift(currentPage > 1 ? 1 : -1);
  arr.push(currentPage < totalPages ? currentPage + 1 : -1);
  arr.push(currentPage < totalPages ? totalPages : -1);

  return arr;
};

const generatePaginationItemObjects = (currentPage, totalPages) => {
  const pages = generateInnerPagesArr(currentPage, totalPages);
  const leftBtns = new Set([0, 1]);
  const rightBtns = new Set([6, 7]);
  const sideBtns = leftBtns.union(rightBtns);
  return pages.map((el, idx) => [
    idx,
    el,
    sideBtns.has(idx) ? '' : el === 0 ? '...' : el > 0 ? el : '',
    el === currentPage ||
      (leftBtns.has(idx) && currentPage != 1) ||
      (rightBtns.has(idx) && currentPage != totalPages),
    sideBtns.has(idx) || el === currentPage,
  ]);
};

const addPaginationItemIco = idx => {
  return PAGINATION_ICO.hasOwnProperty(idx)
    ? `<svg width="20" height="20"><use href="${PAGINATION_ICO[idx]}"></use></svg>`
    : '';
};
const generatePaginationItem = (idx, page, title, accent, outline) => {
  return `<li class="pagination-item${accent ? ' accent' : ''}${
    outline ? ' outline' : ''
  }${
    page === -1 && !outline ? ' hidden-btn' : ''
  }" data-page="${page}">${title}${addPaginationItemIco(idx)}</li>`;
};

const generatePaginationItems = (currentPage, totalPages) => {
  const pages = generatePaginationItemObjects(currentPage, totalPages);
  return pages.reduce((acc, el) => {
    return acc + generatePaginationItem(...el);
  }, '');
};

export const generatePaginationEl = (currentPage, totalPages) => {
  const items = generatePaginationItems(currentPage, totalPages);
  return `<ul class="pagination">${items}</ul>`;
};
