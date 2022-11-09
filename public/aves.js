
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
  this.bn = map(this.loc.x, 0, windowWidth,0,255);
  this.nb = map(this.loc.y, 0, windowHeight,0,255);
  fill(this.bn);
  ellipse(this.loc.x, this.loc.y, this.radius*2, this.radius*2);
  fill(this.nb);
  textSize(9);
  text(this.n + 1,this.loc.x - 5, this.loc.y - 13);
}
