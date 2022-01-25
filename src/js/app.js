import Board from './board.js';

import Img from './imgCreate.js';
// block отрисовки
let count = 0;
let countChange = 0;
let id;
let loss = 0;
const board = new Board(4);
board.renderBoard();

// ynew blocl logic
const arrField = Array.from(document.getElementsByClassName('field')); // все поля

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawField() {
  const colRandom = getRandomInt(0, 3);
  const rowRandow = getRandomInt(0, 3);
  console.log('текущая клетка', colRandom, rowRandow);
  const element = arrField.find((item) => item.dataset.col === `${colRandom}`
  && item.dataset.row === `${rowRandow}`);
  element.classList.remove('free');
  element.classList.add('busy');
  // console.log('field busy', element);
  const imgNew = Img.create();
  element.insertAdjacentElement('afterBegin', imgNew);
}

function isActive() {
  return (arrField.findIndex((item) => (item.classList.contains('busy'))));
}

function changeField() {
  const t = isActive.call(arrField);
  const deletable = arrField[t].firstElementChild;
  // console.log('удаляем -', deletable);

  // const filterWidgetEl = document.querySelector('[data-widget=filter-widget]');
  // const filterBtnEl = filterWidgetEl.querySelector('[data-action=filter]');
  // const filterTextEl = filterWidgetEl.querySelector('[data-id=filter-text]')
  arrField[t].addEventListener('click', (event) => {
    event.preventDefault();
    console.log('событие', event);
    Img.create().style.cursor = 'crosshair';
    deletable.style.cursor = 'crosshair';
    // Img.create().style.cursor = `${url('./img/640.jpg')}`;
    // this.querySelector("a.task__remove").parentNode.remove();
    if (event.target.value === Img.create()) {
      count += 1;
      countChange = count;
      console.log('event.target', event.target);
      console.log('счетчик', count);
      // console.log(filterTextEl);
      /*
      if (count === 5 || countChange === 5) {
        clearInterval(id);
        alert('Игра окончена. Допущено 5 промахов');
      }
      */
    } else {
      loss += 1;
      console.log('промахов', loss);
    }
  });

  arrField[t].classList.remove('busy');
  arrField[t].classList.add('free');
  deletable.remove();
  drawField();

  console.log('счетчик изменений', countChange);
  if (loss === 5) {
    clearInterval(id);
    alert('Игра окончена. Допущено 5 промахов');
  }

  deletable.style.cursor = 'default';
  countChange += 1;
  // Img.create().style.cursor = 'default';
}

drawField();
id = setInterval(() => changeField.call(arrField), 2000);
