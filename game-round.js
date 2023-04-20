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
    this.startTime = readTime();
    this.awaitingForClick = false; 
    this.earlyClicksCount = 0;

    startNextRound(this.delay); 
    console.log(`[INFO] Round has started - color:${this.color}`)
  }

  changeColor() {
    this.colorChangeTime = readTime();
    this.awaitingForClick = true;

    setGameFieldColor(this.color);
    console.log(`[INFO] Color changed, timer is ON!!!`);
  }

  onClick() {    
    if(!this.awaitingForClick) {      
      this.earlyClicksCount++;
      console.log("[INFO] Agr! Clicked too early!");
      return false;
    }    
    this.clickedTime = readTime();       
    onRoundFinished(this);

    console.log(`[INFO] Good catch, time: ${this.getReactionTime()}`);
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

// Related functions:
const startNextRound = function(p_time) {
  killNextRoundTimeout();  
  roundTimeout = setTimeout(changeFieldColor, p_time, gameManager);
}

const killNextRoundTimeout = function() {
  if(typeof roundTimeout == 'number') {
    clearTimeout(roundTimeout);
  }
}
