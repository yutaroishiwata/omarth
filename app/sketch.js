'use strict';

function setup() {
  createCanvas(windowWidth, windowHeight);
  //noCursor();
  
  //colorMode(HSB, 360, 100, 100);
  //rectMode(CENTER);
  //noStroke();
  noFill();
  console.log("Hello!");
}

function draw() {
  //background(mouseY / 2, 100, 100);

  //fill(360 - mouseY / 2, 100, 100);
  //rect(360, 360, mouseX + 1, mouseX + 1);
  //background(255); 
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, 40, 40);
  }
}
/*
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
*/
