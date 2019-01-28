const cnv = document.querySelector("canvas");
const c = cnv.getContext("2d");

cnv.setAttribute("width", window.innerWidth);
cnv.setAttribute("height", window.innerHeight);

const HALF_WIDTH = cnv.width / 4;
const HALF_HEIGHT = cnv.height / 4;

c.beginPath();
triangle(0, 0, 1);
c.fill();