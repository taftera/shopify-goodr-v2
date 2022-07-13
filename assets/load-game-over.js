import {assets_image_url, globals} from "https://cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/globals.js?v1"

export class LoadGameOverScene extends Phaser.Scene{
    constructor(){
        super({
            key: globals.SCENES.LOADGAMEOVER
        })
    }
    
    init(data){
        this.loading_score = data
    }

    preload(){
        this.load.image('game_over', assets_image_url + 'game-over.png');
        this.load.image('speech_bubble', assets_image_url + 'speech-bubble.png');
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
        this.scene.start(globals.SCENES.GAMEOVER, this.loading_score);
    } 
}