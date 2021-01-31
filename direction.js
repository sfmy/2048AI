class Direction {
    constructor () {
	this.UP    = 1;
	this.DOWN  = 2;
	this.LEFT  = 3;
	this.RIGHT = 4;
    }

    showDir (dir) {
	let list = ['', '向上', '向下', '向左', '向右'];
	console.log(list[dir] + '滑动!');
    }
}

let instance = null;
module.exports = (() => {
    if (!instance) {
	instance = new Direction();
    }
    return instance;
})();

