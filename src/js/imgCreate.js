import png from '../img/goblin.png';

export default class Img {
  static create() {
    const imgEl = document.createElement('img');
    imgEl.src = png;
    imgEl.alt = 'Текущее положение';
    imgEl.classList.add('style-img');
    return imgEl;
  }
}
