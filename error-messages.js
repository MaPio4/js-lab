const ERROR_HTML_ID = "error_message";
const ERROR_TIME_SHORT = 1600;
const ERROR_TIME_LONG = 3500;
const COLOR_OK = "#257500";
const COLOR_WRONG = "#b50c00";
var wipeDisplayErrorTimeout = null;

const displayError = function(p_message, p_color, p_time) {
  killWipeDisplayError();
  document.getElementById(ERROR_HTML_ID).innerText = p_message;
  document.getElementById(ERROR_HTML_ID).style.color = p_color;
  wipeDisplayErrorTimeout = setTimeout(wipeDisplayError, p_time);
}

const wipeDisplayError = function() {
  document.getElementById(ERROR_HTML_ID).innerText = "";  
  killWipeDisplayError();
}

const killWipeDisplayError = function() {
  if(typeof(wipeDisplayErrorTimeout) == "number") {
    clearTimeout(wipeDisplayErrorTimeout);
  }
}