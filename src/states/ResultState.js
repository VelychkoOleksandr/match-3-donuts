class ResultState extends Phaser.State {

	preload() {
		this.load.image('background', './assets/images/backgrounds/background.jpg');
    this.load.image('timeup', './assets/images/text-timeup.png');
    this.load.image('score', './assets/images/bg-score.png');
		this.load.image('btn-play', './assets/images/btn-play.png');
	};

	create() {
		//Set background
		const bg = this.add.sprite(-20, -20, 'background');  
		bg.scale.setTo(0.95);

		//Set timeup text
    const timeup = this.add.sprite(0, 0, 'timeup');
    timeup.x = (this.game.width / 2) - (timeup.width / 2);
    timeup.y = 100;
    
    //Set score 
    const scroreBoard = this.add.sprite(0, 0, 'score');
    scroreBoard.x = (this.game.width / 2) - (scroreBoard.width / 2);
    scroreBoard.y = 100 + timeup.height + 50;

    //Score text
    const scoreText = this.add.text(50, 50, this.game.gameScore, { fontSize: '44px', fill: '#fff' });
    scoreText.x = this.game.width / 2 - 40;
    scoreText.y = scroreBoard.y +  scroreBoard.height / 2 - 40;
    
    // //Restart button. Deleted due to error Error: Cannot read property ‘cache’ of null
		// const btn_play = this.add.sprite(0, 0, 'btn-play'); 
    // btn_play.scale.setTo(0.95);
		// btn_play.x = (this.game.width / 2) - (btn_play.width / 2);
    // btn_play.y = scroreBoard.y + scroreBoard.height;
    
    // //Click button event
    // btn_play.inputEnabled = true;
		// btn_play.events.onInputDown.add(this.playGame, this);
  
  };

	// playGame() {
	// 	//---Kind of animation ---\\
	// 	// setTimeout(() => { sprite.alpha = 1; }, 100);	
  //   // setTimeout(() => { this.state.start('GameState'); }, 500);
    
  //   this.state.start('ManuState');     //
	// };

}

export default ResultState;   
