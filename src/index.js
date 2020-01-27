import ManuState from 'states/ManuState';
import GameState from './states/GameState';
import ResultState from './states/ResultState';                 

const game_option = {
	windowSize: {  
		width: 800,
		height: 750
	}
}     
    
class Game extends Phaser.Game {   
                                                     
	constructor() {                       	                
		super(game_option.windowSize.width, game_option.windowSize.height, Phaser.AUTO, 'content', null);    
  
		this.state.add('ManuState', ManuState, false);
		this.state.add('GameState', GameState, false); 
		this.state.add('ResultState', ResultState, false);

		this.state.start('ManuState');                      
	}; 
                        
	playGame() {            
		this.state.start('GameState');               	       	
	}
}

new Game();
