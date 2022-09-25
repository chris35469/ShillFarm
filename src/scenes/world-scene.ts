

import { CustomSprite } from '../objects/customsprite';

declare global {
  interface Window { Game: any; }
}

window.Game = window.Game || {};

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

export class WorldScene extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite;
  private cows: Phaser.GameObjects.Group;
  private plants: Phaser.GameObjects.Group;
  private mushrooms: Phaser.GameObjects.Group;
  private cowCount: Number;
  private plantCount: Number;
  private mushroomCount: Number;
  private grassCount: Number;
  private urls: Array<string>;
  private maxDelay: number;
  private minDelay: number;
  private cowLink: string;
  private cowLinks: any;

  constructor() {
    super({
      key: 'WorldScene'
    });

  }

  preload(): void { 

  }

  init(): void {
    console.log("init")
    this.cowCount = 10;
    this.plantCount = 20;
    this.mushroomCount = 30;
    this.grassCount = 50;
    this.maxDelay = 20000;
    this.minDelay = 5000;
    
    this.cows = this.add.group({});
    this.plants =  this.add.group({});
    this.mushrooms =  this.add.group({});
    this.urls = [
      "https://w3bbie.xyz/", 
      "https://opensea.io/collection/found-on-mars", 
      "http://nastypass.xyz/", 
      "https://w3bbie.xyz/yolo/",
      "https://twitter.com/MIKEFLOSSMUSIC/status/1515030695730720771?s=20&t=hwYujcrE148YXuF_CNALjQ",
      "https://twitter.com/ShimmiApp",
      "https://twitter.com/w3bbie_xyz",
      "https://twitter.com/BigTrav205",
      "https://polygon.technology/",
      "https://www.superfluid.finance/",
      "https://ethglobal.com/",
      "https://yearn.finance/"
    ]

    this.cowLink = "https://opensea.io/assets/ethereum/0x977ce3824a8f818c2c78b8e705b91d089ae0f4dd/"

    this.cowLinks = [
      "https://www.partybid.app/buy/0x46cA5cD512EafA729Ff2e7Ee481994b5F323EdDb",
      "https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/91528526890610761304768756408612961673415435662522493420975109596177802199041",
      "https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/91528526890610761304768756408612961673415435662522493420975109597277313826817",
      "https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/91528526890610761304768756408612961673415435662522493420975109598376825454593"
    ]
  }

  createCows(): void {
    this.createCow("-1")
    this.createCow("-2")
    this.createCow("-3")
    this.createCow("-4")

  }

  createCow(id: string): void {
    let x = this.sys.game.canvas.width * Math.random();
    let y = this.sys.game.canvas.height * Math.random();
    let cow = new CustomSprite(this, x, y, true, `down-idle${id}`, {type: "cow", id});
    cow.setInteractive()

    
    cow.on('pointerdown', function () {
      //var link = this.urls[Math.floor(Math.random()*this.urls.length)];
      let index = parseInt(id.replace("-", "")) - 1 
      window.open(this.cowLinks[index], '_blank');
    }.bind(this))

   cow.depth = 100
    

    this.cows.add(cow);
  }

  createMushrooms(): void{
    for (let i = 0; i < this.mushroomCount; i++){
      this.createMushroom()
    }
  }

  createMushroom(x: number = null, y: number = null): void{
    if (x == null || y == null){
       x = this.sys.game.canvas.width * Math.random();
       y = this.sys.game.canvas.height * Math.random();
    }
   
    let mushroom = new CustomSprite(this, x, y, false, "p2", {type: "mushroom"});
    mushroom.setInteractive()
    mushroom.on('pointerdown', function () {
      mushroom.destroy();
      var link = this.urls[Math.floor(Math.random()*this.urls.length)];
      window.open(link, '_blank');
    }.bind(this))
    this.mushrooms.add(mushroom);
  }

  createGrassSprite(): void{
    let x = this.sys.game.canvas.width * Math.random();
    let y = this.sys.game.canvas.height * Math.random();
    let grass = new CustomSprite(this, x, y, false, "p3", {type: "grass"});

  }

  createGrassPatches(): void{
    for (let i = 0; i < this.grassCount; i++){
      this.createGrassSprite()
    }
  }

  createPlants(): void {
    for (let i = 0; i < this.plantCount; i++){
      this.createPlant()
    }
  }

  createPlant(x: number = null, y: number = null): void {
    if (x == null || y == null){
      x = this.sys.game.canvas.width * Math.random();
      y = this.sys.game.canvas.height * Math.random();
    }

    let plant = new CustomSprite(this, x, y, false, "apple", {type: "apple"});
    this.plants.add(plant);
  }

  create(): void {
    this.createGrassPatches();
    this.createCows();
    let song = this.sound.add('song');
    song.play("", {loop:true});

    let charge = this.sound.add('charge');
    

    this.physics.add.collider(this.cows, this.plants, function (cow: any, plant: any) {
      plant.destroy()
      charge.play()
      let produceDelay = this.minDelay + Math.random() * this.maxDelay;
      setInterval(() => {this.createMushroom(cow.body.x, cow.body.y)}, produceDelay)
    }.bind(this))


    /*
    this.physics.add.collider(this.cows, this.mushrooms, function (cow: any, mushroom: any) {
      mushroom.destroy()
    })*/

    this.input.on('pointerdown', function (pointer: any) {

      console.log('down');

      //console.log(pointer)

      this.createPlant(pointer.worldX, pointer.worldY)

  }, this);

  }


  update(): void {
  }

}
