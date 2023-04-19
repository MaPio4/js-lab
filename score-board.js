class ScoreBoard {
  constructor(p_manager) {
    this.gameManager = p_manager;
  }

  update() {
    if(this.gameManager.currentSession == null) {
      return;
    }
    var bestGameTime = this.gameManager.getBestGameTime();
    var bestTime = this.gameManager.currentSession.getBestTime();
    var worstTime = this.gameManager.currentSession.getWorstTime();
    var avgTime = this.gameManager.currentSession.getAvgTime();    
    updateScoreBoard(bestTime, worstTime, avgTime, bestGameTime);

  }  
}

const updateScoreBoard = function(p_bestTime, p_worstTime, p_avgTime, p_bestGameTime) {
  document.getElementById("best_game_time").innerText = p_bestGameTime;
  document.getElementById("best_time").innerText = p_bestTime;
  document.getElementById("worst_time").innerText = p_worstTime;
  document.getElementById("avg_time").innerText = p_avgTime;
}


