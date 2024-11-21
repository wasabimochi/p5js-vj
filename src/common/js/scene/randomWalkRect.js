let looping = true;
let pSize;

function setup() {
	createCanvas(720, 480);
	strokeWeight(2);
	stroke(0);
	frameRate(1);

	pSize = min(width, height) / 9;
}

function draw() {
	background(240);
	translate(width * 0.5, height * 0.5);

	let pNo = 20 + (frameCount * 2) % 200;
	let pX = 0;
	let pY = 0;

	beginShape(TRIANGLE_STRIP);
	for (let i = 0; i < pNo; i++) {

		// random walk
		let direction = random(-1.0, 1.0);
		direction = direction == 0 ? 1.0 : direction / abs(direction);
		if (random(1.0) > 0.45) {
			pX += direction * pSize;
			fill(255);
		} else {
			pY += direction * pSize;
			fill(random(255), random(255), random(255));
		}

		// Don't go outside! Please don't go! Please! Please come back to me! Please...
		if (abs(pX) > width * 0.5) {
			pX -= direction * pSize;
		}
		if (abs(pY) > height * 0.5) {
			pY -= direction * pSize;
		}

		vertex(pX, pY);
	}
	endShape();

	// bonus
	fill(255);
	ellipse(pX, pY, 10.0, 10.0);

}

function mouseClicked() {
	if (looping) {
		looping = false;
		noLoop();
	} else {
		looping = true;
		loop();
	}
}