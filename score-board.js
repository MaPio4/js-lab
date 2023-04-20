class ScoreBoard {
  constructor(p_manager, p_defaultValue, p_unit) {
    this.gameManager = p_manager;
    this.defValue = p_defaultValue;
    this.unit = p_unit;
  }

  update() {
    var bestGameTime, bestTime, worstTime, avgTime;    
    if(this.gameManager.sessions.length <= 0 ) {
      updateScoreBoard(this.defValue, this.defValue, this.defValue, this.defValue);
      return;
    }
    else if(this.gameManager.currentSession == null && this.gameManager.sessions.length > 0) {
      bestGameTime = this.gameManager.getBestGameTime();

      updateScoreBoard(this.defValue, this.defValue, this.defValue, this.addTimeUnit(bestGameTime));
      return;
    }
    else if(this.gameManager.currentSession != null && !this.gameManager.currentSession.hasAnyData()) {     
      bestGameTime = this.gameManager.getBestGameTime();
      bestGameTime = bestGameTime == Infinity ? this.defValue : this.addTimeUnit(bestGameTime);

      updateScoreBoard(this.defValue, this.defValue, this.defValue, bestGameTime);
      return;
    }

    bestGameTime = this.gameManager.getBestGameTime();
    bestTime = this.gameManager.currentSession.getBestTime();
    worstTime = this.gameManager.currentSession.getWorstTime();
    avgTime = Math.round(this.gameManager.currentSession.getAvgTime() * 10) / 10;   

    updateScoreBoard(this.addTimeUnit(bestTime), this.addTimeUnit(worstTime), this.addTimeUnit(avgTime), this.addTimeUnit(bestGameTime));
  }  

  addTimeUnit(p_val) {
    return `${p_val} ${this.unit}`
  }
}

// Related functions:
const updateScoreBoard = function(p_bestTime, p_worstTime, p_avgTime, p_bestGameTime) {
  document.getElementById("best_game_time").innerText = p_bestGameTime;
  document.getElementById("best_time").innerText = p_bestTime;
  document.getElementById("worst_time").innerText = p_worstTime;
  document.getElementById("avg_time").innerText = p_avgTime;
}


