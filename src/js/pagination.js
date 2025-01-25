'use strict';

const onParentElClick = (callback, ...callbackParams) => {
  return event => {
    const paginationEl = event.currentTarget;
    console.dir(event.target);
    console.dir(event.currentTarget);
    console.log(event.currentTarget === paginationEl);
    paginationEl.remove();
    if (event.target === event.currentTarget) {
      return;
    }

    const page = event.target.closest(`li`).getAttribute('data-page');

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
  parentEl.innerHTML = createPaginationItems(currentPage, totalPages);
  const paginationEl = parentEl.firstChild;
  paginationEl.addEventListener(
    'click',
    onParentElClick(callback, callbackParams)
  );
};

const createPaginationItem = (page, title, active, round) => {
  return `<li class="pagination-item${active ? ' p-active' : ''}${
    round ? ' p-round' : ''
  }" data-page="${page}">${title}</li>`;
};

export const createPaginationItems = (currentPage, totalPages) => {
  const x = currentPage;

  const arr = [x - 2, x - 1, x, x + 1, x + 2];

  const num = arr
    .filter(el => el > 0)
    .filter(el => el <= totalPages)
    .slice(0, 4)
    .map(el => [el, el, false, true]);

  console.log(arr);

  const pages = [
    [1, '<<', false, true],
    [1, '<', false, true],
    [1, '1', false, true],
    [1, '2', false, false],
    [1, '3', false, false],
    [
      currentPage === totalPages ? totalPages : currentPage + 1,
      '...',
      false,
      false,
    ],
    [55, '>', true, true],
    [totalPages, '>>', true, true],
  ];

  return (
    '<ul class="pagination">' +
    pages.reduce((acc, el) => {
      return acc + createPaginationItem(...el);
    }, '') +
    '</ul>'
  );
};
