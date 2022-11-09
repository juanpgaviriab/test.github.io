var socket;


function setup() {
  createCanvas(500, 500);
  background(0);
//sockets
socket = io.connect('http://localhost:3000');
socket.on('mouse', newDrawing);
}

function draw() {

}

function newDrawing(data){
  noStroke();
  fill(255,0,0);
  ellipse(data.x,data.y,30,30);

}

function mouseDragged() {
  console.log('Sending: ' + mouseX + ',' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY
  }
 socket.emit('mouse',data);

 noStroke();
 fill(255);
 ellipse(mouseX,mouseY,30,30);

}
