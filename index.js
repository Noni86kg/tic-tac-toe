const btns = document.querySelectorAll(".btn");
const text = document.querySelector(".text");
const winnerText = document.querySelector(".winner-text");
const overlay = document.querySelector(".overlay");
const restartBtn = document.querySelector(".restart");
const playerOneScore = document.querySelector(".player-one-score");
const playerTwoScore = document.querySelector(".player-two-score");

restartBtn.addEventListener("click", restartGame);

btns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

const svgX = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
<g id="Layer_3">
	<line id="path2" fill="none" stroke="#000000" stroke-width="3" stroke-miterlimit="10" x1="8.5" y1="41.5" x2="41.5" y2="8.5"/>
	<line id="path3" fill="none" stroke="#000000" stroke-width="3" stroke-miterlimit="10" x1="41.5" y1="41.5" x2="8.5" y2="8.5"/>
</g>
</svg>`;

const svgO = `<svg>
          <circle
            id="circle"
            cx="50%"
            cy="50%"
            r="35%"
            stroke="black"
            stroke-width="5%"
            fill-opacity="0"
          />
        </svg>`;

let isPlayerOneTurn = true;
let table = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function handleScore() {
  const winner = isPlayerOneTurn ? playerOneScore : playerTwoScore;
  const score = parseInt(winner.textContent);
  const newScore = score + 1;
  winner.innerHTML = newScore.toString();
}

function messageForWinner() {
  return `Player ${isPlayerOneTurn ? "one" : "two"} is winner`;
}

function handleClick(event) {
  const { name, id } = event.target;
  const [row, column] = name.split("_");
  const activeBtn = document.getElementById(id);
  const svgCode = isPlayerOneTurn ? svgX : svgO;
  activeBtn.innerHTML = svgCode;
  activeBtn.setAttribute("disabled", true);

  const activeChar = isPlayerOneTurn ? "X" : "O";
  table[row][column] = activeChar;
  checkIfThereIsWinner(activeChar);
}

function checkIfThereIsWinner(activeChar) {
  let isWinner = false;
  for (let i = 0; i < 8; i++) {
    if (i < 3) {
      isWinner = table[i].every((item) => item === activeChar);
    } else if (i < 7) {
      isWinner = table.every((item) => item[i - 4] === activeChar);
    } else {
      isWinner =
        [table[0][0], table[1][1], table[2][2]].every(
          (item) => item === activeChar
        ) ||
        [table[0][2], table[1][1], table[2][0]].every(
          (item) => item === activeChar
        );
    }

    if (isWinner) {
      text.innerHTML = messageForWinner();
      winnerText.innerHTML = messageForWinner();
      overlay.classList.add("active");
      handleScore();
      break;
    }
  }

  if (!isWinner) {
    if (
      isPlayerOneTurn &&
      table.every((arr) => arr.every((item) => typeof item === "string"))
    ) {
      text.innerHTML = "Draw";
    } else {
      isPlayerOneTurn = !isPlayerOneTurn;
      text.innerHTML = `Player ${
        isPlayerOneTurn ? "one" : "two"
      } is on the move`;
    }
  }
}

function restartGame() {
  table = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  isPlayerOneTurn = true;
  text.innerHTML = "Player one is on the move";
  btns.forEach((btn) => {
    btn.removeAttribute("disabled");
    btn.innerHTML = "";
  });
  overlay.classList.remove("active");
}
