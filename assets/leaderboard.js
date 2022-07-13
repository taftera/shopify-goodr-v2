import {globals} from "https://cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/globals.js?v1"

export class LeaderboardScene extends Phaser.Scene{
    constructor(){
        super({
            key: globals.SCENES.LEADERBOARD
        })
    }

    init(data){
        this.scores = data;
        
    }


    create(){
        this.add.image(0, 0, 'background').setOrigin(0);
        this.flamingo = this.add.sprite(this.game.renderer.width * .12, this.game.renderer.height / 1.5, 'flamingo', 'flamingo_0.png');
        this.leaderboard = this.add.image(this.game.renderer.width * 0.225, this.game.renderer.height * 0.07, 'leaderboard').setOrigin(0);
        this.back_button = this.add.image(this.game.renderer.width * 0.05, this.game.renderer.height * 0.05, 'ui_buttons', 'arrow_left.png' ).setOrigin(0);
        this.back_button.setScale(0.25,0.25);
        this.back_button.setInteractive();

        this.back_button.on("pointerup", () => {
            this.scene.start(globals.SCENES.LOADMENU, "Loading Menu...");
        });

        let entry_x = this.game.renderer.width * 0.31;
        let entry_y = this.game.renderer.height * 0.25;
        if(!$.isEmptyObject(this.scores)){

            for (let prop in this.scores) {
                let name = this.scores[prop]['full_name'].padEnd(20, '.');
                let score = this.scores[prop]["score"].padStart(5, '.');
                let entry = name + score;
                this.add.text(entry_x, entry_y, entry, { fontSize: '35px', fill: '#FFF', fontFamily: 'monogram' });
                entry_y += 25;
            }
        }
        else{
            this.add.text(entry_x, entry_y, "Unable to get high scores", { fontSize: '35px', fill: '#FFF', fontFamily: 'monogram' })
        }
    }

    update(){

    }
}