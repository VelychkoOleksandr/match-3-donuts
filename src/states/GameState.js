class GameState extends Phaser.State {

  constructor() {
    super();
    this.playAreaSize = {
      offsetX: 100,
      offsetY: 0,
      tilePaddingTopAndBottom: 0,
      tilePaddingLeftAndRight: 0,
      tileWidth: 0,
      tileHeight: 0
    };

    this.gridSize = {
      width: 7,
      height: 7
    };

    this.tileList = ['gem_01', 'gem_02', 'gem_03', 'gem_04', 'gem_05', 'gem_06'];
    this.tilesArray = this.generateTilesMatrix();

    this.selectedTile = null;
    this.tilesGroup = null;

    this.score = 0;
    this.scoreText = null;

    this.timer = 10;
    this.restOfTime = this.timer;

    this.cursorDisabled = false;
  }

  preload() {
    this.load.image('background', './assets/images/backgrounds/background.jpg');

    this.load.image('score', './assets/images/bg-score.png');

    this.load.image('gem_01', './assets/images/game/gem-01.png');
    this.load.image('gem_02', './assets/images/game/gem-02.png');
    this.load.image('gem_03', './assets/images/game/gem-03.png');
    this.load.image('gem_04', './assets/images/game/gem-04.png');
    this.load.image('gem_05', './assets/images/game/gem-05.png');
    this.load.image('gem_06', './assets/images/game/gem-06.png');

    console.log('GameState');
  };

  create() {
    //Set background
    const bg = this.add.sprite(-20, -20, 'background');
    bg.scale.setTo(0.95);

    //Set score board 
    const scroreBoard = this.add.sprite(-65, 0, 'score');
    this.playAreaSize.offsetY = scroreBoard.height - 50; 

    //Score text
    this.scoreText = this.add.text(scroreBoard.width / 4 + 20, scroreBoard.height / 2 - 40, '0', { fontSize: '44px', fill: '#fff' });

    //Score text
    this.timeText = this.add.text(this.game.width - 250, scroreBoard.height / 2 - 40, `Time: ${this.timer}`, { fontSize: '44px', fill: '#000' });     

    //Show Donuts
    this.startTimer();
    this.drawTiles();

  };

  generateTilesMatrix() {
    const tilesMatrix = [];
    let tilesRow = [];

    for (let row = 0; row < this.gridSize.height; row++) {
      for (let col = 0; col < this.gridSize.width; col++) {

        let randomTileIndex = Math.floor(Math.random() * (this.tileList.length));
        tilesRow.push(this.tileList[randomTileIndex]);

      };

      tilesMatrix.push(tilesRow);
      tilesRow = [];
    };

    return tilesMatrix;
  }

  drawTiles() {
    let tilesGroup;

    //Create Tiles Group to hol All Tiles

    if (this.tilesGroup) {
      tilesGroup = this.tilesGroup;
    } else {
      tilesGroup = this.add.group();
    };

    //Reset all children(required for redraw)
    tilesGroup.removeAll(true);

    for (let row = 0; row < this.tilesArray.length; row++) {
      for (let col = 0; col < this.tilesArray[row].length; col++) {
        //Add Donut
        const tile = tilesGroup.create(0, 0, this.tilesArray[row][col]);
        tile.scale.setTo(0.75);
        this.setTileSize(tile);
        this.calculatePadding();

        //Set Donut Position
        tile.x = this.playAreaSize.offsetX + col * (tile.width + this.playAreaSize.tilePaddingLeftAndRight);
        tile.y = this.playAreaSize.offsetY + row * (tile.height + this.playAreaSize.tilePaddingTopAndBottom);

        //Select Event
        tile.inputEnabled = true;
        tile.events.onInputDown.add(async (tile) => { await this.selectTile(tile); }, this);

        //Add Matrix Coords
        tile.row = row;
        tile.col = col;
      };
    };

    this.tilesGroup = tilesGroup;

    this.destroyMatchedTiles();
  };

  setTileSize(tile) {
    // Dynamic Tile Size Set
    this.playAreaSize.tileWidth = tile.width;
    this.playAreaSize.tileHeight = tile.height;
  };

  calculatePadding() {
    // Dynamic Left Padding Calculation
    this.playAreaSize.tilePaddingLeftAndRight = (this.game.width - (this.playAreaSize.offsetX * 2) - this.playAreaSize.tileWidth * (this.gridSize.width)) / (this.gridSize.width - 1);
  };

  selectTile(tile) {

    if (this.cursorDisabled) return; 
    
    tile.alpha = 0.65;

    //Swap Tiles
    if (this.selectedTile) {
      tile.alpha = 1;
      this.selectedTile.alpha = 1;

      //Check if swap available
      if (!this.isSwapAvailable(this.selectedTile, tile)) {
        this.selectedTile = null;
        return;
      };

      //Swap
      this.swapTiles(tile);
      // this.destroyMatchedTiles();

      //Destroy tiles
      // setTimeout(() => { this.destroyMatchedTiles(); }, 500);  
      return;
    };

    this.selectedTile = tile;
  };

  swapTiles(tile) {
    // console.log(JSON.stringify(this.tilesArray));

    const bufferFirstValue = this.tilesArray[tile.row][tile.col];
    const bufferSecondValue = this.tilesArray[this.selectedTile.row][this.selectedTile.col];

    this.tilesArray[tile.row][tile.col] = bufferSecondValue;
    this.tilesArray[this.selectedTile.row][this.selectedTile.col] = bufferFirstValue;

    this.drawTiles();

    // console.log(JSON.stringify(this.tilesArray));

    // [this.selectedTile.position.x, tile.position.x] = [tile.position.x, this.selectedTile.position.x];
    // [this.selectedTile.position.y, tile.position.y] = [tile.position.y, this.selectedTile.position.y];

    this.selectedTile = null;
  };

  isSwapAvailable(firsTile, secondTile) {
    if (
      firsTile.position.x === secondTile.position.x
      &&
      Math.abs(firsTile.position.y - secondTile.position.y) < (2 * this.playAreaSize.tileHeight + this.playAreaSize.tilePaddingTopAndBottom)
      &&
      firsTile.key != secondTile.key
    ) {
      return true;
    };
    if (
      firsTile.position.y === secondTile.position.y
      &&
      Math.abs(firsTile.position.x - secondTile.position.x) < (2 * this.playAreaSize.tileWidth + this.playAreaSize.tilePaddingLeftAndRight)
      &&
      firsTile.key != secondTile.key
    ) {
      return true;
    };
  };

  getMatch(matrix) {
    const matchList = [];

    //Horizontal Check Match
    for (let row = 0; row < this.gridSize.height; row++) {
      let match = 1;

      for (let col = 0; col < this.gridSize.width; col++) {

        //Check If Last Tile
        if (col + 1 === this.gridSize.width) {
          if (match >= 3) {
            matchList.push({
              length: match, startPoint: {
                row: row,
                col: col + 1 - match
              }, horizontal: true
            });
            break;
          };
        };

        if (col != this.gridSize.height - 1) {
          //Increase Match Value
          if (matrix[row][col] === matrix[row][col + 1]) {
            match += 1;
          };

          //Reset Match Value
          if (matrix[row][col] != matrix[row][col + 1] && match < 3) {
            match = 1;
          };

          //Save Match Value
          if (matrix[row][col] != matrix[row][col + 1]) {
            if (match >= 3) {
              matchList.push({
                length: match, startPoint: {
                  row: row,
                  col: col + 1 - match
                }, horizontal: true
              });
              match = 1;
            };
          };
        };
      };
    };

    // Vertical Check Match
    for (let col = 0; col < this.gridSize.width; col++) {
      let match = 1;

      for (let row = 0; row < this.gridSize.height; row++) {

        //Check If Last Tile
        if (row + 1 === this.gridSize.height) {
          if (match >= 3) {
            matchList.push({
              length: match, startPoint: {
                row: row + 1 - match,
                col: col
              }, horizontal: false
            });
            break;
          }
        }

        if (row != this.gridSize.height - 1) {
          //Increase Match Value
          if (matrix[row][col] === matrix[row + 1][col]) {
            match += 1;
          };

          //Reset Match Value
          if (matrix[row][col] != matrix[row + 1][col] && match < 3) {
            match = 1;
          };

          //Save Match Value
          if (matrix[row][col] != matrix[row + 1][col]) {
            if (match >= 3) {
              matchList.push({
                length: match, startPoint: {
                  row: row + 1 - match,
                  col: col
                }, horizontal: false
              });
              match = 1;
            };
          };
        };
      };
    };

    // console.log('Match: ', matchList);

    return matchList;
  };

  destroyMatchedTiles() {
    const matchedTiles = this.getMatch(this.tilesArray);
    if (matchedTiles[0] === undefined) {
      this.cursorDisabled = false;
      return;
    };

    this.cursorDisabled = true;

    const destructionArray = [];

    //Fill destructionArray with false values
    for (let i = 0; i < this.gridSize.width * this.gridSize.height; i++) {
      destructionArray[i] = false;
    };

    //Add destruction item's inde to destructionArray
    matchedTiles.map(({ length, startPoint: { row, col }, horizontal }) => {

      //Horizontal Matches
      if (horizontal) {
        const startPosition = (row) * this.gridSize.width + col;
        const endPosition = startPosition + length;

        for (let i = startPosition; i < endPosition; i++) {
          destructionArray[i] = true;
          this.increseScore(1);
        };

      };

      //Vertical Matches
      if (!horizontal) {
        const startPosition = (row) * this.gridSize.width + col;
        const endPosition = startPosition + (length - 1) * this.gridSize.width;

        for (let i = startPosition; i <= endPosition; i += this.gridSize.width) {
          destructionArray[i] = true;
          this.increseScore(1);
        };
      };
    });

    //Remove Children
    for (let i = 0; i < this.gridSize.width * this.gridSize.height; i++) {
      if (destructionArray[i]) {
        setTimeout(() => {
          this.tilesGroup.children[i].alpha = 0.5;
        }, 1000);
      };
    };

    setTimeout(() => {
      this.updateTilesArray(destructionArray);
    }, 500);
  };

  updateTilesArray(destructionArray) {

    //Build Deleted Objects Map
    let index = 0;

    // const tilesArrayShallowCopy = this.tilesArray.concat(); //.concat() and spread don't give shallow copy. Keeps refer to original array. Babel bug?
    // const tilesArrayShallowCopy = [...this.tilesArray];
    const tilesArrayShallowCopy = [...this.tilesArray];
    const tilesArrayShallowCopyString = JSON.stringify(this.tilesArray);

    for (let row = 0; row < this.tilesArray.length; row++) {
      for (let col = 0; col < this.tilesArray[row].length; col++) {
        tilesArrayShallowCopy[row][col] = destructionArray[index];
        index++;
      };
    };

    this.tilesArray = JSON.parse(tilesArrayShallowCopyString);

    //Delete Matched Tiles From tilesArray
    for (let row = 0; row < this.tilesArray.length; row++) {
      for (let col = 0; col < this.tilesArray[row].length; col++) {
        if (tilesArrayShallowCopy[row][col]) {
          tilesArrayShallowCopy[row][col] = null;
        } else {
          tilesArrayShallowCopy[row][col] = this.tilesArray[row][col];
        };
      };
    };


    //Shift Values Down, 'null' up. Iteration required to up all 'null' above values
    for (let iteration = 0; iteration < this.tilesArray.length; iteration++) {
      for (let row = this.tilesArray.length - 1; row > 0; row--) {
        for (let col = this.tilesArray[row].length - 1; col > -1; col--) {

          if (tilesArrayShallowCopy[row][col] === null) {

            //Swap values if required
            if (tilesArrayShallowCopy[row - 1][col] !== null) {

              tilesArrayShallowCopy[row][col] = tilesArrayShallowCopy[row - 1][col];
              tilesArrayShallowCopy[row - 1][col] = null;
            };
          };
        };
      };
    };

    //Fill arrray where empty('null') 
    for (let row = 0; row < this.tilesArray.length; row++) {
      for (let col = 0; col < this.tilesArray[row].length; col++) {
        if (tilesArrayShallowCopy[row][col] === null) {
          let randomTileIndex = Math.floor(Math.random() * (this.tileList.length));
          tilesArrayShallowCopy[row][col] = this.tileList[randomTileIndex];
        };
      };
    };

    this.tilesArray = tilesArrayShallowCopy;

    setTimeout(() => { this.drawTiles(); }, 1250); 
  };

  increseScore(score) {
    this.score += score * 25;

    this.scoreText.text = this.score;
  };

  startTimer() {
    this.timeIntervalID = setInterval(() => { this.updateTimer() }, 1000);
  };

  updateTimer() {
    if (this.restOfTime > 0) { 

      this.restOfTime = this.restOfTime - 1;
      this.timeText.text = `Time: ${this.restOfTime}`;
      if (this.restOfTime < 1) this.cursorDisabled = true;
      
    } else {
      //Go to result screen
      this.game.gameScore = this.score;
      clearInterval(this.timeIntervalID);
      this.state.start('ResultState');                        
    };
  };
};

export default GameState;   
