class ScoreBoard {
  constructor(p_manager, p_defaultValue) {
    this.gameManager = p_manager;
    this.defValue = p_defaultValue;
  }

  update() {
    var bestGameTime, bestTime, worstTime, avgTime;    
    if(this.gameManager.sessions.length <= 0 ) {
      updateScoreBoard(this.defValue, this.defValue, this.defValue, this.defValue);
      return;
    }
    else if(this.gameManager.currentSession == null && this.gameManager.sessions.length > 0) {
      bestGameTime = this.gameManager.getBestGameTime();

      updateScoreBoard(this.defValue, this.defValue, this.defValue, bestGameTime);
      return;
    }
    else if(this.gameManager.currentSession != null && !this.gameManager.currentSession.hasAnyData()) {     
      bestGameTime = this.gameManager.getBestGameTime();
      bestGameTime = bestGameTime == Infinity ? this.defValue : bestGameTime;

      updateScoreBoard(this.defValue, this.defValue, this.defValue, bestGameTime);
      return;
    }

    bestGameTime = this.gameManager.getBestGameTime();
    bestTime = this.gameManager.currentSession.getBestTime();
    worstTime = this.gameManager.currentSession.getWorstTime();
    avgTime = this.gameManager.currentSession.getAvgTime();   

    updateScoreBoard(bestTime, worstTime, avgTime, bestGameTime);
  }  
}

// Related functions:
const updateScoreBoard = function(p_bestTime, p_worstTime, p_avgTime, p_bestGameTime) {
  document.getElementById("best_game_time").innerText = p_bestGameTime;
  document.getElementById("best_time").innerText = p_bestTime;
  document.getElementById("worst_time").innerText = p_worstTime;
  document.getElementById("avg_time").innerText = p_avgTime;
}


