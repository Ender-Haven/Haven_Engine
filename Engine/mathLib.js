// Maps a value from one scale to another
function map(value, min, max, newMin, newMax) {
  return newMin + (newMax - newMin) * ((value - min) / (max - min));
}

//export default map;


// Calculates the value at percent between value1 and value2
function lerp(value1, value2, ammount) {
    return ((value2 - value1) * ammount) + value1;
}

//export default lerp;


// Calculates the 2d or 3d distance between two points in space.
function dist() {
    var dx, dy, dz;
    if (arguments.length === 4) {
        dx = arguments[0] - arguments[2];
        dy = arguments[1] - arguments[3];
        return Math.sqrt(dx * dx + dy * dy);
    }
    if (arguments.length === 6) {
        dx = arguments[0] - arguments[3];
        dy = arguments[1] - arguments[4];
        dz = arguments[2] - arguments[5];
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}

export {map, lerp, dist};