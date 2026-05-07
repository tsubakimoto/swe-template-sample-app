/* Minimal Tic-Tac-Toe implementation (accessibility improvements) */
(() => {
  const WIN_COMBINATIONS = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  const boardEl = document.getElementById('board');
  const cells = Array.from(boardEl.querySelectorAll('.cell'));
  const currentPlayerEl = document.getElementById('currentPlayer');
  const resultEl = document.getElementById('result');
  const resetBtn = document.getElementById('resetBtn');

  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let winner = null;
  let moves = 0;

  // make result announcements atomic for screen readers
  resultEl.setAttribute('aria-atomic', 'true');

  function updateStatus(){
    if(winner){
      resultEl.textContent = `勝者: ${winner}`;
      currentPlayerEl.textContent = '-';
    } else if(moves === 9){
      resultEl.textContent = '引き分け';
      currentPlayerEl.textContent = '-';
    } else {
      resultEl.textContent = '';
      currentPlayerEl.textContent = currentPlayer;
    }
  }

  function checkWinner(){
    for(const combo of WIN_COMBINATIONS){
      const [a,b,c] = combo;
      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        return { winner: board[a], combo };
      }
    }
    return null;
  }

  function disableRemainingCells(){
    cells.forEach((c, i) => {
      if(!board[i]){
        c.setAttribute('aria-disabled', 'true');
        c.setAttribute('tabindex', '-1');
      }
    });
  }

  function handleMove(index, cellEl){
    if(board[index] || winner) return;
    board[index] = currentPlayer;
    cellEl.textContent = currentPlayer;
    cellEl.classList.add(currentPlayer.toLowerCase());
    cellEl.setAttribute('aria-label', `セル ${index+1}: ${currentPlayer}`);
    cellEl.setAttribute('aria-disabled', 'true');
    cellEl.setAttribute('tabindex', '-1');

    moves++;
    const res = checkWinner();
    if(res){
      winner = res.winner;
      res.combo.forEach(i => cells[i].classList.add('win'));
      // disable remaining cells for clarity
      disableRemainingCells();
      // announce winner (aria-live on resultEl will handle)
    } else if(moves === 9){
      // draw: disable remaining (none left likely)
      disableRemainingCells();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    updateStatus();
  }

  function onCellClick(e){
    const idx = Number(e.currentTarget.dataset.index);
    handleMove(idx, e.currentTarget);
  }

  function onCellKey(e){
    // support Enter and Space reliably across browsers
    const isActivationKey = e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space';
    if(isActivationKey){
      e.preventDefault();
      const idx = Number(e.currentTarget.dataset.index);
      handleMove(idx, e.currentTarget);
    }
    // Optional: implement arrow-key navigation here
  }

  function resetGame(){
    board = Array(9).fill(null);
    currentPlayer = 'X';
    winner = null;
    moves = 0;
    cells.forEach((c, i) => {
      c.textContent = '';
      c.classList.remove('x','o','win');
      c.removeAttribute('aria-disabled');
      c.setAttribute('tabindex', '0');
      c.setAttribute('aria-label', `セル ${i+1}: 空`);
    });
    updateStatus();
    // move focus to first cell for keyboard users
    if(cells[0]) cells[0].focus();
  }

  // init: ensure aria labels and listeners
  cells.forEach((cell, index) => {
    // ensure role and initial aria-label (in case index.html didn't include them)
    if(!cell.hasAttribute('role')) cell.setAttribute('role', 'gridcell');
    cell.setAttribute('tabindex', cell.getAttribute('tabindex') || '0');
    if(!cell.hasAttribute('aria-label')) cell.setAttribute('aria-label', `セル ${index+1}: 空`);

    cell.addEventListener('click', onCellClick);
    cell.addEventListener('keydown', onCellKey);
  });
  resetBtn.addEventListener('click', resetGame);

  // initial render
  updateStatus();
})();
