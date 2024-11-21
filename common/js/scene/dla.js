class Point {
    constructor(_x, _y, _hue) {
      this.x = _x;
      this.y = _y;
      this.h = _hue % 360.0;
    }
  }
  
  function setup() {
    createCanvas(720, 720);
    colorMode(HSB, 360.0, 100.0, 100.0, 100.0);
    smooth();
    noLoop();
  }
  
  function draw() {
    const plotMax = 7200;
    const frmMax = 24 * 1;
    const walkMax = height * 2;
    const pSize = 4.0;
    let pHue = random(360.0);
    const initDiv = random(0.1, 0.4);
  
    let cluster = [];
  
    for (let i = 0.0; i < 1.0; i += initDiv) {
      cluster.push(new Point(
        0.2 * width * cos(TWO_PI * i),
        0.2 * height * sin(TWO_PI * i),
        pHue
      ));
    }
  
    translate(width * 0.5, height * 0.5);
    rotate(random(TWO_PI));
  
    let entryR = 1.0; // entryRadius
    for (let plotCnt = 0; plotCnt < plotMax; plotCnt++) {
      // complex rhythm
      entryR += entryR;
      entryR = entryR % TWO_PI;
  
      let p = new Point(
        width * cos(entryR),
        height * sin(entryR),
        pHue
      );
      for (let walkCnt = 0; walkCnt < walkMax; walkCnt++) {
        // walk to the center
        p.x -= cos(entryR);
        p.y -= sin(entryR);
  
        if (checkCollision(cluster, p, pSize)) {
          cluster.push(p);
          pHue += 0.015;
          break;
        }
      }
  
      if (plotCnt % floor(plotMax / frmMax) === 0) {
        background(0.0, 0.0, 90.0, 100.0);
        drawCluster(cluster, pSize);
        saveCanvas(`frames/0.${String(plotCnt).padStart(5, '0')}`, 'png');
      }
    }
  
    // draw the final frame
    background(0.0, 0.0, 90.0, 100.0);
    drawCluster(cluster, pSize);
    saveCanvas('frames/1.00000', 'png');
    noLoop();
  }
  
  function drawCluster(_cluster, _size) {
    let eSat = 40.0;
    let eBri = 60.0;
    noStroke();
    for (let p of _cluster) {
      eSat += 0.009;
      eBri -= 0.003;
  
      fill(p.h, eSat, eBri, 100.0);
      ellipse(p.x, p.y, _size, _size);
    }
  }
  
  function checkCollision(_cluster, _p, _size) {
    for (let p of _cluster) {
      if (dist(p.x, p.y, _p.x, _p.y) < _size * 1.0) {
        return false;
      }
    }
  
    for (let p of _cluster) {
      if (dist(p.x, p.y, _p.x, _p.y) < _size * 1.2) {
        return true;
      }
    }
    return false;
  }