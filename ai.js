var Direction = require("./direction.js");

class AI {
    constructor (grid, runs) {
	this.grid = grid;
	this.runs = runs;
    }

    getBestDirection () {
	let best_dir = Direction.DOWN;
	let best_score = 0;
	for (let dir of [Direction.DOWN, Direction.UP, Direction.LEFT, Direction.RIGHT]) {
	    let score = this.multiRandomRun(dir);
	    if (score > best_score) {
		best_dir = dir;
		best_score = score;
	    }
	}
	return best_dir;
    }

    multiRandomRun (direction) {
	let avg_score = 0;
	for (let i = 0; i < this.runs; ++i) {
	    let res = this.randomRun(direction);
	    if (res.score == 0) { break; }
	    avg_score += res.score;
	}
	avg_score /= this.runs;
	return avg_score;
    }

    randomRun (direction) {
	let grid = this.grid.clone();
	let step = 0;
	let res = grid.slide(direction);
	let score = res.score;
	if (!res.moved) {
	    return { score: score, step: step, };
	}
	++ step;
	grid.generate();

	do {
	    let can_gen = grid.canGenerate();
	    let can_merge = grid.canMerge();
	    if (!can_gen && !can_merge) {
		break;
	    }
	    direction = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT][Math.floor(Math.random()*4)];
	    res = grid.slide(direction);
	    if (!res.moved) { continue; }
	    ++ step;
	    score += res.score;
	    grid.generate();
	} while (true);
	return { score: score, step: step, };
    }

    autoRun () {
	do {
	    let dir = this.getBestDirection();
	    Direction.showDir(dir);
	    this.grid.slide(dir);
	    this.grid.show();
	    console.log("----------------------------------------");
	    console.log("得分:", this.grid.score);
	    this.grid.generate();
	    this.grid.show();
	    if (!this.grid.canMerge() && !this.grid.canGenerate()) {
		break
	    }
	} while (true);
	this.grid.show();
	console.log("得分:", this.grid.score);
    }
}

module.exports = AI;
