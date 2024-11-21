/**
 * 293 Studios Bank ポーズ画面表示
 */

let scenePause293StudiosBankLayer;

function scenePause293StudiosBankSetup(){
    scenePause293StudiosBankLayer = createGraphics(width, height);
}

function scenePause293StudiosBankDraw() {
    scenePause293StudiosBankLayer.background(255);
    scenePause293StudiosBankLayer.fill(0);
    scenePause293StudiosBankLayer.textAlign(CENTER);
    scenePause293StudiosBankLayer.textSize(128);
    scenePause293StudiosBankLayer.textFont(fontAntonRegular);
    scenePause293StudiosBankLayer.text('CONNECT 293', windowWidth / 2 , windowHeight / 2);
    image(scenePause293StudiosBankLayer, width / 2, height / 2 );
}