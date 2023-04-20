class GameRound {
  constructor(p_color, p_delay) {    
    this.awaitingForClick = null;
    this.color = p_color;
    this.delay = p_delay;
    this.startTime = null;
    this.colorChangeTime = null;
    this.clickedTime = null;
    this.earlyClicksCount = null;
  }

  start() {    
    this.startTime = performance.now();
    this.awaitingForClick = false;  
    startNextRound(this.delay);    
    this.earlyClicksCount = 0;
    console.log(`[INFO] Round has started - color:${this.color}`)
  }

  changeColor() {
    this.colorChangeTime = performance.now();
    this.awaitingForClick = true;
    setGameFieldColor(this.color);
    console.log(`[INFO] Color changed, timer is ON!!!`);
  }

  onClick() {    
    if(!this.awaitingForClick) {
      console.log("[INFO] Agr! Clicked too early!")
      this.earlyClicksCount++;
      return false;
    }    
    this.clickedTime = performance.now();
    console.log(`[INFO] Good catch, time: ${this.getReactionTime()}`)    
    onRoundFinished(this);
    return true;
  }

  onSwitch() {
    this.changeColor();
  }

  getReactionTime() {
    return this.clickedTime - this.colorChangeTime;
  }

  isPlayed() {
    return this.clickedTime == null ? false : true;
  }
}

var roundTimeout = null;
const startNextRound = function(p_time) {
  killNextRoundTimeout();  
  roundTimeout = setTimeout(changeFieldColor, p_time, gameManager);
}

const killNextRoundTimeout = function() {
  if(typeof roundTimeout == 'number') {
    clearTimeout(roundTimeout);
  }
}



