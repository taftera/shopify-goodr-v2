/** @type {import("../typings/phaser")}*/

import { LoadMenuScene } from "//cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/load-menu.js?v1";
import { MenuScene } from "//cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/menu.js?v1";
import { LoadGameScene } from "//cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/load-game.js?v1";
import { GameScene } from "//cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/game.js?v1";
import { LoadGameOverScene } from "//cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/load-game-over.js?v1";
import { GameOverScene } from "//cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/game-over.js?v1";
import { LoadLeaderboardScene } from "//cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/load-leaderboard.js?v1";
import { LeaderboardScene } from "//cdn.shopify.com/s/files/1/0084/1616/5946/t/45/assets/leaderboard.js?v1";


const config ={
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    dom: {
        createContainer: true,
    },
    backgroundColor: 0x000000,
    type: Phaser.CANVAS,
    scene: [
        LoadMenuScene,
        MenuScene,
        LoadGameScene,
        GameScene,
        LoadGameOverScene,
        GameOverScene,
        LoadLeaderboardScene,
        LeaderboardScene,
    ],
    render: {
        pixelArt: true,
    },
    physics:{
        default: 'arcade',
            arcade: {
                fps: 60,
                gravity: {y: 3000},
                debug: false,
            }
    },
}


function preload() {}
function create() {}
function update() {}

const game = new Phaser.Game(config);