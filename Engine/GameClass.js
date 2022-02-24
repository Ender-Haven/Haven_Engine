import GraphicsClass from "./GraphicsClass.js";
import PhysicsClass from "./PhysicsClass.js";
import { cursor } from "./utilLib.js";

class GameClass {
	width = 0;
	height = 0; // Canvas dimensions
	mouseX = 0;
	mouseY = 0; // Mouse position relative to canvas
	pmouseX = 0;
	pmouseY = 0; // Previous mouse position relative to canvas
	mouseClicked = () => {}; // This will be defined as a function and executed when the user clicks
	keys = [];
	clicked = false; // True for one frame on mouse click
	pressed = false;
	drag = {
		now: false,
		x: null,
		y: null
	}; // True while mouse is pressed
	draw = () => {};
	secretDraw = () => {};
	ctx = undefined;

	definition = 2;

	frameTime = 0;
	lastLoop = new Date;
	thisLoop;

	// allow access to fps and universal speed from anywhere
	static fps = 0;
	static universalSpeed = 1;

	constructor(canvasId) {
		this.canvas = this.setupCanvas(canvasId);

		if(!this.canvas) {
			throw new Error("Canvas initialization failed. ");
			alert("Canvas initialization failed. ");
		}
		
		this.graphics = new GraphicsClass(this.canvas);
    this.physics = new PhysicsClass();

		this.setupEvents(this.canvas);

		this.draw = this.draw || (() => {
			graphics.background("#500");
		});

		const filterStrength = 20;
		setInterval(() => {
			cursor("default"); // set default cursor

			// run our looping functions
			this.draw();
			this.secretDraw();

			this.clicked = false; // set clicked back to false

			// calculate FPS
			var thisFrameTime = (this.thisLoop = new Date) - this.lastLoop;
			this.frameTime += (thisFrameTime - this.frameTime) / this.filterStrength;
			this.lastLoop = this.thisLoop;

			GameClass.fps = (1000 / this.frameTime).toFixed(1);
			GameClass.universalSpeed = 1 / (GameClass.fps / 200);
		}, 1000 / 60);
	}

	setupCanvas(canvasId) {
		const canvas = document.getElementById(canvasId);

		if(!canvas) return false;

		canvas.width = canvas.getBoundingClientRect().width * this.definition;
		canvas.height = canvas.getBoundingClientRect().height * this.definition;
		this.width = canvas.width;
		this.height = canvas.height;
		canvas.style.width = this.width / this.definition + "px";
		canvas.style.height = this.height / this.definition + "px";

		return canvas;
	}

	setupEvents(canvas) {
		const offset = {
			x: Math.round(window.scrollX + canvas.getBoundingClientRect().left), // X
			y: Math.round(window.scrollY + canvas.getBoundingClientRect().top), // Y
		};

		var scrollTop = 0;
		var onCanvas = false;
		canvas.addEventListener("mousemove", event => {
			scrollTop = $(window).scrollTop();
			this.pmouseX = this.mouseX;
			this.pmouseY = this.mouseY;
			this.mouseX = (event.clientX - offset.x);
			this.mouseY = ((event.clientY - offset.y) + scrollTop);
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
			this.mouseX = -1;
			this.mouseY = -1;
		});

		// Run mouseClicked() on click.
		canvas.addEventListener("click", event => {
			this.clicked = true;
			this.mouseClicked();
		});
		canvas.addEventListener("mousedown", event => {
			this.drag.now = true;
			this.drag.x = this.mouseX;
			this.drag.y = this.mouseY;
			this.pressed = true;
		});
		canvas.addEventListener("mouseup", event => {
			this.drag.now = false;
			this.pressed = false;
		});
		window.addEventListener("keydown", e => {
			if(!onCanvas) return;

			e.preventDefault();
			this.keys[e.keyCode] = true;
		});
		window.addEventListener("keyup", e => {
			if(!onCanvas) return;
			
			e.preventDefault();
			this.keys[e.keyCode] = false;
		});
	}

	set draw(func) {
		this.draw = draw;
	}
}

export default GameClass;