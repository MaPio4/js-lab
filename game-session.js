class GameSession {
  constructor(p_rounds) {
    this.rounds = p_rounds;
    this.currentRound = null;
    this.currentRoundIndex = null;
    this.isFinished = false;
  } 

  start() {    //console.log("GameSession.start()")
    
    if(this.currentRound == null && this.rounds.length > 0) {
      console.log(`[INFO] Session has started -> ${this.rounds.length} rounds ahead!`);
      this.currentRoundIndex = 0;
      this.currentRound = this.rounds[this.currentRoundIndex];
      this.currentRound.start();      
      return true;
    }  
  }

  nextRound() {
    if(this.currentRoundIndex + 1 < this.rounds.length) {
      this.currentRoundIndex++;
      this.currentRound = this.rounds[this.currentRoundIndex];
      this.currentRound.start();      
      return true;
    }
    this.isFinished = true;
    onSessionFinished(this);    
    return false;
  }

  onClick() {
    if(this.isFinished) {
      console.log(`[INFO] Sessions is already finished. Start new session.`);
      return true;
    }
    if(this.currentRound.onClick()) {      
      return !this.nextRound();
    }
  }

  onSwitch() {
    this.currentRound.onSwitch();
  }

  getBestTime() {
    var time = Infinity;
    this.rounds.forEach(round => {
      if(round.isPlayed()) {
        if(round.getReactionTime() < time) {
          time = round.getReactionTime();
        }
      }
    });
    return time;
  }

  getWorstTime() {
    var time = 0.0;
    this.rounds.forEach(round => {
      if(round.isPlayed()) {        
        if(round.getReactionTime() > time) {          
          time = round.getReactionTime();
        }
      }
    });    
    return time;
  }

  getAvgTime() {
    var time = 0;
    var count = 0;
    this.rounds.forEach(round => {
      if(round.isPlayed()) {
        time += round.getReactionTime();
        count++;
      }
    });
    return time / count;
  } 

  getNumberOfEarlyClicks() {
    var value = 0;
    this.rounds.forEach(round => {
      if(round.isPlayed()) {
        value += round.earlyClicksCount;
      }
    })
    return value;
  }

  hasAnyData() {
    var hasData = false;
    this.rounds.forEach(round => {
      if(round.isPlayed()) {       
        hasData = true;
      }
    });    
    return hasData;
  }
}

