//Script specific to simulation

//program variables
//controls section
var simstatus=0; 
var rotstatus=1;
//comments section
var commenttext="Some Text";
var commentloc=0;

//computing section
 
var theta = 55; // all angles to be defined either in degrees only or radians only throughout the program and convert as and when required
//origin points circle
var oxcoord =250;
var oycoord = 250;

//line to points
var axcoord = 0;
var aycoord = 0;

var theta = 0;




//length of link
var len = 50;

//graphics section
var canvas;
var ctx;

//timing section
var simTimeId = setInterval("",'1000');
var pauseTime = setInterval("",'1000');
var time=0;

//point tracing section
var ptx = [];
var pty = [];

//click status of legend and quick reference
var legendCS = false;
var quickrefCS = false;
//temporary or dummy variables
var temp=0;

/*
// for trials during development
function trythis()
{ 		alert();}
*/

//change simulation specific css content. e.g. padding on top of variable to adjust appearance in variables window
function editcss()
{
$('.variable').css('padding-top','20px');
$('#datatable1').css('position','absolute');
$('#datatable2').css('position','absolute');
$('#datatable1').css('left','120px');
$('#datatable1').css('top','340px');
$('#datatable2').css('left','395px');
$('#datatable2').css('top','340px');

//$('#legend').css("width",document.getElementById('legendimg').width+"px");
//$('#quickref').css("height",document.getElementById('quickrefimg').height+"px");

}

//start of simulation here; starts the timer with increments of 0.1 seconds
function startsim()
{
	simTimeId=setInterval("time=time+0.1; varupdate(); ",'100');
}

// switches state of simulation between 0:Playing & 1:Paused
function simstate()
{
  var imgfilename=document.getElementById('playpausebutton').src;
  imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
  if (imgfilename=="bluepausedull")
  {
    document.getElementById('playpausebutton').src="sins/blueplaydull.png";
	 clearInterval(simTimeId);
    simstatus=1;
    $('#l1spinner').spinner("value",len);			//to set simulation parameters on pause
    pauseTime=setInterval("varupdate();",'100');
  }
    if (imgfilename=="blueplaydull")
  {
  	 time=0;			
  	 clearInterval(pauseTime);
    document.getElementById('playpausebutton').src="sins/bluepausedull.png";
    simTimeId=setInterval("time=time+0.1; varupdate(); ",'100');    
    simstatus=0;
  } 
}

// switches state of rotation between 1:CounterClockWise & -1:Clockwise
function rotstate()
{
  var imgfilename=document.getElementById('rotationbutton').src;
  imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
  if (imgfilename=="bluecwdull")
  {
    document.getElementById('rotationbutton').src="sins/blueccwdull.png";
    rotstatus=-1;
  }
    if (imgfilename=="blueccwdull")
  {
    document.getElementById('rotationbutton').src="sins/bluecwdull.png";
    rotstatus=1;
  } 
}



//Initialise system parameters here
function varinit()
{
	varchange();		
	//Variable r1 slider and number input types
	$('#l1slider').slider("value", 85);	
	$('#l1spinner').spinner("value", 85);


}



// Initialise and Monitor variable containing user inputs of system parameters.
// change #id and repeat block for new variable. Make sure new <div> with appropriate #id is included in the markup
function varchange()
{
// Variable r1 slider and number input types
$('#l1slider').slider({ max : 150, min : 20, step : 1 });		// slider initialisation : jQuery widget
$('#l1spinner').spinner({ max : 150, min : 20, step : 1 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#l1slider" ).on( "slide", function( e, ui ) { $('#l1spinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#l1spinner" ).on( "spin", function( e, ui ) { $('#l1slider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#l1spinner" ).on( "change", function() {  varchange() } );


varupdate();

}



//Computing of various system parameters
function varupdate()
{

$('#l1slider').slider("value", $('#l1spinner').spinner('value'));  //updating slider location with change in spinner(debug)


len=$('#l1spinner').spinner("value");

//If simulation is running
if(!simstatus)
{
	//everytime decremented theta value by 20
	theta=theta-(20*rotstatus);
	
	//to have theta within the range 0 to 360
	theta=theta%360;
	
	//if theta is less than 0 then it should get updated to 360
	if(theta<0)
		theta+=360;

}

//If simulation is stopped
if(simstatus)
{
	printcomment("Left Side Comment:Length: "+len,1);
printcomment("Right Side Comment:Angle: "+theta,2);
	
}
oxcoord=250;
	oycoord=50;
	
	axcoord=oxcoord+len*Math.cos(rad(theta));
	aycoord=oycoord+len*Math.sin(rad(theta));
	
	bxcoord=oxcoord+len*Math.cos(rad(theta));
	bycoord=oycoord-200;
	



draw();

}

//Simulation graphics
function draw()
{



  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,550,400);  //clears the complete canvas#simscreen everytime
//   draw Horizontal line
	ctx.beginPath();  
	ctx.strokeStyle="goldenrod";
	ctx.lineWidth=2;
	ctx.moveTo(oxcoord-50,oycoord);
	ctx.lineTo(oxcoord+50,oycoord);
	ctx.stroke();
    ctx.closePath();

	
	//display origin point
	ctx.beginPath();  
	ctx.strokeStyle="blue";
	ctx.fillStyle="#000000";
	ctx.font = "14px verdana";	
	ctx.lineWidth=2;
	ctx.arc(oxcoord,oycoord,10,0,1*Math.PI,true);
	ctx.fillText("o",oxcoord-5,oycoord+5);
	ctx.stroke();
	ctx.closePath();
	
	//to draw line between o and a point 
	ctx.beginPath();  
	ctx.strokeStyle="red";
	ctx.lineWidth=5;
	ctx.moveTo(oxcoord,oycoord);
	ctx.lineTo(axcoord,aycoord);
	ctx.arc(axcoord,aycoord,5,0,Math.PI*2,true);
	
	ctx.stroke();
	ctx.closePath();
	
	//to draw point at the end of line
	ctx.beginPath();  
	ctx.strokeStyle="#000000";
	ctx.lineWidth=2;
	ctx.arc(axcoord,aycoord,5,0,2*Math.PI,false);
	ctx.stroke();
	ctx.closePath();
	
 
 }
 

// prints comments passed as 'commenttext' in location specified by 'commentloc' in the comments box;
// 0 : Single comment box, 1 : Left comment box, 2 : Right comment box
function printcomment(commenttext,commentloc)
{
  if(commentloc==0)
  {
  document.getElementById('commentboxright').style.visibility='hidden';
  document.getElementById('commentboxleft').style.width='570px';
  document.getElementById('commentboxleft').innerHTML = commenttext;
  }
  else if(commentloc==1)
  {
  document.getElementById('commentboxright').style.visibility='visible';
  document.getElementById('commentboxleft').style.width='285px';
  document.getElementById('commentboxleft').innerHTML = commenttext;
  }
  else if(commentloc==2)
  {
  document.getElementById('commentboxright').style.visibility='visible';
  document.getElementById('commentboxleft').style.width='285px';
  document.getElementById('commentboxright').innerHTML = commenttext;
  }
  else
  {
  document.getElementById('commentboxright').style.visibility='hidden';
  document.getElementById('commentboxleft').style.width='570px';
  document.getElementById('commentboxleft').innerHTML = "<center>please report this issue to adityaraman@gmail.com</center>"; 
  // ignore use of deprecated tag <center> . Code is executed only if printcomment function receives inappropriate commentloc value
  }
}
//function to convert radians to degrees
function deg(vrad)
{
	return vrad*180/Math.PI;
}

//function to convert degrees to radians
function rad(vdeg)
{
	return vdeg*Math.PI/180;
}

