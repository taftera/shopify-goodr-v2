import {globals} from "https://cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/globals.js?v1"

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: globals.SCENES.GAME,
        });
    }
    
    init(data) {
        console.log(data);
        this.game_options = {
            'jump-speed': -1025,
            'enemy-speed': -600,
            'enemy-min-distance': 700,
            'item-speed': -400,
            'item-min-distance': 700,
            'shrimp-points': 25,
            'cocktail-points': 50,
            'ogs-points': 100,
        }
        // Score
        this.score = 0;
    }
    
    
    create() {
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNames("flamingo", {
                prefix: "flamingo_",
                suffix: ".png",
                start: 0,
                end: 3,
            }),
            frameRate: 15,
            repeat: -1,
        });
        
        this.anims.create({
            key: "jump",
            frames: [{ key: "flamingo", frame: "flamingo_4.png" }],
            frameRate: 10,
        });

        // Platform
        this.platform = this.physics.add.staticGroup();
        this.platform.create(0, this.game.renderer.height / 1.5 + 90, "ground").setOrigin(0).refreshBody();
        
        // Background
        this.background = this.add.image(0, 0, "background").setOrigin(0);
        this.scoreText = this.add.text(16, 0, 'SCORE: 0', { fontSize: '60px', fill: '#000', fontFamily: 'monogram'});
                
        // Player
        this.player = this.physics.add.sprite(0, this.game.renderer.height / 1.5, "flamingo", "flamingo_0.png");

        // Player Physics
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platform);
        this.player.body.setSize(this.player.width/3.0, this.player.height - 20).setOffset(25, 5);
        
        let music = this.sound.add('game_music');
        if(!globals.isMusicMuted){
            music.play({loop: true});
        }
        
        this.tweens.add({
            targets: music,
            volume: {
                getStart: function () {
                    return 0;
                },
                getEnd: function () {
                    return 0.8;
                }
            },
            duration: 3000,
            ease: 'Linear'
        });
        
        this.enemyGroup = this.add.group();
        this.itemGroup = this.add.group();
        
        // Game Over Condition
        // Collision for Enemies
        this.physics.add.overlap(this.player, this.enemyGroup, function(){
            if(!globals.isSoundMuted){this.sound.play('death-sound');}
            music.stop();
            this.scene.start(globals.SCENES.LOADGAMEOVER, {score: this.score});
        }, null, this);
       
        
        // Collision for Items
        this.physics.add.overlap(this.player, this.itemGroup, function(player, item){
            if(!globals.isSoundMuted){
                this.sound.play('pickup-sound')
            }
            if(item.frame['name'] == 'shrimp.png'){ this.score += this.game_options['shrimp-points']}
            if(item.frame['name'] == 'cocktail.png'){ this.score += this.game_options['cocktail-points'];}
            if(item.frame['name'] == 'ogs.png'){ this.score += this.game_options['ogs-points'];}            
            this.itemGroup.killAndHide(item);
            this.itemGroup.remove(item);
            this.scoreText.setText("SCORE: " + this.score);
        }, null, this);

        // First Enemy
        this.addEnemy(1300);
        // First Item
        this.addItem(1000, 250);

        // Enemies spawn every 1.1 - 1.2 seconds?
        this.time.addEvent({
            delay: Phaser.Math.Between(11*100,12*100),
            callback: () => {
                this.addEnemy(Phaser.Math.Between(10*100, 16*100));
            },
            loop: true,
        });
        
        if(!globals.isSoundMuted){
            this.sound.play("start_sound");
        }

    } // End Create
    
    update() {
        // Flamingo looks like it is running in
        if (this.player.x < this.game.renderer.width * 0.12) {
          this.player.x += 10;
        }

        // Constant running animation
        if (this.player.body.onFloor()) {
            this.player.play("run", true);
        }
        
        //Enemy Respawning
        let enemyMinDistance = this.game_options['enemy-min-distance'];            
        this.enemyGroup.getChildren().forEach(function (enemy) {
            let enemyDistance = this.game_options['enemy-min-distance'] - enemy.x - enemy.displayWidth / 2;
            if(enemyDistance < enemyMinDistance){
                enemyMinDistance = enemyDistance;
            }
            
            // Once it goes off screen, remove the enemy
            if (enemy.x < 10) {
                this.score += 10;
                this.scoreText.setText("SCORE: " + this.score);
                this.enemyGroup.killAndHide(enemy);
                this.enemyGroup.remove(enemy);
            }

        }, this);

            
        // Item Respawning
        let itemMinDistance = this.game_options['item-min-distance'];
        this.itemGroup.getChildren().forEach(function (item) {
            let itemDistance = itemMinDistance - item.x - item.displayWidth / 2;
            if(itemDistance < itemMinDistance){
                itemMinDistance = itemDistance;
            }
            if (item.x < 10) {
                this.itemGroup.killAndHide(item);
                this.itemGroup.remove(item);
            }
        }, this);
        
        if(itemMinDistance > this.nextItemDistance){
            this.addItem(Phaser.Math.Between(900, 1500), Phaser.Math.Between(220,400));
        }
        
        
        // Player can jump by pressing the space bar or clicking
        if ((this.input.activePointer.isDown) && this.player.body.onFloor()) {
            this.jump();
        }
    } // End Update

    jump(){
        if (!globals.isSoundMuted) this.sound.play("jump_sound");
        this.player.play("jump", true);
        this.player.setVelocityY(this.game_options["jump-speed"]);
    }

    addEnemy(posX) {
        let enemy;

        let chance = Phaser.Math.FloatBetween(0,11);
        if (chance > 5) {
            enemy = this.physics.add.sprite(posX, 430, "flamingo", "uv.png").setScale(1.3);
            enemy.body.setSize(enemy.width - 40, enemy.height - 30).setOffset(10,15);
        } else {
            enemy = this.physics.add.sprite(posX, 430, "flamingo", "bluelight.png").setScale(1.3);
            enemy.body.setSize(enemy.width - 40, enemy.height - 30).setOffset(0,15);

        }
        this.physics.add.existing(enemy);
        enemy.body.setImmovable(true);
        enemy.body.setAllowGravity(false);
        enemy.setVelocityX(this.game_options['enemy-speed']);
        this.enemyGroup.add(enemy);
        
    }
    
    addItem(posX, posY) {
        let item;

        let chance = Phaser.Math.Between(0, 11);
        if (chance > 0 && chance <= 5 ) {
            item = this.physics.add.sprite(posX, posY, "flamingo", "cocktail.png");
        }
        else if((chance > 5 && chance <= 8)) {
            item = this.physics.add.sprite(posX, posY, "flamingo", "shrimp.png");
        }
        else{
            item = this.physics.add.sprite(posX, posY, "flamingo", "ogs.png");
        }
        this.physics.add.existing(item);
        item.body.setSize(item.width + 20, item.height + 20).setOffset(-10, 0);
        item.body.setImmovable(true);
        item.body.setAllowGravity(false);
        item.setVelocityX(this.game_options['item-speed']);
        this.itemGroup.add(item);
        
        this.nextItemDistance = Phaser.Math.Between(80, 300);

    }
}