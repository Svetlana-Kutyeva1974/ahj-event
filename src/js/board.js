export default class Board {
  constructor(size) { //
    this.size = size;
    this.board = this.fillNewBoard();
    // this.renderBoard(this.fillNewBoard());
  }

  fillNewBoard() {
    const newBoard = [];
    for (let i = 0; i < this.size; i += 1) {
      newBoard[i] = [];
      for (let j = 0; j < this.size; j += 1) {
        newBoard[i][j] = '';
      }
    }
    return newBoard;
  }

  renderBoard() {
    const boardEl = document.getElementById('board');
    const fields = [];
    for (const [i, row] of this.board.entries()) {
      for (const [j, value] of row.entries()) {
        fields.push(`
        <div class="field ${value ? 'busy' : 'free'}" 
            data-row="${i}" 
            data-col="${j}"
            style="grid-row:${i + 1};grid-column:${j + 1};"
        >
          ${value || ''}
        </div>
      `);
      }
    }
    boardEl.innerHTML = fields.join('');
  }
}
