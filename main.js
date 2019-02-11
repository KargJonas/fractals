const cnv = document.querySelector("canvas");
const c = cnv.getContext("2d");

// CONSTANTS
const PI = Math.PI;
const SQRT_3 = Math.sqrt(3);

// INCONSISTENT CONSTANTS
let WIDTH = 0;
let HEIGHT = 0;
let HALF_WIDTH = 0;
let HALF_HEIGHT = 0;

function max() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  HALF_WIDTH = WIDTH / 2;
  HALF_HEIGHT = HEIGHT / 2;
  cnv.setAttribute("width", WIDTH);
  cnv.setAttribute("height", HEIGHT);
}

max();
window.addEventListener("resize", max);

function getPoints(x, y, r) {
  // Side-length of the new triangle
  const a = r * SQRT_3;
  const dx = a / 2;

  // Finding positions for the sub-points
  return [
    x, y - r, // Top
    x - dx, y + r, // Bottom left
    x + dx, y + r // Bottom right
  ]
}

function step(triangles, depth, r) {
  r /= 2; // Scaling down
  if (depth === 0) return triangles;
  const temp = [];

  triangles.map(triangle => {
    // triangle.length is always 6 (xyxyxy)
    for (let i = 0; i < 6; i += 2) {
      const subPoints = getPoints(
        triangle[i],
        triangle[i + 1],
        r
      );

      temp.push(subPoints);
    }
  });

  return step(temp, depth - 1, r);
}

function draw(positions) {
  positions.map(_positions => {
    // Deep clone
    const position = _positions.slice(0);

    // Scaling the positions to the screen
    for (let i = 0; i < 6; i += 2) {
      position[i] = HALF_WIDTH + HALF_WIDTH * position[i];
      position[i + 1] = HALF_HEIGHT + HALF_HEIGHT * position[i + 1];
    }

    // The first position
    const first = position.splice(0, 2);

    // Move to the first position
    c.beginPath();
    c.moveTo(first[0], first[1]);

    // Draw lines to the other two positions
    for (let i = 0; i < 4; i += 2) {
      c.lineTo(position[i], position[i + 1]);
    }

    c.fill();
    // c.stroke();  // for dev-purposes
  });
}

const radius = 0.4;
const depth = 8;

// We do all the math and drawing in here so it
// does not jam up the website
function doStuff() {
  const points = step(
    [getPoints(0, 0, radius)], // The starting positions
    depth, // Fractal depth
    radius // Initial circumradius (distance from center to the edges of a triangle)
  );

  draw(points);
}

window.requestAnimationFrame(doStuff);