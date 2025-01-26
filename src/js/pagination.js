'use strict';

import { generatePaginationEl } from './pagination-utils';

const onParentElClick = (callback, ...callbackParams) => {
  return event => {
    event.preventDefault();
    const paginationEl = event.currentTarget;
    if (event.target === event.currentTarget) {
      return;
    }
    const page = Number(event.target.closest(`li`).getAttribute('data-page'));
    if (page < 1) {
      return;
    }
    paginationEl.remove();
    let args = Array.from(...callbackParams);
    args.splice(-1, 1, page);
    callback.apply(null, args);
  };
};

export const showPagination = (
  parentQuerySelector,
  currentPage,
  totalPages,
  callback,
  ...callbackParams
) => {
  const parentEl = document.querySelector(parentQuerySelector);
  parentEl.innerHTML = generatePaginationEl(currentPage, totalPages);
  const paginationEl = parentEl.firstChild;
  paginationEl.addEventListener(
    'click',
    onParentElClick(callback, callbackParams)
  );
};

export const hidePagination = parentQuerySelector => {
  const parentEl = document.querySelector(parentQuerySelector);
  if (parentEl.firstChild)
    parentEl.firstChild.remove();
};
