/**
 * Homage to Vera Molnár.
 * (Des)Ordres, 1974
 * 
 * Converted to p5.js
 * @version 0.1
 * @license GPL Version 3 http://www.gnu.org/licenses/
 * 2021.05.02
 */

function setup() {
  
  createCanvas(640, 640);
  colorMode(HSB, 360.0, 100.0, 100.0, 100.0);
  rectMode(CENTER);
  // noLoop();

}

function draw() {
  let cols = 17;
  let rows = 17;
  
  // '2' means margin
  const cw = width / (cols + 2);
  const ch = height / (rows + 2);

  background(0.0, 0.0, 90.0, 100.0);
  translate(cw * 1.5, ch * 1.5);
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      drawCell(c * cw, r * ch, cw, ch);
    }
  }
}

/**
 * drawCell : draws randomly distorted rectangles.
 * @param {float} _cx - cell location x
 * @param {float} _cy - cell location y
 * @param {float} _cw - cell width
 * @param {float} _ch - cell height
 */
function drawCell(_cx, _cy, _cw, _ch) {
  const rectMax = 10;
  const distort = 0.1;
  let points = [];

  noFill();
  for (let rectCnt = 0; rectCnt < rectMax; rectCnt++) {
    // calculates corner points of the distorted rectangle
    const hW = (_cw * rectCnt * 0.5) / rectMax;
    const hH = (_ch * rectCnt * 0.5) / rectMax;
    points = [
      createVector(
        _cx - (1.0 + random(-1.0, 1.0) * distort) * hW,
        _cy - (1.0 + random(-1.0, 1.0) * distort) * hH
      ),
      createVector(
        _cx + (1.0 + random(-1.0, 1.0) * distort) * hW,
        _cy - (1.0 + random(-1.0, 1.0) * distort) * hH
      ),
      createVector(
        _cx + (1.0 + random(-1.0, 1.0) * distort) * hW,
        _cy + (1.0 + random(-1.0, 1.0) * distort) * hH
      ),
      createVector(
        _cx - (1.0 + random(-1.0, 1.0) * distort) * hW,
        _cy + (1.0 + random(-1.0, 1.0) * distort) * hH
      )
    ];

    stroke(0.0, 0.0, random(30.0, 90.0), 100.0);
    strokeWeight(random(2.0));
    beginShape();
    // you need five points to draw a rectangle with vertex
    // for the future in using curveVertex()
    for (let corner = 0; corner < 5; corner++) {
      vertex(points[corner % 4].x, points[corner % 4].y);
    }
    endShape();
  }
}
