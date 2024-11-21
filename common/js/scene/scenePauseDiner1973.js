/**
 * Dining Bar 1973 ポーズ画面表示
 */

let scenePauseDiningBar1973Layer;

function scenePauseDiningBar1973Setup() {
    scenePauseDiningBar1973Layer = createGraphics(width, height);
}

function scenePauseDiningBar1973Draw() {
    scenePauseDiningBar1973Layer.background(255);
    scenePauseDiningBar1973Layer.fill(0);
    scenePauseDiningBar1973Layer.textAlign(CENTER);
    scenePauseDiningBar1973Layer.textSize(128);
    scenePauseDiningBar1973Layer.textFont('Impact');
    scenePauseDiningBar1973Layer.text('Dining Bar 1973', windowWidth / 2 , windowHeight / 2);
    image(scenePauseDiningBar1973Layer, width / 2, height / 2 );
}