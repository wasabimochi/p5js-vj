/*
 * main
*/

let count = 0; //カウント変数
let countPer = 1;// カウントの数
let isStartAudio = false; // 音声入力の許可
let fps = 30; // フレームレート
let sceneChangeTime = 3; // シーン切り替えまでの秒数
let sceneNum = 1; // 現在表示されているシーン
let firstSceneNum = 1; // 初期シーン
let lastSceneNum = 4; // 最終シーン
let pauseFlg = false; // ポーズシーン表示フラグ
let isGlitching = false; // グリッチ表示フラグ
let isDebugging = false; // 開発用画面表示
let glitchVolLevel = 0.1; // グリッチ表示閾値
let isVolumeLevelGlitch = true; // 音量レベルに応じてグリッチ表示のフラグ
// 音声入力系
let mic; // マイク入力
let fft;
let smoothing = 0.8; // play with this, between 0 and .99
let binCount = 1024; // size of resulting FFT array. Must be a power of 2 between 16 an 1024
let fontAntonRegular;
function preload() {
  console.log('preload');
  // scenePauseVideoPreload();
  fontAntonRegular = loadFont('./common/assets/fonts/Anton-Regular.ttf');
}

function setup() {
  frameRate(fps); // フレームレート設定
  rectMode(CENTER); // 描画中心点
  imageMode(CENTER); // 画像中心点
  // マイク入力取得
  mic = new p5.AudioIn();
  fft = new p5.FFT(smoothing, binCount);
  fft.setInput(mic);

  sceneGlitchSetup(); // グリッチ描画兼メインキャンバス
  scenePauseDiningBar1973Setup(); // 1973 ポーズ画面 セットアップ
  scenePause293StudiosBankSetup(); // connect 293 ポーズ画面 セットアップ
  audioFlockSetup(); // audio flock 描画用グラフィック
  // scenePauseVideoSetup();
}

async function draw() {
  background(0);
  if (pauseFlg == false) {
    // 一定時間経過でシーン切り替え
    setSceneTime();
    sceneChangerTimer();
    switch (sceneNum) {
      case 1:
        audioFlockDraw();
        break;
      case 2:
        scenePause293StudiosBankDraw();
        break;
      case 3:
        audioFlockDraw();
        break;
      case 4:
        scenePauseDiningBar1973Draw();
        break;
      default:
        scenePause293StudiosBankDraw();
        break;
    }
  } else {
    scenePause293StudiosBankDraw();
  }
  // 開発用画面表示
  if (isDebugging == true) {
    // audioFlockDraw();
  }
  // 音量に応じてグリッチ表示切り替え
  if(isVolumeLevelGlitch == true) {
    volumeLevelGlitchChanger();
  }
  // グリッチ強制表示
  if (isGlitching == true) {
    sceneGlitchDraw();
  }

}

// 画面を触ったときにマイクの音声の取得を許可させる
async function touchStarted() {
  if (!isStartAudio) {
    await userStartAudio();
    mic.start();
    isStartAudio = true;
  }
}

// マイクレベルでグリッチ表示切り替え
function volumeLevelGlitchChanger() {
  let volLevel = mic.getLevel();
  if(volLevel >= glitchVolLevel) {
    isGlitching = true;
  } else {
    isGlitching = false;
  }
}

// 時間経過でシーン切り替え判定
function sceneChangerTimer() {
  //変数count+1(1フレーム毎)
  count += countPer;
  // 今のfps * 秒数
  if (count >= fps * sceneChangeTime) {
    // 最終シーンを表示している場合初期シーンに戻す
    if (sceneNum == lastSceneNum) {
      sceneNum = firstSceneNum;
    } else {
      // 次のシーンへ遷移
      sceneNum += 1;
    }
    // 経過時間をリセット
    count = 0;
  }
}
// シーンごとに描画時間を切り替え
function setSceneTime() {
  switch (sceneNum) {
    case 1:
      sceneChangeTime = 15;
      break;
    case 2:
      sceneChangeTime = 1;
      break;
    case 3:
      sceneChangeTime = 15;
      break;
    case 4:
      sceneChangeTime = 1;
      break;
  }
}

// キー入力で画面切り替え
function keyPressed() {
  switch (key) {
    case '1':
      clear();
      sceneNum = 1;
      count = 0;
      break;
    case '2':
      clear();
      sceneNum = 2;
      count = 0;
      break;
    case '3':
      clear();
      sceneNum = 3;
      count = 0;
      break;
    case '4':
      clear();
      sceneNum = 4;
      count = 0;
      break;
    case 'g':
      isGlitching = !isGlitching;
      break;
    case 'd':
      isDebugging = !isDebugging;
      break;
    case 'v':
      isVolumeLevelGlitch = !isVolumeLevelGlitch;
      break;
    case 'Enter':
      clear();
      pauseFlg = !pauseFlg;
      break;
    default:
      break;
  }
}
