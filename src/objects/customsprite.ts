var animationCreator = (anims: any, sprite: any, key: any, start: any, end: any, frameRate: any, repeat: any) => {
    anims.create({
        key,
        frames: anims.generateFrameNumbers(sprite, {
            start,
            end,
        }),
        frameRate,
        repeat, // infinite repeat
    });
};


export class CustomSprite extends Phaser.Physics.Arcade.Sprite {
    private cursors: any;
    private speed: any;
    private keys: any;
    private keyUpMap: any;
    private facingDirection: string;
    private attackEventMap: Object;
    private idleEventMap: Object;
    private controlled: boolean;
    private spriteName: string;
    private info: any;
    private thinkInterval:any;
    private currentDirection:string;
    private isLeft: boolean;
    private isRight: boolean;
    private isUp: boolean;
    private isDown: boolean;
    private directions: any;
    private minUpdatetime: number;
    private maxUpdatetime: number;
    private id: string;

    constructor(scene: any, x: any, y: any, controlled: boolean, name: string, info: any, speed: Number = 0.5, scale: number = 2) {
        super(scene, x, y, 'player');
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        //  You can either do this:
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.createAnimations(scene)
        this.play(name);
        this.controlled = controlled;
        this.facingDirection = "down";
        this.setSize(16, 16);
        this.setScale(scale);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.speed = speed;
        this.spriteName = name;
        this.info = info;
        this.currentDirection = "";
        this.thinkInterval = null;
        this.minUpdatetime = 1000;
        this.maxUpdatetime = 5000;
        this.id = info.id 

        this.directions = {up: false, down: false, left: false, right: false }

        this.keys = scene.input.keyboard.addKeys("W,A,S,D");
        this.keyUpMap = [
            { key: 'keyup-DOWN', animation: 'down-idle' },
            { key: 'keyup-UP', animation: 'up-idle' },
            { key: 'keyup-LEFT', animation: 'left-idle' },
            { key: 'keyup-RIGHT', animation: 'right-idle' },
            { key: 'keyup-W', animation: 'up-idle' },
            { key: 'keyup-A', animation: 'left-idle' },
            { key: 'keyup-S', animation: 'down-idle' },
            { key: 'keyup-D', animation: 'right-idle' },
        ]
        this.attackEventMap = {
            down: "down-attack",
            up: "up-attack",
            right: "right-attack",
            left: "left-attack"
        }

        this.idleEventMap = {
            down: "down-idle",
            up: "up-idle",
            right: "right-idle",
            left: "left-idle"
        }

        if (this.controlled) {
            this.createKeyUpEvents(scene);
            this.createAttackEvents(scene);
        }


        this.startThinking();
    }

    createAttackEvents(scene: any) {
        scene.input.keyboard.on("keydown-SPACE", function (event: any) {
            //this.play(this.attackEventMap[this.facingDirection])
        }.bind(this));

        scene.input.keyboard.on("keyup-SPACE", function (event: any) {
            this.play(this.idleEventMap[this.facingDirection])
        }.bind(this));
    }

    createKeyUpEvents(scene: any) {
        for (let i in this.keyUpMap) {
            let { key, animation } = this.keyUpMap[i];
            scene.input.keyboard.on(key, function (event: any) {
                //if (this.controlled) this.play(animation, true);
            }.bind(this));
            //console.log(key, animation)
        }
    }

    generateAnimations(scene: any) {
        for (let i: number = 0; i < 4; i++){
            console.log( `cow-${i+1}`)
            animationCreator(scene.anims, `cow-${i+1}`, `down-idle-${i+1}`, 0, 0, 6, -1);
            animationCreator(scene.anims, `cow-${i+1}`, `down-${i+1}`, 0, 3, 6, -1);
            animationCreator(scene.anims, `cow-${i+1}`, `up-idle-${i+1}`, 4, 4, 6, -1);
            animationCreator(scene.anims, `cow-${i+1}`, `up-${i+1}`, 4, 7, 6, -1);
            animationCreator(scene.anims, `cow-${i+1}`, `left-idle-${i+1}`, 8, 8, 6, -1);
            animationCreator(scene.anims, `cow-${i+1}`, `left-${i+1}`, 8, 11, 6, -1);
            animationCreator(scene.anims, `cow-${i+1}`, `right-idle-${i+1}`, 12, 12, 6, -1);
            animationCreator(scene.anims, `cow-${i+1}`, `right-${i+1}`, 12, 15, 6, -1);
        }
    }

    createAnimations(scene: any) {

        this.generateAnimations(scene);
        animationCreator(scene.anims, "plants", "p1", 0, 0, 6, -1);
        animationCreator(scene.anims, "plants", "p2", 63, 63, 6, -1);
        animationCreator(scene.anims, "plants", "p3", 111, 111, 6, -1);
    }

    downIdle(cowID: any){
        console.log("----->", `down-idle${cowID}`)
        this.play(`down-idle-${cowID}`, true);
        this.stop();
        this.facingDirection = "downI";
    }

    upIdle(cowID: any) {
        this.play(`up-idle${cowID}`, true);
        this.stop();
        this.facingDirection = "upI";
    }

    leftIdle(cowID: any) {
        this.play(`left-idle${cowID}`, true);
        this.stop();
        this.facingDirection = "leftI";
    }

    rightIdle(cowID: any) {
        this.play(`right-idle${cowID}`, true);
        this.stop();
        this.facingDirection = "rightI";
    }

    up(cowID: any) {
        this.play(`up${cowID}`, true);
        this.y -= this.speed;
        this.facingDirection = "up";
    }

    left(cowID: any) {
        //console.log(this.x, this.y)
        this.play(`left${cowID}`, true);
        this.x -= this.speed;
        this.facingDirection = "left";
    }

    right(cowID: any) {
        this.play(`right${cowID}`, true);
        this.x += this.speed;
        this.facingDirection = "right";
    }

    down(cowID: any) {
        this.play(`down${cowID}`, true);
        this.y += this.speed;
        this.facingDirection = "down";
    }

    updateDirection() {
        let options = ["left", "right", "down", "up", "leftI", "rightI", "downI", "upI"]
        if (this.currentDirection !== "") {
            //console.log(this.currentDirection)
            this.directions[this.currentDirection] = false
        }
        var newDirection = options[Math.floor(Math.random()*options.length)];
        this.currentDirection = newDirection
        //console.log(newDirection)
        this.directions[newDirection] = true
    }

    startThinking(){
        let updateTime = this.minUpdatetime + (Math.random() * this.maxUpdatetime)
        //console.log(updateTime)
        this.updateDirection()
        this.thinkInterval = setInterval(this.updateDirection.bind(this), updateTime)
    }

    update() {

        
        if (this.controlled) {
            this.setVelocity(0)

            if (this.directions.left) {
                this.left(this.id)
            }

            else if (this.directions.rightI){
                this.rightIdle(this.id)
            }

            else if (this.directions.leftI) {
                this.leftIdle(this.id)
            }

            else if (this.directions.upI) {
                this.upIdle(this.id)
            }

            else if (this.directions.downI) {
                this.downIdle(this.id)
            }

            else if (this.directions.right) {
                this.right(this.id)
            }

            else if (this.directions.up) {
                this.up(this.id)
            }
            else if (this.directions.down) {
                this.down(this.id)
            }

        }
    }

}
