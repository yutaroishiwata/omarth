var capturer
var buffer;
var w = 400,
    h = 400;

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
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');
    pg = createGraphics(w, h); //createGraphicsはimage関数を利用してcreateCanvasの上に配置される
    pg.parent('pg');
    pg.capture.size(w, h);
    pg.capture.hide();
    buffer = new jsfeat.matrix_t(w, h, jsfeat.U8C1_t);
}

function jsfeatToP5(src, dst) {
    if (!dst || dst.width != src.cols || dst.height != src.rows) {
        dst = createImage(src.cols, src.rows);
    }
    var n = src.data.length;
    dst.loadPixels();
    var srcData = src.data;
    var dstData = dst.pixels;
    for (var i = 0, j = 0; i < n; i++) {
        var cur = srcData[i];
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = 255;
    }
    dst.updatePixels();
    return dst;
}

function draw() {
    //translate(width/2, height/2);
    image(pg, 0, 0, 400, 400);
    capture.loadPixels();
    if (capture.pixels.length > 0) { // don't forget this!
        var blurSize = select('#blurSize').elt.value;
        var lowThreshold = select('#lowThreshold').elt.value;
        var highThreshold = select('#highThreshold').elt.value;
        blurSize = map(blurSize, 0, 100, 1, 12);
        lowThreshold = map(lowThreshold, 0, 100, 0, 255);
        highThreshold = map(highThreshold, 0, 100, 0, 255);

        jsfeat.imgproc.grayscale(capture.pixels, w, h, buffer);
        jsfeat.imgproc.gaussian_blur(buffer, buffer, blurSize, 0);
        jsfeat.imgproc.canny(buffer, buffer, lowThreshold, highThreshold);
        var n = buffer.rows * buffer.cols;
        //uncomment the following lines to invert the image
        for (var i = 0; i < n; i++) {
          buffer.data[i] = 255 - buffer.data[i];
        }
        result = jsfeatToP5(buffer, result);
        image(result, 0, 0, 400, 400);
    }
}
