let atractor = [];
let atra_num = 1;
let ave_num = 2772;
let atractor1;
let atractor2;
let ms = [];
let data_x;
let data_y;

function preload() {
  data_x = loadStrings('listas/lista_x.txt');
  data_y = loadStrings('listas/lista_y.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  atractor1 = new Atractor(windowWidth/2,windowHeight/2,20);
  atractor2 = new Atractor(random(windowWidth/2 - 100,windowWidth/2 + 100),random(windowHeight/2 - 100,windowHeight/2 + 100),20);
  for (let i = 0; i < ave_num; i++) {
    ms[i] = new Aves(2,i); // append snowflake object
  }

}

function draw() {
  background(255);
  for (let i = 0; i < ave_num; i++) {
    let force2 = atractor1.attract(ms[i],10);
    let force3 = atractor2.attract(ms[i],10);
  //   for (let j = 0; j < atra_num; j++) {
  //   force2 = atractor[j].attract(ms[j],10);
  // }
    ms[i].applyforce(force2);
    ms[i].applyforce(force3);
    ms[i].update();
    //ms.edge();
    ms[i].display(i);
  }
  atractor2.show();
  atractor2.drag();
  atractor2.hover(mouseX, mouseY);
  atractor1.show();
  atractor1.drag();
  atractor1.hover(mouseX, mouseY);
}

function mousePressed() {
  atractor1.clicked(mouseX, mouseY);
  atractor2.clicked(mouseX, mouseY);
}

function mouseReleased() {
  atractor1.stopDragging();
  atractor2.stopDragging();
}

function Atractor(x,y,m) {
  this.x = x;
  this.y = y;
  this.mass = m;
  this.position = createVector(this.x, this.y);
  this.g = 5;
  this.dragging = false;
  this.rollover = false;
  this.dragOffset = createVector(0,0);
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

function Aves(r,conteo){
  let conteo_num = int(conteo);

  // if ((conteo_num == data_x.length)&&(conteo_num == data_y.length)) {
  //   conteo_num = 0;
  // }

  this.r = r;
  this.coox = random(atractor1.position.x - 100, atractor1.position.x + 100);
  this.cooy = random(atractor1.position.y - 100, atractor1.position.y + 100);
  this.loc = createVector(this.coox,this.cooy);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.n;
  this.mass = 1;
  this.radius = this.r;
  //conteo_num++;
  console.log(conteo_num);
  //console.log(data_X[2]);
}

Aves.prototype.applyforce = function(force) {
  this.force = force;
  this.f = p5.Vector.div(this.force, this.mass);
  this.acc.add(this.f);
}

Aves.prototype.update = function() {
  this.vel.add(this.acc);
  this.loc.add(this.vel);
  this.acc.mult(0);
  this.n ++;
  // vel.limit(5);
}


Aves.prototype.edge = function() {
  //limitar el espacio sin salir

  if (this.loc.x > width) {
    this.loc.x = width;
    this.vel.x *= -1;
  } else if (this.loc.x < 0) {
    this.vel.x *= -1;
    this.loc.x = 0;
  }

  if (this.loc.y > height) {
    this.vel.y *= -1;
    this.loc.y = height;
  }
}
Aves.prototype.display = function(n) {
  this.n = n;
  stroke(0);
  this.col = dist(this.loc.x,this.loc.y,atractor1.position.x,atractor1.position.y);
  fill(this.col);
  ellipse(this.loc.x, this.loc.y, this.radius*2, this.radius*2);
  fill(this.col);
  textSize(9);
  text(this.n + 1,this.loc.x - 5, this.loc.y - 13);
}
