import renderBoard from './board.js';
import png from '../img/goblin.png';
// block отрисовки

const fieldSize = 4;

function fillNewBoard() {
  const newBoard = [];
  console.log(newBoard);
  for (let i = 0; i < fieldSize; i += 1) {
    newBoard[i] = [];
    for (let j = 0; j < fieldSize; j += 1) {
      newBoard[i][j] = '';
    }
  }
  return newBoard;
}

renderBoard(fillNewBoard());

// ynew blocl logic
const arrField = Array.from(document.getElementsByClassName('field')); // все поля

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createImg() {
  const imgEl = document.createElement('img');
  imgEl.src = png;
  imgEl.alt = 'Текущее положение';
  imgEl.classList.add('style-img');
  console.log(imgEl);
  return imgEl;
}

function drawField() {
  const colRandom = getRandomInt(0, 3);
  const rowRandow = getRandomInt(0, 3);
  console.log('rann', colRandom, rowRandow);
  const element = arrField.find((item) => item.dataset.col === `${colRandom}`
  && item.dataset.row === `${rowRandow}`);
  element.classList.remove('free');
  element.classList.add('busy');
  console.log('field busy', element);
  const imgNew = createImg();
  element.insertAdjacentElement('afterBegin', imgNew);
}

function isActive() {
  return (arrField.findIndex((item) => (item.classList.contains('busy'))));
}

function changeField() {
  const t = isActive.call(arrField);
  const deletable = arrField[t].firstElementChild;
  console.log('удаляем -', deletable);

  arrField[t].classList.remove('busy');
  arrField[t].classList.add('free');
  deletable.remove();
  drawField();
}

drawField();
setInterval(() => changeField.call(arrField), 1000);
