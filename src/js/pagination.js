'use strict';

import { generatePaginationEl } from './pagination-utils';

const onParentElClick = (callback, ...callbackParams) => {
  return event => {
    const paginationEl = event.currentTarget;

    if (event.target === event.currentTarget) {
      return;
    }
    const page = event.target.closest(`li`).getAttribute('data-page');
    if (page == -1) {
      return;
    }
    paginationEl.remove();
    console.log('Click....... ' + page);

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
