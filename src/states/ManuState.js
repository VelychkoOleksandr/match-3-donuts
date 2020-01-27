class ManuState extends Phaser.State {
	constructor() {
		super();

		this.muteMusic = false;
	}

	preload() {
		this.load.image('background', './assets/images/backgrounds/background.jpg');
		this.load.image('sfx', './assets/images/btn-sfx.png');
		this.load.image('logo', './assets/images/donuts_logo.png');
		this.load.image('btn-play', './assets/images/btn-play.png');

		this.load.audio('background', './assets/audio/background.mp3');
	};

	create() {
		//Add background music
		this.backgroundMusic = this.add.audio('background');
		this.backgroundMusic.play('', 0, 1, true); 
		//Set background
		const bg = this.add.sprite(-20, -20, 'background');
		bg.scale.setTo(0.95);

		//Set sfx button
		const btn_sfx = this.add.sprite(0, 5, 'sfx');
		btn_sfx.scale.setTo(0.75);
		btn_sfx.x = this.game.width - btn_sfx.width - 5;

		//Click button event
		btn_sfx.inputEnabled = true;
		btn_sfx.events.onInputDown.add(this.muteBackgroundMusic, this);  

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

	playGame(sprite) {
		sprite.alpha = 0.85;
		//---Kind of animation ---\\
		setTimeout(() => { sprite.alpha = 1; }, 100);
		setTimeout(() => { this.state.start('GameState'); }, 500);
	};

	muteBackgroundMusic(sprite) { 
		this.muteMusic = !this.muteMusic;

		sprite.alpha = 0.85;
		setTimeout(() => { sprite.alpha = 1; }, 100); 

		if (this.muteMusic) {
			this.backgroundMusic.volume = 0;
		} else {
			this.backgroundMusic.volume = 1;
		};
	};

}

export default ManuState;   
