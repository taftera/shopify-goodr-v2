export const globals = {
    SCENES: {
        LOADMENU: "LOAD-MENU",
        MENU: "MENU",
        LOADGAME: "LOAD-GAME",
        GAME: "GAME",
        LOADGAMEOVER: "LOAD-GAME-OVER",
        GAMEOVER: "GAMEOVER",
        LOADLEADERBOARD: "LOAD-LEADERBOARD",
        LEADERBOARD: "LEADERBOARD",
    }
}

export let assets_image_url = 'https://cdn.shopify.com/s/files/1/0084/1616/5946/files/';
export let assets_sound_url = 'https://cdn.shopify.com/s/files/1/0084/1616/5946/files/';

export let global_name = '';
export function setName(name) {global_name = name;}

export let global_email = '';
export function setEmail(email) {global_email = email;}