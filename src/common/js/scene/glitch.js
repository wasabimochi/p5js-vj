let sceneGlitchCanvas;
let sceneGlitch;
let noiseScale = 0.02;

function sceneGlitchSetup() {
    noiseSeed();
    sceneGlitchCanvas = createCanvas(windowWidth ,windowHeight);
    sceneGlitch = new Glitch();
    sceneGlitch.pixelate(1);
    sceneGlitch.errors(false);
}

function sceneGlitchDraw() {
    const noiseValue = noise(frameCount * noiseScale * random());
    sceneGlitch.loadImage(sceneGlitchCanvas);
    sceneGlitch.limitBytes(noiseValue);
    sceneGlitch.randomBytes(noiseValue);
    sceneGlitch.buildImage();
    // イメージ,x座標 , y座標, サイズw,サイズy
    image(sceneGlitch.image, windowWidth / 2 ,windowHeight / 2 ,width ,height);
}