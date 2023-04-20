// Config:
const MIN_ROUND_TIME = 1;
const MAX_ROUND_TIME = 6;
const NUMBER_OF_ROUNDS_PER_SESSION = 5;
const DEFAULT_SCOREBOARD_VALUE = `none`;
const DEFAULT_FIELD_COLOR = "#FFFFFF";
const TIME_UNIT_SUFFIX = "ms";
const AVAILABLE_COLORS = [
  "#d40000", "#d48a00", "#bed400", "#74d400", "#00bf50", 
  "#00a3bf", "#0033bf", "#4300bf", "#8f00bf", "#bf0083",
];
// ---------------

// Init:
const gameManager = new GameManager(NUMBER_OF_ROUNDS_PER_SESSION, new ColorPicker(AVAILABLE_COLORS));
const scoreBoard = new ScoreBoard(gameManager, DEFAULT_SCOREBOARD_VALUE, TIME_UNIT_SUFFIX);
const settingsReader = new SettingsReader(gameManager);
var roundTimeout = null;
// ---------------

// Click events:
const clickedStartButton = function() {
  readGameSettings();
  if(gameManager.startSession()) {
    scoreBoard.update();
  }   
}

const clickedReactionField = function() {
  gameManager.onClick();
}

const clickedStopButton = function() {
  killNextRoundTimeout();
  if(gameManager.stop()) {
    scoreBoard.update();
  }  
}
// ---------------

// Main events:
const pageLoaded = function() {
  scoreBoard.update();
  setGameFieldColor(DEFAULT_FIELD_COLOR);
}

const onRoundFinished = function(p_round) {
  scoreBoard.update();  
}

const onSessionFinished = function(p_session) {
  console.log(`[INFO] Session finished. Number of clicks before:${p_session.getNumberOfEarlyClicks()}`);
  setGameFieldColor(DEFAULT_FIELD_COLOR);
}
// ---------------

// Other functions:

const readGameSettings = function() {  
  settingsReader.readRoundsPerSession(document.getElementById("rounds_per_session"));
}

const setGameFieldColor = function(p_hex) {
  document.getElementById("game_field").style.backgroundColor = p_hex;
}

const changeFieldColor = function(p_manager) {
  p_manager.onSwitch();
}

const readTime = function() {
  return Math.round(performance.now());
}
