const MIN_ROUND_TIME = 1;
const MAX_ROUND_TIME = 2;
const NUMBER_OF_ROUNDS_PER_SESSION = 3;


const gameManager = new GameManager();
const scoreBoard = new ScoreBoard(gameManager);

const clickedStartButton = function() {
  //console.log("clickedStartButton")
  scoreBoard.update();
  gameManager.startSession();    
}

const clickedReactionField = function() {
  gameManager.onClick();
}