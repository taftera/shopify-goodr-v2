import {assets_image_url, assets_sound_url, globals} from "https://cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/globals.js?v1"

export class LoadGameScene extends Phaser.Scene{
    constructor(){
        super({
            key: globals.SCENES.LOADGAME
        })
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){        
        this.load.image('ground', assets_image_url + "platform.png");
        this.load.atlas("flamingo", assets_image_url + "spritesheet-flamingo.png", assets_image_url + 'flamingo_altas.json');
        this.load.audio('game_music',  assets_sound_url + 'game-music.mp3');
        this.load.audio('jump_sound',  assets_sound_url + 'jump-sound.mp3');      
        this.load.audio('start_sound',  assets_sound_url + 'game-start.mp3');
        this.load.audio('death-sound', assets_sound_url + 'death-sound.mp3');
        this.load.audio('pickup-sound', assets_sound_url + 'pickup-sound.mp3');

    
        let loadingBar = this.add.graphics({
            fillStyle:{
                color: 0xffffff
            }
        });
        
        this.load.on('progress', (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        })
        
    }
    
    create(){
        this.add.text(this.game.renderer.width * 0.44, this.game.renderer.height * 0.40, 'Loading...', { fontSize: '35px', fill: '#FFF', fontFamily: 'monogram' });
        this.scene.start(globals.SCENES.GAME, "Starting Game...");
    } 
}