import {globals} from "https://cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/globals.js?v1"

export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: globals.SCENES.MENU
        })
    }

    init(data){
        console.log(data);
        this.started = false;
    }


    create(){
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

        // Background
        this.add.image(0, 0, 'background').setOrigin(0);
        
        // Logo
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.30, 'logo');
        
        // Circles to prevent button transparency
        this.add.circle(this.game.renderer.width * .38, this.game.renderer.height * 0.65, 64, 0x3CC2B1);
        this.add.circle(this.game.renderer.width * .61, this.game.renderer.height * 0.65, 64, 0x3CC2B1);
        
        // UI Elements
        let play_button = this.add.image(this.game.renderer.width * .38, this.game.renderer.height * 0.65, 'play_button').setInteractive();
        let leaderboard_button = this.add.image(this.game.renderer.width * .61, this.game.renderer.height * 0.65, 'leaderboard_button').setInteractive();


        //Sound and Music
        let sound_button = this.add.image(this.game.renderer.width * .84, this.game.renderer.height * .06, 'ui_buttons', !globals.isSoundMuted ? 'sound_on.png': 'sound_off.png').setScale(0.22).setInteractive();
        sound_button.flipX = true;
        let music_button = this.add.image(this.game.renderer.width * .95, this.game.renderer.height * .06, 'ui_buttons', !globals.isMusicMuted ? 'music_on.png': 'music_off.png').setScale(0.22).setInteractive();


        this.flamingo = this.add.sprite(this.game.renderer.width * 0.12,this.game.renderer.height / 1.5, "flamingo", "flamingo_0.png");

        this.music = this.sound.add('title_music');

        if(!globals.isMusicMuted){
            this.music.play({loop: true});
        }

        this.tweens.add({
            targets: this.music,
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

        play_button.on('pointerup', ()=>{
            this.music.stop();
            this.started = true;
        });
        
        leaderboard_button.on("pointerup", () => {
            this.music.stop();
            this.scene.start(globals.SCENES.LOADLEADERBOARD, "Loading Leaderboard...");
        });

        sound_button.on("pointerup", () => {
            globals.isSoundMuted = !globals.isSoundMuted;
            if(globals.isSoundMuted){
                sound_button.setTexture('ui_buttons', 'sound_off.png');
            }
            else{
                sound_button.setTexture("ui_buttons", "sound_on.png");
            }
        });

        music_button.on("pointerup", () => {
            globals.isMusicMuted = !globals.isMusicMuted;
            if(globals.isMusicMuted){
                this.music.pause();
                music_button.setTexture('ui_buttons', 'music_off.png');
            }
            else{
                this.music.play();
                music_button.setTexture("ui_buttons", "music_on.png");
            }
        });

        this.flamingo.play('run');
    }

    update(){
        if(this.started){
            this.flamingo.x += 30;
        }

        if(this.flamingo.x > 900){
            this.scene.start(globals.SCENES.LOADGAME, "Loading Game...");
        }
        
    }
}