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
    this.gameManager.setRoundsPerSession(value);
  }
}