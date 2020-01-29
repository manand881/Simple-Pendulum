var Animation = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.t = 0;
    this.timeInterval = 0;
    this.startTime = 0;
    this.lastTime = 0;
    this.frame = 0;
    this.animating = false;
    
    // by Paul Irish
    window.requestAnimFrame = (function(callback){
      return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame ||
        function(callback){
        window.setTimeout(callback, 1000 / 60);
      };
    })();
  };
  
  Animation.prototype.getContext = function getContext(){
    return this.context;
  };
  
  Animation.prototype.getCanvas = function(){
    return this.canvas;
  };
  
  Animation.prototype.clear = function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
  
  Animation.prototype.setStage = function(func){
    this.stage = func;
  };
  
  Animation.prototype.isAnimating = function(){
    return this.animating;
  };
  
  Animation.prototype.getFrame = function(){
    return this.frame;
  };
  
  Animation.prototype.start = function(){
    this.animating = true;
    var date = new Date();
    this.startTime = date.getTime();
    this.lastTime = this.startTime;
    
    if (this.stage !== undefined){
      this.stage();
    }
    
    this.animationLoop();
  };
  
  Animation.prototype.stop = function(){
    this.animating = false;
  };
  
  Animation.prototype.getTimeInterval = function(){
    return this.timeInterval;
  };
  
  Animation.prototype.getTime = function(){
    return this.t;
  };
  
  Animation.prototype.getFps = function(){
    return this.timeInterval > 0 ? 1000 / this.timeInterval : 0;
  };
  
  Animation.prototype.animationLoop = function(){
    var that = this;
    
    this.frame++;
    var date = new Date();
    var thisTime = date.getTime();
    this.timeInterval = thisTime - this.lastTime;
    this.t += this.timeInterval;
    this.lastTime = thisTime;
    
    if (this.stage !== undefined){
      this.stage();
    }
    
    if (this.animating){
      window.requestAnimFrame(function(){
        that.animationLoop();
      });
    }
    
  };
  
  window.onload = function (){
    // instantiate new Animation object
    var anim = new Animation("myCanvas");
    var context = anim.getContext();
    var canvas = anim.getCanvas();
    
    var amplitude = Math.PI / 4; // 45 degrees
    var period = 4000; //ms
    var theta = 0;
    var pendulumLength = 250;
    var pendulumWidth = 10;
    var rotationPointX = canvas.width / 2;
    var rotationPointY = 20;
    
    anim.setStage(function(){
      //update
     theta = (amplitude * Math.sin((2 * Math.PI * this.getTime()) / period)) + Math.PI / 2;
     if(period<0){
        period=period-50;}
      //clear
      this.clear();
      
      //draw top circle
      context.beginPath();
      context.arc(rotationPointX, rotationPointY, 15, 0, 2 * Math.PI, false);
      context.fillStyle = "black";
      context.fill();
      
      //draw shaft
      context.beginPath();
      var endPointX = rotationPointX + (pendulumLength * Math.cos(theta));
      var endPointY = rotationPointY + (pendulumLength * Math.sin(theta));
      context.beginPath();
      context.moveTo(rotationPointX, rotationPointY);
      context.lineTo(endPointX, endPointY);
      context.lineWidth = pendulumWidth;
      context.lineCap = "round";
      context.strokeStyle = "#555";
      context.stroke();
      
      //draw bottom circle
      context.beginPath();
      context.arc(endPointX, endPointY, 40, 0, 2 * Math.PI, false);
      var grd = context.createLinearGradient(endPointX - 50, endPointY - 50, endPointX + 50, endPointY + 50);
      grd.addColorStop(0, "#444");
      grd.addColorStop(0.5, "white");
      grd.addColorStop(1, "#444");
      context.fillStyle = grd;
      context.fill();
    });
    anim.start();
    
  };
  function start(){
    anim.start();

}