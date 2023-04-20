class ColorPicker {
  constructor(p_availableColors) {
    this.availableColors = p_availableColors;
    this.previousColor = null;
  }

  getColor() {
    var index = Math.round((Math.random() * ((this.availableColors.length - 1) - 0)));
    var nextColor = this.availableColors[index];
    if(this.previousColor == null) {      
      this.previousColor = nextColor;
      return nextColor;
    }
    
    while(nextColor == this.previousColor ) {
      index = Math.round((Math.random() * ((this.availableColors.length - 1) - 0)));
      nextColor = this.availableColors[index];
    }
    this.previousColor = nextColor;
    return nextColor;
  }
}