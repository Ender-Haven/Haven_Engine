import graphicsInit from "./graphicsLib.js";
import {cursor} from "./utilLib.js";
graphicsInit();

// Engine version.
const version = "a3.1";
// to-do> Use version to modify index.html's verion number display

const canvasID = "canvas";
window.width = 0;
window.height = 0; // Canvas dimensions
window.mouseX = 0;
window.mouseY = 0; // Mouse position relative to canvas
window.pmouseX = 0;
window.pmouseY = 0; // Previous mouse position relative to canvas
window.mouseClicked = () => {}; // This will be defined as a function and executed when the user clicks
window.keys = [];
window.clicked = false; // True for one frame on mouse click
window.pressed = false;
window.drag = { now:false, x:null, y:null }; // True while mouse is pressed

window.draw;
window.secretDraw = () => {};
window.initialised = false;
window.ctx = undefined;

function init() {
    // Get the canvas and set ctx to canvas context.
	const canvas = document.getElementById(canvasID);
  canvas.width = canvas.getBoundingClientRect().width * 2;
  canvas.height = canvas.getBoundingClientRect().height * 2;
	width = canvas.width;
	height = canvas.height;
  canvas.style.width = width / 2 + "px";
  canvas.style.height = height / 2 + "px";

	ctx = canvas.getContext("2d");
	
    // Find the canvas' offset to correct mouse position.
	var offset = {
		x: Math.round(window.scrollX +
		document.querySelector("#"+canvasID).getBoundingClientRect().left), // X
		y: Math.round(window.scrollY +
		document.querySelector("#"+canvasID).getBoundingClientRect().top), // Y
	}

    // corrects mouse position when the page has been scrolled.
	var scrollTop = 0;
  var onCanvas = false;
	canvas.addEventListener("mousemove", event => {
		scrollTop = $(window).scrollTop();
    pmouseX = mouseX;
    pmouseY = mouseY;
		mouseX = (event.clientX - offset.x);
		mouseY = ((event.clientY - offset.y) + scrollTop);
	});
  canvas.addEventListener("mouseenter", event => {
    onCanvas = true;
  });
  canvas.addEventListener("mouseleave", event => {
    onCanvas = false;
  });
	canvas.addEventListener("scroll", e => {
    e.preventDefault();
		scrollTop = $(window).scrollTop();
		mouseX = -1;
		mouseY = -1;
	});

    // Run mouseClicked() on click.
	canvas.addEventListener("click", event => {
    clicked = true;
		mouseClicked();
	});
  canvas.addEventListener("mousedown", event => {
    drag.now=true;
    drag.x=mouseX;
    drag.y=mouseY;
    pressed = true;
  });
  canvas.addEventListener("mouseup", event => {
    drag.now=false;
    pressed = false;
	});
  window.addEventListener("keydown", e => {
    if(onCanvas) {
      e.preventDefault();
      keys[e.keyCode] = true;
    }
    });
  window.addEventListener("keyup", e => {
    if(onCanvas) {
      e.preventDefault();
      keys[e.keyCode] = false;
    }
  });


	
  // Define display library functions
  graphicsInit(ctx, canvas, canvasID);
  /**
   * A simple button that runs function onClick() when clicked.
   *  
   * @param {number} x - x position 
   * @param {number} y - y position
   * @param {number} w - width
   * @param {number} h - height
   * @param {function} onClick - call on button click
   * @param {color} c1 - default color
   * @param {color} c2 - hover color
   * @param {color} c3 - outline color
   * 
   * @returns {void}
  **/
	window.button = (x, y, w, h, onClick, c1, c2, cs) => {
    fill(c1 || "#FFF");
    stroke(cs || '#000');
    if(mouseX >= x / 2 && mouseX <= (x + w) / 2 && mouseY > y / 2 && mouseY <= (y + h) / 2){
      fill(c2 || "#EEF");
      canvas.style.cursor = "pointer";
        if(clicked) {
          clicked = false;
          onClick();
        }
      }
    rect(x, y, w, h);
	};
	
  // Default draw function.
  // note> Should be replaced with an error message here, just in case only core is present and no other code so the error can be tracked easier.
  // only set to default if it hasn't been defined somewhere else first
	window.draw = window.draw || (() => {
	 	background("#500");
	});
	
	const filterStrength = 20;
	window.frameTime = 0;
	window.lastLoop = new Date;
	window.thisLoop;
	window.fps = 0;
	window.universalSpeed = 1;
  // Runs draw() whenever possible.
	setInterval(() => {
    canvas.style.cursor = "default";
		window.draw();
    window.secretDraw();
		clicked = false;
    cursor("arrow");
		var thisFrameTime = (window.thisLoop = new Date) - window.lastLoop;
		frameTime += (thisFrameTime - window.frameTime) / filterStrength;
		window.lastLoop = window.thisLoop;
		window.fps = (1000/frameTime).toFixed(1);

		window.universalSpeed = 1 / (window.fps / 200);
	}, 1000 / 60);
	
	// Returns the canvas context.
	return(ctx);
};

// ONLY CALLED ONCE,
document.addEventListener('DOMContentLoaded', () => {
  if(!initialised) {
    init();
    initialised = true;
  }
});

// Primary draw
window.draw = () => {
  background("#000");
  fill("#f00");
  rect(0,0,10,10);
};