class GameManager {
  constructor(p_defaultPerSession, p_colorPicker) {
    this.currentSession = null;
    this.sessions = [];
    this.roundsPerSession = p_defaultPerSession;
    this.colorPicker = p_colorPicker;    
  }

  setRoundsPerSession(p_value) {
    this.roundsPerSession = p_value;
  }

  generateNewSession() {
    if(this.currentSession != null && !this.currentSession.isFinished) {
      console.log(`[INFO] Cannot start new session. Current session is in pogress.`);
      return false;
    } 
    var rounds = [];
    for(let i = 0; i < this.roundsPerSession; i++) {
      var color = this.colorPicker.getColor();
      var delay = (Math.random() * (MAX_ROUND_TIME - MIN_ROUND_TIME) + MIN_ROUND_TIME) * 1000;
      rounds.push(new GameRound(color, delay));
    }
    var newSession = new GameSession(rounds);   
    this.sessions.push(newSession);
    this.currentSession = newSession;
    return true;
  }

  startSession() {
    if(this.generateNewSession()) {
      this.currentSession.start();
      return true;
    };    
  }

  stop() {
    if(this.currentSession == null) {
      return false;
    }
    this.sessions.splice(this.sessions.indexOf(this.currentSession), 1);
    this.currentSession = null;
    console.log(`[INFO] Stopped the session. ${this.sessions.length}`);
    return true;
  }

  onClick() {
    if(this.currentSession == null) {
      return;
    }
    if(this.currentSession.onClick()) {
      this.currentSession = null;     
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
