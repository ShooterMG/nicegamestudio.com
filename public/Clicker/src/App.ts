module SpriterExample {

    export class Global {
        // game derived from Phaser.Game
        static game: Game = null;

       

        // game size
        static GAME_WIDTH: number = 640;
        static GAME_HEIGHT: number = 480;

        // assets path
        static assetsPath: string = "assets/";

        WebFontConfig = {
            //  The Google Fonts we want to load (specify as many as you like in the array)
            google: {
                families: ['Revalia', 'Sniglet']
            }

        };
    }
}

var PhaserGlobal = {
    stopFocus: true
}



// -------------------------------------------------------------------------
window.onload = () => {
    SpriterExample.Global.game = new SpriterExample.Game();
};

