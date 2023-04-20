// Config:
const MIN_ROUND_TIME = 1;
const MAX_ROUND_TIME = 6;
const NUMBER_OF_ROUNDS_PER_SESSION = 5;
const DEFAULT_SCOREBOARD_VALUE = `brak :(`;
const DEFAULT_FIELD_COLOR = "#FFFFFF";
const TIME_UNIT_SUFFIX = "ms";
const TRIGGER_KEY = 32;
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
    document.getElementById("game_field").innerText = "";
    setGameFieldColor(DEFAULT_FIELD_COLOR);
    
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
  document.getElementById("game_field").innerText = `Koniec sesji! 
  Twój najelpszy czas podczas tej sesji to ${p_session.getBestTime()} ms.
  Kliknięcia przed czasem: ${p_session.getNumberOfEarlyClicks()}. 
  Kliknij START aby rozpocząć kolejną sesję.`
  setGameFieldColor(DEFAULT_FIELD_COLOR);
}

const onSessionStarted = function(p_session) {
  document.getElementById("game_field").innerText = "";
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

// Key Event handler:
document.addEventListener("keydown", (event) => {  
  clickedReactionField();
});


