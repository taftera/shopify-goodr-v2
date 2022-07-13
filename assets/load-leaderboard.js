import {assets_image_url, globals} from "https://cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/globals.js?v1"

export class LoadLeaderboardScene extends Phaser.Scene{
    constructor(){
        super({
            key: globals.SCENES.LOADLEADERBOARD
        })
    }
    
    init(){
    }
    
    preload(){
        this.data = {};
        this.load.image('leaderboard', assets_image_url + 'leaderboard.png');
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
        let self = this;
        $.ajax({
            type: "GET",
            url: "https://goodr.modernlabyrinth.com/scores",
            success: function (scores) {
                self.scene.start(globals.SCENES.LEADERBOARD, scores);
            },
            error: function () {
                self.scene.start(globals.SCENES.LEADERBOARD, null);
            },
        });
    };
}
