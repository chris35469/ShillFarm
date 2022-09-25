var animationCreator = (anims: any, spritesheetID: any, animationKey: any, start: any, end: any, frameRate: any, repeat: any) => {
  anims.create({
      animationKey,
      frames: anims.generateFrameNumbers(spritesheetID, {
          start,
          end,
      }),
      frameRate,
      repeat, // infinite repeat
  });
};


export class BootScene extends Phaser.Scene {
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;
  
  constructor() {
    super({
      key: 'BootScene'
    });

    
    
  }

  preload(): void {
    // set the background and create loading bar
    this.cameras.main.setBackgroundColor(0x98d687);
    this.createLoadingbar();

    // pass value to change the loading bar fill
    this.load.on(
      'progress',
      function (value: number) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xfff6d3, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    // delete bar graphics, when loading complete
    this.load.on(
      'complete',
      function () {
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );

    this.load.pack('preload', './assets/pack.json', 'preload');

    //audio
    //this.load.audio('song', '../assets/sounds/song.mp3');
    //this.load.audio('charge', '../assets/sounds/c.wav');

  }

  update(): void {
   this.scene.start('MainMenuScene');
   //this.scene.start('WorldScene');
  }


  createAnimations() {
    //animationCreator(this.anims, "cow-purple", "down", 1, 4, 6, -1);
  }

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x5dae47, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}
