import {globals, global_name, global_email, setName, setEmail} from "https://cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/globals.js?v1"

const COLOR_PRIMARY = 0x000000;
const COLOR_LIGHT = 0xFFFFFF;
let score;

export class GameOverScene extends Phaser.Scene{
    constructor(){
        super({
            key: globals.SCENES.GAMEOVER
        })
    }
    
    init(data){
        score = data.score;
        if(score == '{}'){
            score = 0;
        }
    }
    
    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });        
    }
    
    create(){                    

        // Background
        this.add.image(0, 0, 'background').setOrigin(0);
            
        // Game Over
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.30, 'game_over');
        
        // Score
        this.add.text(this.game.renderer.width * 0.34, this.game.renderer.height * 0.42, 'SCORE: ' + score, { fontSize: '72px', fill: '#000', fontFamily: 'monogram'});
        
        //Sound and Music
        let sound_button = this.add.image(this.game.renderer.width * .84, this.game.renderer.height * .06, 'ui_buttons', !globals.isSoundMuted ? 'sound_on.png': 'sound_off.png').setScale(0.22).setInteractive();
        sound_button.flipX = true;
        let music_button = this.add.image(this.game.renderer.width * .95, this.game.renderer.height * .06, 'ui_buttons', !globals.isMusicMuted ? 'music_on.png': 'music_off.png').setScale(0.22).setInteractive();
        
        // Circles to prevent button transparency
        this.add.circle(this.game.renderer.width * .38, this.game.renderer.height * 0.65, 64, 0x3CC2B1);
        this.add.circle(this.game.renderer.width * .61, this.game.renderer.height * 0.65, 64, 0x3CC2B1);


        // Buttons
        let play_button = this.add.image(this.game.renderer.width * .38, this.game.renderer.height * 0.65, 'play_button').setInteractive();
        let leaderboard_button = this.add.image(this.game.renderer.width * .61, this.game.renderer.height * 0.65, 'leaderboard_button').setInteractive();          
        
        // Flamingo
        this.add.sprite(this.game.renderer.width * 0.12, this.game.renderer.height / 1.5, "flamingo", "flamingo_0.png");
        
        // Pop up Score Form
        if ((global_name === "" || global_email === "") && score > 0) {
            this.add.image(this.game.renderer.width * 0.16, this.game.renderer.height *0.45, 'speech_bubble').setScale(0.4);

            let scoreDialog = CreateScoreDialog(this, {
            x: 400,
            y: 140,
            width: 50,
            height: 75,
            title: "Record Your Scores!",
            full_name: "Full Name",
            email: "Email",
          }).popUp(500);
        }

        if(global_name !== "" && global_email !== "" && score > 0){
            let entry = {
                'full_name' : global_name,
                'email': global_email,
                'score': score,
            }

            $.ajax({
                url:"https://goodr.modernlabyrinth.com/score ",
                method:"POST",
                dataType: 'json',
                contentType: 'application/json', 
                data:JSON.stringify(entry),
            });
        }

        // Event Listeners
        play_button.on('pointerup', ()=>{
            this.scene.start(globals.SCENES.LOADGAME, "Loading Game...");
        });
        
        leaderboard_button.on("pointerup", () => {
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
                music_button.setTexture('ui_buttons', 'music_off.png');
            }
            else{
                music_button.setTexture("ui_buttons", "music_on.png");
            }
        });        
    }

    update(){
    }
}

const GetValue = Phaser.Utils.Objects.GetValue;
let CreateScoreDialog = function (scene, config, onSubmit) {
    let title = GetValue(config, "title", "");
    let full_name = '';
    let email = '';
    let x = GetValue(config, "x", 0);
    let y = GetValue(config, "y", 0);
    let width = GetValue(config, "width", undefined);
    let height = GetValue(config, "height", undefined);
    
    let background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);
    let titleField = scene.add.text(0, 0, title, {fontSize: '42px', fontFamily: 'monogram'});
    let full_name_label = scene.add.text(0,0, "Full Name",  {fontSize: '40px', fontFamily: 'monogram'});
    let email_label = scene.add.text(0,0, "Email",  {fontSize: '40px', fontFamily: 'monogram'});

    let full_name_field = scene.rexUI.add.label({
        orientation: "x",
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.rexUI.add.BBCodeText(0, 0, '', { fixedWidth: 225, fixedHeight: 28, valign: "center"}),
        space: { top: 5, bottom: 5, left: 10, right: 10},
        })
        .setInteractive()
        .on("pointerdown", function () {
            let config = {
                type: "text",
                onTextChanged: function (textObject, text) {
                    full_name = text;
                    textObject.text = text;
                },
            };
            scene.rexUI.edit(full_name_field.getElement("text"), config);
        });


    let emailField = scene.rexUI.add.label({
        orientation: "x", 
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.rexUI.add.BBCodeText(0, 0, '', {fixedWidth: 225, fixedHeight: 28, valign: "center"}),
        space: { top: 5, bottom: 5, left: 10, right: 10},
        })
        .setInteractive()
        .on("pointerdown", function () {
            let config = {
                type: "email",
                onTextChanged: function (textObject, text) {
                    email = text;
                    textObject.text = text;
                },
            };
            scene.rexUI.edit(emailField.getElement("text"), config);
        });
        
    let submitButton = scene.rexUI.add.label({
        orientation: "x",
        background: scene.rexUI.add.roundRectangle(0, 0, 5, 100, 5, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.add.text(0, 0, "SUBMIT",  {fontSize: '30px', fontFamily: 'monogram'}),
        space: { top: 0, bottom: 8, left: 5, right: 4},
        })
        .setInteractive()
        .on("pointerdown", function () {
            setName(full_name);
            setEmail(email);
            if( full_name !== '' && email !== '' ){

                let entry = {
                    full_name: full_name,
                    email: email,
                    score: score,
                };
                
                $.ajax({
                    url: "https://goodr.modernlabyrinth.com/score ",
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(entry),
                });   
                scoreDialog.destroy();
            }
        });
        
    let scoreDialog = scene.rexUI.add.sizer({
        orientation: "y",
        x: x,
        y: y,
        width: width,
        height: height,
        })
        .addBackground(background)
        .add(titleField, 0,"center", { top: 0, bottom: 1, left: 10, right: 10 }, false)
        .add(full_name_label, 0, "left", { top: 1, bottom: 5, left: 10, right: 10 }, false)
        .add(full_name_field, 0, "left", { bottom: 1, left: 10, right: 10 }, true)
        .add(email_label, 0,"left", { top: 1, bottom: 5, left: 10, right: 10 }, false)
        .add(emailField, 0, "left", { bottom: 10, left: 10, right: 10 }, true)
        .add(submitButton, 0, "center", { bottom: 10}, false)
        .layout();
    return scoreDialog;
};  