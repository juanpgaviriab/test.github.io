let atractor = [];
let atractor_gen;
let atra_num = 1;
let ave_num = 2772;
let atractor1;
let atractor2;
let ms = [];
let data_x;
let data_y;
let barra;
let reset;
let inp;
let submit;
let all;
let force2;
var aveSin = 0;
let escala = 0;
let aves_barra;
let cond = true;
let plus;
var socket;


function setup() {
  createCanvas(windowWidth, windowHeight);
  startSketch();
  reset = createButton('reset');
  reset.mousePressed(startSketch);
  reset.style('background-color: black; color: white;');
    //reset.mouseOut(()=>css_b.style('background-color: #D6B5DD;'));
  submit = createButton('Ave');
  submit.mousePressed(sub);
  all = createButton('all');
  all.mousePressed(todos);
  inp = createInput(0);
  inp.size(30);
//sockets
socket = io.connect('http://localhost:3000');

}

function startSketch(){
  atractor1 = new Atractor(windowWidth/2,windowHeight/2,20,100);
  for (let i = 0; i < ave_num; i++) {
    ms[i] = new Aves(2,i); // append snowflake object
  }
  atractor_gen = new Atractores();
  barra = new Bar(ave_num);

}

function sub(){
  aveSin = int(inp.value()) - 1;
  ave_num = int(inp.value());
  cond = false;
  //aveSin = aveSin - aves_barra;
  //ave_num = ave_num + aves_barra;
}
function todos(){
  aveSin = 0;
  ave_num = 2772;
  cond = true;
}

function draw() {
  background(255);
  reset.position(windowWidth -70, windowHeight - 30);
  submit.position(windowWidth -120, windowHeight - 30);
  inp.position(windowWidth -160, windowHeight - 30);
  all.position(windowWidth -200, windowHeight - 30);

  barra.display(mouseX,mouseY);
  barra.drag();
  barra.limit();
  if (cond === true){
    plus = map(barra.positionBar.y,25,windowHeight - 25,2771,0);
  }else{
    plus = 0;
  }
  //plus = map(barra.positionBar.y,25,windowHeight - 25,100,0);
  //ave_num = ave_num + plus;
  for (let i = aveSin; i < ave_num - plus; i++) {
    force2 = atractor1.attract(ms[i],10);
    //let force3 = atractor2.attract(ms[i],10);
    //   for (let j = 0; j < atra_num; j++) {
    //   force2 = atractor[j].attract(ms[j],10);
    // }
    ms[i].applyforce(force2);
    //ms[i].applyforce(force3);
    for (let j = 0; j < atractor_gen.atractores.length; j++) {
      ms[i].applyforce(atractor_gen.atractores[j].attract(ms[i],10));  // Pasar la lista entera de boids a cada boid de forma individual
    }

    ms[i].update();
      ms[i].display(i);
  }
  atractor_gen.run();
  //atractor_gen.drag();
  //atractor_gen.hover(mouseX, mouseY);
  //atractor2.show();
  //atractor2.drag();
  //atractor2.hover(mouseX, mouseY);
  atractor1.show();
  atractor1.drag();
  atractor1.hover(mouseX, mouseY);


}

function mousePressed() {
  atractor1.clicked(mouseX, mouseY);
  //atractor2.clicked(mouseX, mouseY);
  for (let i = 0; i < atractor_gen.atractores.length; i++) {
    atractor_gen.atractores[i].clicked(mouseX, mouseY);  // Pasar la lista entera de boids a cada boid de forma individual
  }
  barra.clicked(mouseX,mouseY);
}

function mouseReleased() {
  atractor1.stopDragging();
  //atractor2.stopDragging();
  for (let i = 0; i < atractor_gen.atractores.length; i++) {
    atractor_gen.atractores[i].stopDragging();  // Pasar la lista entera de boids a cada boid de forma individual
  }
  barra.stopDragging();
}

function keyPressed(){
if (keyCode === ENTER) {
atractor_gen.addAtractor(new Atractor(mouseX, mouseY,20));
}
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
