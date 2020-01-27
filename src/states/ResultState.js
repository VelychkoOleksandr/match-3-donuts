class ResultState extends Phaser.State {

  preload() {
    this.load.image('background', './assets/images/backgrounds/background.jpg');
    this.load.image('timeup', './assets/images/text-timeup.png');
    this.load.image('score', './assets/images/bg-score.png');


    this.load.image('particle_ex1', './assets/images/particles/particle_ex1.png');
    this.load.image('particle_ex2', './assets/images/particles/particle_ex2.png');
    this.load.image('particle_ex3', './assets/images/particles/particle_ex3.png');
    this.load.image('particle_1', './assets/images/particles/particle-1.png');
    this.load.image('particle_2', './assets/images/particles/particle-2.png');
    this.load.image('particle_3', './assets/images/particles/particle-3.png');
    this.load.image('particle_4', './assets/images/particles/particle-4.png');
    this.load.image('particle_5', './assets/images/particles/particle-5.png');

  };

  create() {
    //Set background
    const bg = this.add.sprite(-20, -20, 'background');
    bg.scale.setTo(0.95);

    //Particles
    const particles_1 = this.add.emitter(-15, -15, 250);
    particles_1.makeParticles(['particle_ex1', 'particle_ex2', 'particle_ex3', 'particle_1', 'particle_2', 'particle_3', 'particle_4', 'particle_5']);
    particles_1.minParticleSpeed.setTo(-300, -300);
    particles_1.maxParticleSpeed.setTo(3000, 3000);

    particles_1.minRotation = 50;
    particles_1.maxRotation = 50;

    particles_1.start(false, 3000, 10);

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
    scoreText.y = scroreBoard.y + scroreBoard.height / 2 - 40;
  };

};

export default ResultState;   
