float blackX;
float blackY;

float whiteX;
float whiteY;

void setup() {
  size(200, 100);
  
  blackX = width*.25;
  blackY = height/2;

  whiteX = width*.75;
  whiteY = height/2;

  background(128);
  
  frameRate(1000);
}

void draw() {

  stroke(0);
  
  blackX += random(-1, 1);
  blackY += random(-1, 1);
    
  if(blackX < 0){
    blackX = width;
  }
  if(blackX > width){
    blackX = 0;
  }

  if(blackY < 0){
    blackY = height;
  }
  if(blackY > height){
    blackY = 0;
  }
  
  point(blackX, blackY);

  stroke(255);
  
  whiteX += random(-1, 1);
  whiteY += random(-1, 1);
  
  if(whiteX < 0){
    whiteX = width;
  }
  if(whiteX > width){
    whiteX = 0;
  }
  
  if(whiteY < 0){
    whiteY = height;
  }
  if(whiteY > height){
    whiteY = 0;
  }  
  
  point(whiteX, whiteY);
  
}