module SpriterExample {
    export class Preloader extends Phaser.State {

        // -------------------------------------------------------------------------
        constructor() {
            super();
        }

        // -------------------------------------------------------------------------
        preload() {
            // load assets
            var path: string = Global.assetsPath;

            //this.load.atlas("Hero", path + "Atlas.png", path + "Atlas.json");

            //this.load.xml("HeroDataXml", path + "Hero.xml");
            //this.load.json("HeroDataJSON", path + "Hero.json");

            //this.load.binary("HeroDataBin", path + "Hero.bin", this.onBinaryLoaded, this);


            // test
            /*
            this.load.atlas("TEST", path + "Atlas.png", path + "Atlas.json");
            this.load.xml("TESTXml", path + "TEST.xml");
            this.load.json("TESTJson", path + "TEST.json");
            */

            this.load.atlas("TEST", path + "SlimeAtlas.png", path + "SlimeAtlas.json");
            //this.load.xml("TESTXml", path + "Slime.xml");
            this.load.json("TESTJson", path + "Slime.json");
            this.load.image("BarBG", path + "barbg.png");
            this.load.image("Bar", path + "bar.png");
            this.load.image("Gold", path + "gold.png");
            this.load.image("Skull", path + "skull.png");
            this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            this.load.image("GoldIcon", path + "GoldIcon.png");
            this.load.image("SwordIcon", path + "SwordIcon.png");
            this.load.image("UpgradeButton", path + "UpgradeButton.png");
        }

        // -------------------------------------------------------------------------
        public onBinaryLoaded(key: string, data: ArrayBuffer) {
            return data;
        }

        // -------------------------------------------------------------------------
        create() {
            this.game.state.start("Test");
        }
    }
}
