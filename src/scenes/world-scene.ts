

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
      "https://twitter.com/BigTrav205"
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
    let cow = new CustomSprite(this, x, y, true, "down-idle", {type: "cow", id});
    cow.setInteractive()
    cow.on('pointerdown', function () {
      var link = this.urls[Math.floor(Math.random()*this.urls.length)];
      window.open(link, '_blank');
    }.bind(this))

    this.cows.add(cow);
  }

  createMushrooms(): void{
    for (let i = 0; i < this.mushroomCount; i++){
      this.createMushroom()
    }
  }

  createMushroom(): void{
    let x = this.sys.game.canvas.width * Math.random();
    let y = this.sys.game.canvas.height * Math.random();
    let mushroom = new CustomSprite(this, x, y, false, "p2", {type: "mushroom"});
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

  createPlant(): void {
    let x = this.sys.game.canvas.width * Math.random();
    let y = this.sys.game.canvas.height * Math.random();
    let plant = new CustomSprite(this, x, y, false, "p1", {type: "plant"});
    this.plants.add(plant);
  }

  create(): void {
    this.createGrassPatches();
    this.createMushrooms();
    this.createPlants();
    this.createCows();
    

    this.physics.add.collider(this.cows, this.plants, function (cow: any, plant: any) {
      plant.destroy()
    })

    this.physics.add.collider(this.cows, this.mushrooms, function (cow: any, mushroom: any) {
      mushroom.destroy()
    })

    this.input.on('pointerdown', function (pointer: any) {

      console.log('down');

      console.log(pointer)
  }, this);

  }


  update(): void {
  }

}
