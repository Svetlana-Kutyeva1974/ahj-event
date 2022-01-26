import Board from './board.js';
import Img from './imgCreate.js';

let count = 0;
let countChange = 1;
let id;
let loss = 0;
const imgNew = Img.create();
const board = new Board(4);
board.renderBoard();

const arrField = Array.from(document.getElementsByClassName('field')); // все поля
const fullBoard = document.getElementById('board'); // общее поле для делигирования

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawField() {
  const colRandom = getRandomInt(0, 3);
  const rowRandow = getRandomInt(0, 3);
  const element = arrField.find((item) => item.dataset.col === `${colRandom}`
  && item.dataset.row === `${rowRandow}`);
  element.classList.remove('free');
  element.classList.add('busy');
  // const imgNew = Img.create();
  element.insertAdjacentElement('afterBegin', imgNew);
}

function isActive() {
  return (arrField.findIndex((item) => (item.classList.contains('busy'))));
}

function toggleField() {
  const t = isActive.call(arrField);
  if (t !== -1) {
    const deletable = arrField[t].firstElementChild;
    arrField[t].classList.remove('busy');
    arrField[t].classList.add('free');
    if (arrField[t].classList.contains('hide')) {
      arrField[t].classList.remove('hide');
    }
    deletable.remove();
    drawField();
    imgNew.style.display = 'flex';
  }
}

function changeField() {
  toggleField();
  // console.log('счетчик изменений', countChange);
  if (loss === 5 || (countChange - count - loss) === 5) {
    clearInterval(id);
    alert(`Игра окончена! \n Появилось : ${countChange}\n ------------ \n Попаданий при клике : ${count}  \n Допущено промахов при клике : ${loss}\n Пропущено появлений в ячейках : ${countChange - count - loss}`);
  }
  countChange += 1;
}

drawField();

fullBoard.addEventListener('click', (event) => {
  // console.log('-event.target + closest', event.target, '\n', event.target.closest('.style-img'));
  if (event.target.closest('.style-img')) {
    count += 1;
    // console.log('счетчик попаданий', count);
    arrField[isActive.call(arrField)].classList.add('hide');
    imgNew.style.display = 'none';
  } else {
    loss += 1;
    // console.log('промахов', loss);
  }
});

id = setInterval(() => changeField.call(arrField), 1000);
