let step = 0;
const max_depth = 1;

function triangle(x, y, size) {
  const sin = Math.sin(60) * size;
  const cos = Math.cos(60) * size;
  const positions = [
    [x, y - size],
    [x - cos, y + sin],
    [x + cos, y + sin],
  ];

  step++;

  if (step / 3 > max_depth) {
    c.moveTo(
      positions[0][0] * HALF_WIDTH + 2 * HALF_WIDTH,
      positions[0][1] * HALF_HEIGHT + 3 * HALF_HEIGHT
    );

    [1, 2, 0].map(item => c.lineTo(
      positions[item][0] * HALF_WIDTH + 2 * HALF_WIDTH,
      positions[item][1] * HALF_HEIGHT + 3 * HALF_HEIGHT
    ));
  } else {
    positions.map(item => triangle(item[0] / 2, item[1], size / 2));
  }
}