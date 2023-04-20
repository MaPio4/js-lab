class SettingsReader {
  constructor(p_gameManager) {
    this.gameManager = p_gameManager;
  }

  readRoundsPerSession(p_htmlInput) {
    var value = p_htmlInput.value;
    if(value == "") {
      value = NUMBER_OF_ROUNDS_PER_SESSION;
    }
    value = Number(value);
    if(value <= 0) {
      value = NUMBER_OF_ROUNDS_PER_SESSION;
    }
    this.gameManager.setRoundsPerSession(value);
  }
}