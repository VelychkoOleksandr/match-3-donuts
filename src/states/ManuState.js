class ManuState extends Phaser.State {

	preload() {
		this.load.image('background', './assets/images/backgrounds/background.jpg');
		this.load.image('sfx', './assets/images/btn-sfx.png');
		this.load.image('logo', './assets/images/donuts_logo.png');
		this.load.image('btn-play', './assets/images/btn-play.png');
	};

	create() {
		//Set background
		const bg = this.add.sprite(-20, -20, 'background');
		bg.scale.setTo(0.95);

		//Set sfx button
		const btn_sfx = this.add.sprite(0, 5, 'sfx');
		btn_sfx.scale.setTo(0.75);
		btn_sfx.x = this.game.width - btn_sfx.width - 5; 

		//Set logo
		const logo = this.add.sprite(0, 0, 'logo');
		logo.scale.setTo(0.9);
		logo.x = (this.game.width / 2) - (logo.width / 2);
		logo.y = logo.height * 0.5; 

		//Set play button
		const btn_play = this.add.sprite(0, 0, 'btn-play');
		btn_play.scale.setTo(0.95);
		btn_play.x = (this.game.width / 2) - (btn_play.width / 2);
		btn_play.y = logo.y + logo.height + 30;

		//Click button event
		btn_play.inputEnabled = true;
		btn_play.events.onInputDown.add(this.playGame, this);
	};

	playGame(sprite, pointer) {
		sprite.alpha = 0.85;
		//---Kind of animation ---\\
		// setTimeout(() => { sprite.alpha = 1; }, 100);	
		// setTimeout(() => { this.state.start('GameState'); }, 500);
		this.state.start('GameState');  
	};

}

export default ManuState;   
