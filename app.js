var Grid = require("./grid.js");
var Direction = require("./direction.js");
var AI = require("./ai.js");

let grid = new Grid();
grid.generate();
grid.generate();
let ai = new AI(grid, 1000);
ai.autoRun();
