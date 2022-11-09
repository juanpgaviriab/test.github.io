
function Atractores(){
  this.atractores = [];
}
Atractores.prototype.run = function() {
  for (let i = 0; i < this.atractores.length; i++) {
    this.atractores[i].run(this.atractores);  // Pasar la lista entera de boids a cada boid de forma individual
  }
}
Atractores.prototype.addAtractor = function(ac) {
  this.atractores.push(ac);
}

function Atractor(x,y,m,g) {
  this.x = x;
  this.y = y;
  this.mass = m;
  this.position = createVector(this.x, this.y);
  this.g = g; //5
  this.dragging = false;
  this.rollover = false;
  this.dragOffset = createVector(0,0);
}

Atractor.prototype.run = function(atractores) {
  this.show();
  this.drag();
  this.hover(mouseX,mouseY);
}

Atractor.prototype.attract = function(a,act){
  this.a = a;
  this.act = act;
  let force = p5.Vector.sub(this.position,this.a.loc);   // Calculate direction of force
  this.d = force.mag();                              // Distance between objects
  this.d1 = constrain(this.d,100,102);                        // Limiting the distance to eliminate "extreme" results for very close or very far objects
  force = force.normalize();                                  // Normalize vector (distance doesn't matter here, we just want this vector for direction)
  this.strength = (this.g * this.mass * this.a.mass) / (this.d1 * this.d1);      // Calculate gravitional force magnitude
  force = force.mult(this.strength*this.act);
  //console.log(this.force);                                  // Get force vector --> magnitude * direction
  return force;
}

Atractor.prototype.show = function(){
  ellipseMode(CENTER);
  stroke(0);
  if (this.dragging) {
    fill(0,0,255);
  } else if (this.rollover) {
    fill(255);
  } else {
    fill(255,100);;
  }
  ellipse(this.position.x,this.position.y,20,20);
}

Atractor.prototype.clicked = function(mcx, mcy) {
  this.mx1 = mcx;
  this.my1 = mcy;
  this.d1 = dist(this.mx1,this.my1,this.position.x,this.position.y);
  if (this.d1 < this.mass) {
    this.dragging = true;
    this.dragOffset.x = this.position.x-this.mx1;
    this.dragOffset.y = this.position.y-this.my1;
  }
}

Atractor.prototype.hover = function(mhx, mhy) {
  this.mx = mhx;
  this.my = mhy;
  this.d = dist(this.mx,this.my,this.position.x,this.position.y);
  if (this.d < this.mass) {
    this.rollover = true;
  }
  else {
    this.rollover = false;
  }
}

Atractor.prototype.stopDragging = function() {
  this.dragging = false;
}

Atractor.prototype.drag = function() {
  if (this.dragging) {
    this.position.x = mouseX + this.dragOffset.x;
    this.position.y = mouseY + this.dragOffset.y;
  }
}
