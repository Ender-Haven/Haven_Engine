import GameClass from "./GameClass.js";

// ONLY CALLED ONCE,
document.addEventListener('DOMContentLoaded', () => {
	const game = new GameClass("canvas");

  var rectPosition;
	// Primary draw
	game.draw = () => {
		game.graphics.background("#000");
		game.graphics.fill("#f00");
    game.graphics.stroke("#00f");
    game.graphics.strokeWeight(10);
	  rectPosition = game.physics.ray(0, 10, Math.PI / 2.2, { a: { x: 50, y: 0 }, b: { x: 50, y: 200 }});
    game.graphics.line(0,10,rectPosition.x,rectPosition.y);
	  game.graphics.rect(rectPosition.x, rectPosition.y, 10, 10);
	};
});