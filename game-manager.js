class GameManager {
  constructor() {
    this.currentSession = null;
    this.sessions = [];
  }

  generateNewSession() {
    if(this.currentSession != null && !this.currentSession.isFinished) {
      console.log(`[INFO] Cannot start new session. Current session is in pogress.`);
      return false;
    } 
    var rounds = [];
    for(let i = 0; i < NUMBER_OF_ROUNDS_PER_SESSION; i++) {
      var randomColor = Math.floor(Math.random()*16777215).toString(16);
      var delay = (Math.random() * (MAX_ROUND_TIME - MIN_ROUND_TIME) + MIN_ROUND_TIME) * 1000;
      rounds.push(new GameRound(randomColor, delay));
    }
    var newSession = new GameSession(rounds);   
    this.sessions.push(newSession);
    this.currentSession = newSession;
    return true;
  }

  startSession() {
    //console.log("GameManager.startSession()")
    if(this.generateNewSession()) {
      this.currentSession.start();
    };   
    
  }

  onClick() {
    if(this.currentSession == null) {
      return;
    }
    if(this.currentSession.onClick()) {
      //console.log("Session is finished!");      
    }
  }

  onSwitch() {
    this.currentSession.onSwitch();
  }

  getBestGameTime() {
    var time = Infinity;
    this.sessions.forEach(session => {     
      if(session.getBestTime() < time) {
        time = session.getBestTime();
      }      
    });
    return time;
  }
}

var roundTimeout = null;
const changeFieldColor = function(p_manager) {
  p_manager.onSwitch();
}
