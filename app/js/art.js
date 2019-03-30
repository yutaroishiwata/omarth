"use strict";

var tracker;
var w = 400,
    h = 400;
var capture;
var canvas;
var pg; //特徴量用キャンバス

var angle = 0; // 角度255

function setup() {
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function () {
    console.log('capture ready.');
  });
  capture.elt.setAttribute('playsinline', '');
  capture.elt.setAttribute('autoplay', '');
  capture.elt.setAttribute('muted', ''); //あとでjqueryで書き直し

  capture.parent('capture');
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');
  pg = createGraphics(w, h); //createGraphicsはimage関数を利用してcreateCanvasの上に配置される

  pg.parent('pg');
  capture.size(w / 2, h / 2); //positionはここの座標を元に生成される。createGraphicsに描画する場合半分の値にする必要がる。

  capture.hide();
  colorMode(HSB);
  stroke(0);
  frameRate(14);
  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  translate(width / 2, height / 2);
  background(255);
  image(pg, w / -2, h / -2, w, h); //createGraphics中央配置
  //image(capture, w/-2, h/-2, w, h);

  pg.background(255);
  var positions = tracker.getCurrentPosition();
  pg.noStroke(); //特徴点の座標にポイントと番号を配置

  for (var i = 0; i < positions.length; i++) {
    pg.fill(204);
    pg.ellipse(positions[i][0], positions[i][1], 2, 2); //座標を62番を基準に再計算

    var arrayRecalc = [];
    var recalc0, recalc1;

    if (positions[62][0] > positions[i][0]) {
      recalc0 = positions[62][0] - positions[i][0];
    } else {
      recalc0 = positions[i][0] - positions[62][0];
    }

    if (positions[62][1] > positions[i][1]) {
      recalc1 = positions[62][1] - positions[i][1];
    } else {
      recalc1 = positions[i][1] - positions[62][1];
    }

    arrayRecalc[i] = [Math.round(recalc0), Math.round(recalc1)]; //console.log(arrayRecalc);
  } //アート生成関数


  linesArcCW(250, recalc0 * 4, 1.2, 2);
  linesArcCCW(230, recalc1 * 4, 1.2, 2);
  linesArcCW(210, recalc0 * 2, 1.2, 2);
  linesArcCCW(190, recalc1 * 2, 1.2, 2);
  linesArcCW(150, recalc0 * 2, 1.5, 3);
  linesArcCCW(100, recalc1 * 2, 1.5, 3);
} //時計回り


function linesArcCW(r, li, le, s) {
  push();
  var r; //半径

  var li; //線の本数

  var le; //線の本数

  var s; //線の描画間隔

  for (var i = 0; i < li; i++) {
    var sX = sin(radians(angle + i * s)) * r; //始点X座標

    var sY = cos(radians(angle + i * s)) * -r; //終点Y座標

    var eX = sin(radians(angle + i * s)) * r * le; //終点X座標

    var eY = cos(radians(angle + i * s)) * -r * le; //終点Y座標

    line(sX, sY, eX, eY);
  }

  pop();
  angle += 0.5; //回転速度
} //半時計回り


function linesArcCCW(r, li, le, s) {
  push();
  var r; //半径

  var li; //線の本数

  var le; //線の本数

  var s; //線の描画間隔

  for (var i = 0; i < li; i++) {
    var sX = sin(radians(angle + i * s)) * r; //始点X座標

    var sY = cos(radians(angle + i * s)) * r; //終点Y座標

    var eX = sin(radians(angle + i * s)) * r * le; //終点X座標

    var eY = cos(radians(angle + i * s)) * r * le; //終点Y座標

    line(sX, sY, eX, eY);
  }

  pop();
  angle += 0.5; //回転速度
}