class GraphicsClass {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
	}
	// Clears the canvas and sets the background color
	background(hex) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.canvas.style.background = hex;
	}
	// Shorthand for setting the fill style
	fill(hex) {
		this.ctx.fillStyle = hex;
	}
	// Shorthand for setting the stroke style
	stroke(hex) {
		this.ctx.strokeStyle = hex;
	}
  strokeWeight(width) {
		this.ctx.lineWidth = width;
	}
	// Shorthand for drawing a rectangle
	rect(x, y, w, h) {
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.fill();
		this.ctx.stroke();
	}
    // Shorthand for drawing a line
    line(x1, y1, x2, y2) {
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
		this.ctx.fill();
		this.ctx.stroke();
	}
	// Shorthand for displaying a base64 image
	base64Image(base64, x, y, w, h) {
		let image = new Image();
		image.src = base64;
		image.onload = () => this.ctx.drawImage(image, x, y, w, h);
	}
	// Display an image
	image(img, x, y, w, h) {
		// update to work with ctx.putImageData
		this.ctx.drawImage(img, x, y, w, h);
	}
	// Rotates the canvas using degrees instead of radians
	// (slower, but easier to understand)
	rotate(degrees) {
		this.ctx.rotate(degrees * Math.PI / 180);
	}
	// Scales the canvas
	scale(x, y) {
		this.ctx.scale(x, y || x);
	}
	// Translates the canvas in 2D
	translate(x, y) {
		this.ctx.translate(x, y || x);
	}
	// Pushes a new canvas context allowing for translation independent of the primary context
	pushMatrix() {
		this.ctx.save();
	}
	// Resets the canvas context, restoring it to before the context was pushed.
	popMatrix() {
		this.ctx.restore();
	}
	// Extracts image data for the canvas, allowing it to be used later.
	// (Can be used for multiple render passes)
	get(x, y, w, h) {
		if(!x) return this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		if(!w) return this.ctx.getImageData(x, y, 1, 1).data;

		return this.ctx.getImageData(x, y, w, h);
	};
}

export default GraphicsClass;