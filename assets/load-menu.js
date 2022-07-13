import {assets_image_url, assets_sound_url, globals} from "https://cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/globals.js?v1"

export class LoadMenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: globals.SCENES.LOADMENU
        })
    }
    
    init(){

    }

    preload(){

        this.load.image('background', assets_image_url + 'title-background.png');
        this.load.image('play_button', assets_image_url + 'start-button.png');
        this.load.image('leaderboard_button', assets_image_url + 'high-scores.png');
        this.load.image('logo', assets_image_url + 'logo.png');
        this.load.atlas('ui_buttons', assets_image_url + 'ui_buttons.png', assets_image_url + 'ui_buttons.json');
        this.load.atlas('flamingo', assets_image_url + "spritesheet-flamingo.png", assets_image_url + 'flamingo_altas.json');
        this.load.audio('title_music', assets_sound_url + 'title-screen-music.mp3');

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
        this.scene.start(globals.SCENES.MENU, "Loading Menu...");
    } 
}