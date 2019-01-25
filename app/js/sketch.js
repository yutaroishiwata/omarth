// https://kylemcdonald.github.io/cv-examples/
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2

var capture;
var tracker;
var w = 400,
    h = 450;
var pg;

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(windowWidth, windowHeight);
    pg = createGraphics(w, h); //createGraphicsはimage関数を利用してcreateCanvasの上に配置される
    capture.size(w/2, h/2); //positionはここの座標を元に生成される。createGraphicsに描画する場合半分の値にする必要がる。
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
}

function draw() {
  translate(width/2, height/2);
  background(255);
  image(pg, w/-2, h/-2, w, h); //createGraphics中央配置 
  pg.background(51);
  var positions = tracker.getCurrentPosition();

    /*
    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < ptions.length; i++) {
      vertex(positions[i][0], positions[i][1]);

    }
    endShape();
    console.log(positions);
    */
    pg.noStroke();
    //特徴点の座標にポイントと番号を配置
    for (var i = 0; i < positions.length; i++) {
      //fill(map(i, 0, positions.length, 0, 360), 50, 100);
      pg.fill(255);
      pg.ellipse(positions[i][0], positions[i][1], 2, 2);
      //text(i, positions[i][0], positions[i][1]);

      //座標を62番を基準に再計算
      var arrayRecalc = [];
      var recalc0, recalc1;

      if(positions[62][0] > positions[i][0]){
        recalc0 = positions[62][0] -  positions[i][0]
      } else{
        recalc0 = positions[i][0] -  positions[62][0]
      }

      if(positions[62][1] > positions[i][1]){
        recalc1 = positions[62][1] -  positions[i][1]
      } else{
        recalc1 = positions[i][1] -  positions[62][1]
      }

      arrayRecalc[i] = [Math.round(recalc0), Math.round(recalc1)];
      var test = mag(Math.round(recalc0), Math.round(recalc1))
      console.log(Math.round(test));

      /*
      for (var i = 0; i < round(recalc0); i++){
        ellipse(random(w), random(h), 4, 4);
      }
      */
    }

    /*
    if (positions.length > 0) {
      var mouthLeft = createVector(positions[44][0], positions[44][1]);
      var mouthRight = createVector(positions[50][0], positions[50][1]);
      var smile = mouthLeft.dist(mouthRight);
      //uncomment the line below to show an estimate of amount "smiling"
      rect(20, 20, smile * 3, 20);

      uncomment for a surprise
      noStroke();
      fill(0, 255, 255);
      ellipse(positions[62][0], positions[62][1], 50, 50);
      for (var i = 0; i < )
    }
    */

    //lineArc();
}

