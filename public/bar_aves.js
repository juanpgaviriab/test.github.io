function Bar(aves){
  this.positionBar = createVector(0,windowHeight - 25);
  this.draggingBar = false;
  this.dragOffsetBar = createVector(0,0);
}

Bar.prototype.display = function() {
  //rectMode(CENTER);
  //stroke(100);
  fill(0,10);
  rect(13,9,24, windowHeight - 23);
  ellipseMode(CENTER);
  fill(200);
  ellipse(25,this.positionBar.y,20,20);
}


Bar.prototype.clicked = function(mcx,mcy) {
  this.mx1 = mcx;
  this.my1 = mcy;
  this.d1 = dist(this.mx1,this.my1,this.positionBar.x,this.positionBar.y);
  if (this.d1 < 30){
    if((this.my1 >= 10)&&(this.my1 <= windowHeight - 25)){
      this.draggingBar = true;
       this.dragOffsetBar.y = this.positionBar.y-this.my1;
      }
  }
}

Bar.prototype.stopDragging = function() {
  this.draggingBar = false;
}

Bar.prototype.drag = function() {
  if (this.draggingBar) {
   this.positionBar.y = mouseY + this.dragOffsetBar.y;
  }
}

Bar.prototype.limit = function() {
  if(this.positionBar.y <= 20){
    this.positionBar.y = 20;
  }
  if(this.positionBar.y >= windowHeight - 25){
    this.positionBar.y = windowHeight - 25;
  }
}
