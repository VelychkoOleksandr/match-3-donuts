import ManuState from 'states/ManuState';

class Game extends Phaser.Game {

	constructor() {
		super(800, 600, Phaser.AUTO, 'content', null);
		this.state.add('ManuState', ManuState, false);
		this.state.start('ManuState');
	}
}

new Game(); 
