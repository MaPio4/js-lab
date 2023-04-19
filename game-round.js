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
    //console.log("GameRound.start()")
    this.startTime = performance.now();
    this.awaitingForClick = false;  
    startNextRound(this.delay);    
    this.earlyClicksCount = 0;
    console.log(`[INFO] Round has started`)

  }

  changeColor() {
    //change color
    //console.log("GameRound.changeColor()")
    this.colorChangeTime = performance.now();
    this.awaitingForClick = true;
    document.getElementById("reaction_field").style ="background-color = " +this.color;
    console.log(`[INFO] Color changed, timer is ON!!!`);
  }

  onClick() {
    //console.log(`GameRound.onClick() -> aweaiting:${this.awaitingForClick}`);
    if(!this.awaitingForClick) {
      console.log("[INFO] Agr! Clicked too early!")
      this.earlyClicksCount++;
      return false;
    }    
    this.clickedTime = performance.now();
    console.log(`[INFO] Good catch, time: ${this.getReactionTime()}`)    
    onRoundFinished();
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

const startNextRound = function(p_time) {
  if(typeof roundTimeout == 'number') {
    clearTimeout(roundTimeout);
  }
  //console.log(`startNextRound(${p_time}`)
  roundTimeout = setTimeout(changeFieldColor, p_time, gameManager);
}

const onRoundFinished = function() {
  scoreBoard.update();
}