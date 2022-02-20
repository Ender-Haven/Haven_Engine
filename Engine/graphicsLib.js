// A basic SVG-type 2D graphics library.
function graphicsInit(ctx, canvas, canvasID) {
  // Clears the canvas and sets the background color
  window.background = hex => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById(canvasID).style.background = hex;
  };
  // Shorthand for setting the fill style
  window.fill = hex => {
    ctx.fillStyle = hex;
  };
  // Shorthand for setting the stroke style
  window.stroke = hex => {
    ctx.strokeStyle = hex;
  };
  // Shorthand for drawing a rectangle
  window.rect = (x, y, w, h) => {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
  };
  // Shorthand for displaying a base64 image
  window.base64Image = (base64, x, y, w, h) => {
    let image = new Image();
    image.src = base64;
    image.onload = () => ctx.drawImage(image, x, y, w, h);
  };
  // Display an image
  window.image = (img, x, y, w, h) => {
    // update to work with ctx.putImageData
    ctx.drawImage(img, x, y, w, h);
  };
  // Rotates the canvas using degrees instead of radians
  // (slower, but easier to understand)
  window.rotate = (degrees) => {
    ctx.rotate(degrees * Math.PI / 180);
  };
  // Scales the canvas
  window.scale = (x, y) => {
    ctx.scale(x, y ? y : x);
  };
  // Translates the canvas in 2D
  window.translate = (x, y) => {
    ctx.translate(x, y ? y : x);
  };
  // Pushes a new canvas context allowing for translation independent of the primary context
  window.pushMatrix = () => {
    ctx.save();
  };
  // Resets the canvas context, restoring it to before the context was pushed.
  window.popMatrix = () => {
    ctx.restore();
  };
  // Extracts image data for the canvas, allowing it to be used later.
  // (Can be used for multiple render passes)
  window.get = (x, y, w, h) => {
    if(!x) return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    if(!w) return ctx.getImageData(x, y, 1, 1).data;

    return ctx.getImageData(x, y, w, h);
  };
}

export default graphicsInit;