var imgs = [];
var timer = 0;
var brushes = [];

var mic;

function preload() {
  for (var i = 0; i<26; i++) {
    imgs[i] = loadImage("/assets/"+i+".png");
    brushes.push(new Brush(random(100, windowWidth-100), random(100, windowHeight-100), random(32, 72), random(-1, 1), random(-1, 1), random(7, 50), imgs[i], int(random(0, 8)), int(random(0, windowWidth)), int(random(0, windowHeight))));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  mic = new p5.AudioIn();
  mic.start();

  userStartAudio();
}

function draw() {
  var vol = mic.getLevel();
  var volLeveled = vol*5000;
  // ellipse(windowWidth/2, windowHeight/2, vol*5000, vol*5000);
  console.log(vol*5000);
  timer = timer + 1;
  imageMode(CENTER);
  for(var i = 0; i < brushes.length; i++) {
    if(brushes[i].esVisible) {
      if ((brushes[i].timer > brushes[i].lifespan) && (brushes[i].auto)) {
        brushes[i].reallocate()
        brushes[i].comp = int(random(0, 8));
        brushes[i].timer = 0;
      }
      if (brushes[i].comp == 0){
        brushes[i].moveAlt(random(1, 100));
      } else if (brushes[i].comp == 1) {
        brushes[i].circular(0,0);
      } else if (brushes[i].comp == 2) {
        brushes[i].ovalo(200, 100);
      } else if (brushes[i].comp == 3) {
        brushes[i].horizontal();
      } else if (brushes[i].comp == 4) {
        brushes[i].vertical();
      } else if (brushes[i].comp == 5) {
        brushes[i].diagonal();
      } else if (brushes[i].comp == 6) {
        brushes[i].moveAlt(sin(brushes.angulo));
      } else if (brushes[i].comp == 7) {
        brushes[i].experimental(i);
      } else if (brushes[i].comp == 8) {
        brushes[i].rose();
      } else if (brushes[i].comp == 9) {
        brushes[i].idle();
      }
      if(volLeveled < 50){
        volLeveled = 200;
      }
      if(volLeveled > 500){
        volLeveled = 500;
      }
      brushes[i].sizex = volLeveled;
      brushes[i].sizey = volLeveled;
      // print(brushes[i].sizex);
      // use lerp?????
      brushes[i].display();
      brushes[i].limites();
    }
  }
}

function keyPressed() {
  print(keyCode)
  if(keyCode == 81){
    brushes[0].brushControl();
  }
  if(keyCode == 87){
    brushes[1].brushControl();
  }
  if(keyCode == 69){
    brushes[2].brushControl();
  }
  if(keyCode == 82){
    brushes[3].brushControl();
  }
  if(keyCode == 84){
    brushes[4].brushControl();
  }
  if(keyCode == 89){
    brushes[5].brushControl();
  }
  if(keyCode == 85){
    brushes[6].brushControl();
  }
  if(keyCode == 73){
    brushes[7].brushControl();
  }
  if(keyCode == 79){
    brushes[8].brushControl();
  }
  if(keyCode == 80){
    brushes[9].brushControl();
  }
  if(keyCode == 65){
    brushes[10].brushControl();
  }
  if(keyCode == 83){
    brushes[11].brushControl();
  }
  if(keyCode == 68){
    brushes[12].brushControl();
  }
  if(keyCode == 70){
    brushes[13].brushControl();
  }
  if(keyCode == 71){
    brushes[14].brushControl();
  }
  if(keyCode == 72){
    brushes[15].brushControl();
  }
  if(keyCode == 74){
    brushes[16].brushControl();
  }
  if(keyCode == 75){
    brushes[17].brushControl();
  }
  if(keyCode == 76){
    brushes[18].brushControl();
  }
  if(keyCode == 90){
    brushes[19].brushControl();
  }
  if(keyCode == 88){
    brushes[20].brushControl();
  }
  if(keyCode == 67){
    brushes[21].brushControl();
  }
  if(keyCode == 86){
    brushes[22].brushControl();
  }
  if(keyCode == 66){
    brushes[23].brushControl();
  }
  if(keyCode == 78){
    brushes[24].brushControl();
  }
  if(keyCode == 77){
    brushes[25].brushControl();
  }
  if(key == '0'){
    background(255);
  }
  if(key == '1'){
    for(var i = 0; i < brushes.length; i++) {
      brushes[i].esVisible = true
      brushes[i].auto = true
      brushes[i].rotateMode = false
      brushes[i].sizeMode = true
    }
  }
  if(key == '2'){
    for(var i = 0; i < brushes.length; i++) {
      brushes[i].esVisible = false
    }
  }
  if(key == '3'){
    var timestamp = str(year()) + str(month()) + str(day()) + str(hour()) + str(minute()) + str(second()) + str(millis())
    saveCanvas(timestamp, 'jpg')
  }
}

// function mousePressed() {
//   userStartAudio();
// }

class Brush {
  constructor(x, y, d, dirx, diry, periodo, img, comp, centrox, centroy) {
    this.x = x;
    this.y = y;
    this.diametro = d;
    this.dirx = dirx;
    this.diry = diry;
    this.periodo = periodo;
    this.img = img;
    this.comp = comp;
    this.centrox = centrox;
    this.centroy = centroy;
    this.angulo = 0;
    this.esVisible = true;
    this.anchox = random(10, 200);
    this.anchoy = random(10, 200);
    this.lifespan = random(100, 1000);
    this.timer = 0;
    this.speed = random(0, 1);
    this.auto = true;
    this.rotateMode = false;
    this.sizeMode = true;
    this.musicMode = false;
    this.sizex = 200;
    this.sizey = 200;
  }

  moveAlt(contador) {
    if(contador%this.periodo == 0){
      this.dirx = random(-2,2);
      this.diry = random(-2,2);
    }
    this.y = this.y + this.diry;
    this.x = this.x + this.dirx;
  }
  circular(dirx, diry) {
    this.x = this.centrox + cos(this.angulo)*this.anchox + dirx;
    this.y = this.centroy + sin(this.angulo)*this.anchoy + diry;

    if (dirx != 0) {
      if (dirx > 0) {
        this.dirx = this.dirx + 1;
      } else if (dirx < 0) {
        this.dirx = this.dirx - 1;
      }
    }
    if (diry != 0) {
      if (diry > 0) {
        this.diry = this.diry + 1;
      } else if (diry < 0) {
        this.diry = this.diry - 1;
      }
    }
    this.angulo = this.angulo + 0.01;
    if (this.angulo > TWO_PI) {
      this.angulo = 0;
    }
  }
  ovalo(ancho, largo) {
    this.x = this.centrox + cos(this.angulo)*(ancho+sin(this.angulo));
    this.y = this.centroy + sin(this.angulo)*largo;
    this.angulo = this.angulo + 0.01;
    if (this.angulo > TWO_PI) {
      this.angulo = 0;
    }
  }
  horizontal() {
    this.x = this.x + 50*cos(this.angulo)*this.dirx;
  }
  vertical() {
    this.y = this.y + 50*sin(this.angulo)*this.diry;
  }
  diagonal() {
    this.x = this.x + this.dirx;
    this.y = this.y + this.diry;
  }
  experimental(brush_num) {
    this.x = this.x + 5*sin(this.angulo+timer*0.05+brush_num*this.dirx)
    this.y = this.y + 2*tan(this.angulo+timer*0.05+brush_num*this.diry)*this.diry
  }
  rose() {
    this.x = 10*cos(4*this.angulo*this.dirx) + this.centrox
    this.y = 10*sin(4*this.angulo*this.dirx) + this.centroy
    this.angulo = this.angulo + 0.01;
    if (this.angulo > TWO_PI) {
      this.angulo = 0;
    }
  }
  idle() {
    this.x = mouseX;
    this.y = mouseY;
  }

  display() {
    push();
    // this.img.resize(200+50*sin(this.angulo+this.timer*(0.05*this.dirx)), 200 + 50*cos(this.angulo+this.timer*(0.05*this.diry)));
    translate(this.x, this.y);
    if(this.rotateMode){
      rotate(PI*timer*(this.speed*this.dirx))
    } else {
      rotate(PI*this.angulo*(this.speed*this.dirx))
    }
    imageMode(CENTER);
    if(this.sizeMode){
      image(this.img, 0, 0, this.sizex + 100*sin(this.angulo+this.timer*(0.05*this.dirx)), this.sizey + 100*cos(this.angulo+this.timer*(0.05*this.diry)));
    } else {
      image(this.img, 0, 0, this.sizex, this.sizey);
    }
    pop();
    this.timer = this.timer + 1;
  }
  limites() {
    if(this.y < this.diametro/2) {
      this.diry = -this.diry;
    }
    if(this.y>height-(this.diametro/2)) {
      this.diry = -this.diry;
    }
    if(this.x < this.diametro) {
      this.dirx = - this.dirx;
    }
    if(this.x>width-(this.diametro/2)) {
      this.dirx = - this.dirx;
    }
  }
  reallocate() {
    this.x = random(50, windowWidth);
    this.y = random(50, windowHeight);
    this.centrox = random(100, windowWidth-100);
    this.centroy = random(100, windowHeight-100);
    this.anchox = random(10, 200);
    this.anchoy = random(10, 200);
  }
  brushControl() {
    if(keyIsDown(SHIFT)){
      this.comp = int(random(0, 8));
      return false;
    }
    if(keyIsDown(32)){
      print('in control');
      this.x = mouseX;
      this.y = mouseY;
      this.comp = 9;
      this.auto = !this.auto;
      if(this.auto) {
        this.comp = int(random(0, 8));  
      }
      return false;
    }
    if(keyIsDown(52)){
      print('ROTATE')      
      this.rotateMode = !this.rotateMode;
      return false
    }
    if(keyIsDown(53)){
      print('SizeMode')      
      this.sizeMode = !this.sizeMode;
      return false
    }
    this.esVisible = !this.esVisible
    return false
  }
}