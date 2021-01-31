var Direction = require("./direction.js");

class Grid {
    constructor () {
	this.ROW = 4;
	this.COL = 4;
	this.score = 0;
	this.tiles = [
	    null, null, null, null,
	    null, null, null, null,
	    null, null, null, null,
	    null, null, null, null 
	];
    }

    slide (direction) {
	let moved = false;
	moved = this.move(direction) || moved;
	let score = this.merge(direction);
	this.score += score;
	moved = moved || (score != 0);
	moved = this.move(direction) || moved;

	return { moved: moved, score: score };
    }

    move (direction) {
	let moved = false;
	if (direction == Direction.UP) {
	    for (let x = 0; x < this.COL; ++x) {
		let space = -1;
		for (let y = this.ROW-1; y >= 0; --y) {
		    if (this.tiles[y*this.COL+x] == null && space < y) {
			space = y;
		    }
		    if (this.tiles[y*this.COL+x] != null && y < space) {
			this.tiles[space*this.COL+x] = this.tiles[y*this.COL+x];
			this.tiles[y*this.COL+x] = null;
			-- space;
			moved = true;
		    }
		}
	    }
	}
	else if (direction == Direction.DOWN) {
	    for (let x = 0; x < this.COL; ++x) {
		let space = this.ROW;
		for (let y = 0; y < this.ROW; ++y) {
		    if (this.tiles[y*this.COL+x] == null && space > y) {
			space = y;
		    }
		    if (this.tiles[y*this.COL+x] != null && space < y) {
			this.tiles[space*this.COL+x] = this.tiles[y*this.COL+x];
			this.tiles[y*this.COL+x] = null;
			++ space;
			moved = true;
		    }
		}
	    }
	}
	else if (direction == Direction.LEFT) {
	    for (let y = 0; y < this.ROW; ++y) {
		let space = this.COL;
		for (let x = 0; x < this.COL; ++x) {
		    if (this.tiles[y*this.COL+x] == null && space > x) {
			space = x;
		    }
		    if (this.tiles[y*this.COL+x] != null && space < x) {
			this.tiles[y*this.COL+space] = this.tiles[y*this.COL+x];
			this.tiles[y*this.COL+x] = null;
			++ space;
			moved = true;
		    }
		}
	    }
	}
	else if (direction == Direction.RIGHT) {
	    for (let y = 0; y < this.ROW; ++y) {
		let space = -1;
		for (let x = this.COL-1; x >= 0; --x) {
		    if (this.tiles[y*this.COL+x] == null && space < x) {
			space = x;
		    }
		    if (this.tiles[y*this.COL+x] != null && space > x) {
			this.tiles[y*this.COL+space] = this.tiles[y*this.COL+x];
			this.tiles[y*this.COL+x] = null;
			-- space;
			moved = true;
		    }
		}
	    }
	}
	return moved;
    }

    merge (direction) {
	let score = 0;
	if (direction == Direction.UP ) {
	    for (let x = 0; x < this.COL; ++x) {
		for (let y = this.ROW-1; y > 0; --y) {
		    if (this.tiles[y*this.COL+x] != null && this.tiles[y*this.COL+x] == this.tiles[(y-1)*this.COL+x]) {
			score += this.tiles[y*this.COL+x];
			this.tiles[y*this.COL+x] *= 2;
			this.tiles[(y-1)*this.COL+x] = null;
		    }
		}
	    }
	}
	else if (direction == Direction.DOWN) {
	    for (let x = 0; x < this.COL; ++x) {
		for (let y = 0; y < this.ROW-1; ++y) {
		    if (this.tiles[y*this.COL+x] != null && this.tiles[y*this.COL+x] == this.tiles[(y+1)*this.COL+x]) {
			score += this.tiles[y*this.COL+x];
			this.tiles[y*this.COL+x] *= 2;
			this.tiles[(y+1)*this.COL+x] = null;
		    }
		}
	    }
	}
	else if (direction == Direction.LEFT) {
	    for (let y = 0; y < this.ROW; ++y) {
		for (let x = 0; x < this.COL-1; ++x) {
		    if (this.tiles[y*this.COL+x] != null && this.tiles[y*this.COL+x] == this.tiles[y*this.COL+x+1]) {
			score += this.tiles[y*this.COL+x];
			this.tiles[y*this.COL+x] *= 2;
			this.tiles[y*this.COL+x+1] = null;
		    }
		}
	    }
	}
	else if (direction == Direction.RIGHT) {
	    for (let y = 0; y < this.ROW; ++y) {
		for (let x = this.COL-1; x > 0; --x) {
		    if (this.tiles[y*this.COL+x] != null && this.tiles[y*this.COL+x] == this.tiles[y*this.COL+x-1]) {
			score += this.tiles[y*this.COL+x];
			this.tiles[y*this.COL+x] *= 2;
			this.tiles[y*this.COL+x-1] = null;
		    }
		}
	    }
	}
	return score;
    }

    getScore () {
	let score = 0;
	for (let x = 0; x < this.COL; ++x) {
	    for (let y = 0; y < this.ROW; ++y) {
		if (null != this.tiles[y*this.COL+x]) {
		    score += this.tiles[y*this.COL+x];
		}
	    }
	}
	return score;
    }

    show () {
	for (let y = this.ROW-1; y >= 0; --y) {
	    let str = "";
	    str += (this.tiles[y*this.COL+0] || 0);
	    str += "\t" + (this.tiles[y*this.COL+1] || 0);
	    str += "\t" + (this.tiles[y*this.COL+2] || 0);
	    str += "\t" + (this.tiles[y*this.COL+3] || 0);
	    console.log(str);
	}
    }

    generate () {
	let num = (Math.random() < 0.9)? 2:4;
	let list = [];
	for (let x = 0; x < this.COL; ++x) {
	    for (let y = 0; y < this.ROW; ++y) {
		if (null == this.tiles[x+y*this.COL]) {
		    list.push(x+y*this.COL);
		}
	    }
	}
	if (list.length != 0) {
	    let index = list[Math.floor(Math.random()*list.length)];
	    this.tiles[index] = num;
	    return true;
	}
	else {
	    console.log("error: can't find free space!");
	    return false;
	}
    }

    canMerge () {
	for (let y = 0; y < this.ROW; ++y) {
	    for (let x = 0; x < this.COL-1; ++x) {
		if (this.tiles[x+y*this.COL] != null && this.tiles[x+y*this.COL] == this.tiles[x+1+y*this.COL]) {
		    return true;
		}
	    }
	}
	for (let x = 0; x < this.COL; ++x) {
	    for (let y = 0; y < this.ROW-1; ++y) {
		if (this.tiles[x+y*this.COL] != null && this.tiles[x+(y+1)*this.COL] == this.tiles[x+y*this.COL]) {
		    return true;
		}
	    }
	}

	return false;
    }

    canGenerate () {
	return this.tiles.indexOf(null) != -1;
    }

    clone () {
	let grid = new Grid();
	grid.tiles = this.tiles.slice();
	return grid;
    }
}

module.exports = Grid;

/* TEST */
/* let grid = new Grid();
grid.tiles = [
    2,	8,	4,	2,
    4,	16,	32,	8,
    8,	4,	8,	16,
    4,	8,	2,	4	
];
console.log(grid.canMerge()); */
