let actRandomSeed = 0;
let count = 110;
let nodes = [];
let drawMode = 1;
let maxLength = 120;

function setup() {
  createCanvas(800, 800);
  pixelDensity(2);
  noStroke();

  for (let i = 0; i < count; i++) {
    nodes[i] = new Node();
  }
}

function draw() {
  randomSeed(actRandomSeed);

  if (drawMode === 1) background(255, 245, 245);
  if (drawMode === 2) background(245, 255, 245);
  if (drawMode === 3) background(245, 245, 255);

  for (let i = 0; i < count - 1; i++) {
    let thisNode = nodes[i];
    for (let j = 0; j < count; j++) {
      let otherNode = nodes[j];
      drawLine(thisNode, otherNode);
    }
  }

  for (let i = 0; i < count; i++) {
    nodes[i].run();
  }
}

function drawLine(n1, n2) {
  let distance = dist(n1.position.x, n1.position.y, n2.position.x, n2.position.y);
  if (distance <= maxLength) {
    strokeWeight(0.8);
    stroke(0);
    line(n1.position.x, n1.position.y, n2.position.x, n2.position.y);
  }
}

function mousePressed() {
  for (let i = 0; i < count; i++) {
    nodes[i] = new Node();
  }
  actRandomSeed = int(random(10000));
}

function keyPressed() {
  if (key === '1') drawMode = 1;
  if (key === '2') drawMode = 2;
  if (key === '3') drawMode = 3;
}

//------------------------------------------------------------------

class Node {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.ellipseSize = random(10, 55);
  }

  run() {
    this.display();
    this.update();
  }

  display() {
    if (drawMode === 1) fill(255, random(255), random(255));
    if (drawMode === 2) fill(random(255), 255, random(255));
    if (drawMode === 3) fill(random(255), random(255), 255);
    stroke(0);
    strokeWeight(2);
    ellipse(this.position.x, this.position.y, this.ellipseSize, this.ellipseSize);
  }

  update() {
    this.position.add(this.velocity);
    this.checkHitWall();
  }

  checkHitWall() {
    if (this.position.x < 0 + this.ellipseSize / 2) {
      this.velocity.x *= -1;
      this.position.x = 0 + this.ellipseSize / 2;
    } else if (this.position.x > width - this.ellipseSize / 2) {
      this.velocity.x *= -1;
      this.position.x = width - this.ellipseSize / 2;
    } else if (this.position.y < 0 + this.ellipseSize / 2) {
      this.velocity.y *= -1;
      this.position.y = 0 + this.ellipseSize / 2;
    } else if (this.position.y > height - this.ellipseSize / 2) {
      this.velocity.y *= -1;
      this.position.y = height - this.ellipseSize / 2;
    }
  }
}