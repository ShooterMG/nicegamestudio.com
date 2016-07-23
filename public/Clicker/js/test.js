var SpriterExample;
(function (SpriterExample) {
    var Global = (function () {
        function Global() {
            this.WebFontConfig = {
                //  The Google Fonts we want to load (specify as many as you like in the array)
                google: {
                    families: ['Revalia', 'Sniglet']
                }
            };
        }
        // game derived from Phaser.Game
        Global.game = null;
        // game size
        Global.GAME_WIDTH = 640;
        Global.GAME_HEIGHT = 480;
        // assets path
        Global.assetsPath = "assets/";
        return Global;
    })();
    SpriterExample.Global = Global;
})(SpriterExample || (SpriterExample = {}));
var PhaserGlobal = {
    stopFocus: true
};
// -------------------------------------------------------------------------
window.onload = function () {
    SpriterExample.Global.game = new SpriterExample.Game();
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SpriterExample;
(function (SpriterExample) {
    var Coin = (function (_super) {
        __extends(Coin, _super);
        function Coin(game, X, Y, Value) {
            if (Value === void 0) { Value = 1; }
            _super.call(this, game, X, Y, "Gold");
            // game derived from Phaser.Game
            this._gravity = 1;
            this._velocityY = 0;
            this._velocityX = 0;
            this._groundY = 0;
            this._falling = false;
            this._value = 1;
            this._value = Value;
        }
        Coin.prototype.reset = function (X, Y, Health) {
            if (X === void 0) { X = 0; }
            if (Y === void 0) { Y = 0; }
            this._groundY = Y;
            this._velocityX = Math.random() * (10 - -10) + -10;
            this._velocityY = -20;
            this._falling = true;
            return _super.prototype.reset.call(this, X, Y, Health);
        };
        Coin.prototype.update = function () {
            if (!this._falling) {
                this.position.y = this._groundY;
                this._falling = false;
            }
            else {
                if (this._falling) {
                    this._velocityY += this._gravity;
                    this._velocityX *= 0.96;
                    this.position.y += this._velocityY;
                    this.position.x += this._velocityX;
                    if (this._velocityY > 10) {
                        this._falling = false;
                        var _this = this;
                        this.game.add.tween(this.position).to({ y: 420, x: 580 }, 200, "Expo", true, 0, 0, false).onComplete.add(function () {
                            _this.kill();
                            SpriterExample.Test._coinPool.push(_this);
                            SpriterExample.Test.instance.updateGold(_this._value);
                        }, this);
                    }
                }
            }
            _super.prototype.update.call(this);
        };
        return Coin;
    })(Phaser.Sprite);
    SpriterExample.Coin = Coin;
})(SpriterExample || (SpriterExample = {}));
/// <reference path="../lib/phaser.d.ts" />
var SpriterExample;
(function (SpriterExample) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // -------------------------------------------------------------------------
        function Game() {
            // init game
            _super.call(this, SpriterExample.Global.GAME_WIDTH, SpriterExample.Global.GAME_HEIGHT, Phaser.AUTO, "content", null /* , transparent, antialias, physicsConfig */);
            Game.game = this;
            // states
            this.state.add("Boot", SpriterExample.Boot);
            this.state.add("Preloader", SpriterExample.Preloader);
            this.state.add("Test", SpriterExample.Test);
            // start
            this.state.start("Boot");
        }
        return Game;
    })(Phaser.Game);
    SpriterExample.Game = Game;
})(SpriterExample || (SpriterExample = {}));
/// <reference path="../../lib/phaser.d.ts" />
var SpriterExample;
(function (SpriterExample) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        // -------------------------------------------------------------------------
        function Boot() {
            _super.call(this);
        }
        // -------------------------------------------------------------------------
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            // pause game when not focused
            this.stage.disableVisibilityChange = false;
        };
        // -------------------------------------------------------------------------
        Boot.prototype.create = function () {
            this.game.state.start("Preloader", true, false);
        };
        return Boot;
    })(Phaser.State);
    SpriterExample.Boot = Boot;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        // -------------------------------------------------------------------------
        function Preloader() {
            _super.call(this);
        }
        // -------------------------------------------------------------------------
        Preloader.prototype.preload = function () {
            // load assets
            var path = SpriterExample.Global.assetsPath;
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
        };
        // -------------------------------------------------------------------------
        Preloader.prototype.onBinaryLoaded = function (key, data) {
            return data;
        };
        // -------------------------------------------------------------------------
        Preloader.prototype.create = function () {
            this.game.state.start("Test");
        };
        return Preloader;
    })(Phaser.State);
    SpriterExample.Preloader = Preloader;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Test = (function (_super) {
        __extends(Test, _super);
        // -------------------------------------------------------------------------
        function Test() {
            _super.call(this);
            this._floorNum = 1;
            this._monsterOutOfTen = 0;
            this._text = "";
            this._goldValue = 1;
            this._damage = 1;
            this._numUpgraded = 0;
            this._gold = 0;
            this._enemyHealth = 10;
            this._enemyMaxHealth = 10;
            this._numEnemiesDestroyed = 0;
            this._maxEnemiesToDestroy = 10;
            this._multiplier = 1.15;
            this.fallAmt = 50;
            this._upgradePrice = 50;
            Test.instance = this;
        }
        Test.prototype.updateGold = function (Amount) {
            this._gold += Amount;
            this._goldLabel.setText(this._gold.toString());
        };
        Test.prototype.enemyDestroyed = function () {
            this._spriterGroup.position.y -= 1000;
            this._numEnemiesDestroyed++;
            if (this._numEnemiesDestroyed == 10) {
                this._goldValue *= this._multiplier;
                this._goldValue = Math.ceil(this._goldValue);
                this._enemyMaxHealth *= this._multiplier;
                this._enemyMaxHealth = Math.ceil(this._enemyMaxHealth);
                this._numEnemiesDestroyed = 0;
                this._floorNum++;
                this._floorLabel.setText("Floor " + this._floorNum);
                this._enemyLabel.setText("Junkie Slime - Level " + this._floorNum);
            }
            this._enemyHealth = this._enemyMaxHealth;
            this._bar.scale.x = this._enemyHealth / this._enemyMaxHealth;
            this._updateHealthText();
            this._monsterNumLabel.setText(this._numEnemiesDestroyed + " / 10");
            //spawn the gold
            var randGold = Math.floor(Math.random() * (7 - 3) + 3);
            for (var a = 0; a < randGold; a++) {
                var coin = Test._coinPool.pop();
                coin._value = this._goldValue;
                coin.reset(Math.random() * (400 - 200) + 200, Math.random() * (400 - 350) + 350, 1);
                coin.position.y -= 100;
            }
        };
        Test.prototype._updateHealthText = function () {
            if (this._enemyHealth % 1 != 0)
                this._enemyHealthNumbers.setText(this._enemyHealth.toFixed(2) + " / " + this._enemyMaxHealth.toString());
            else
                this._enemyHealthNumbers.setText(this._enemyHealth.toString() + " / " + this._enemyMaxHealth.toString());
        };
        // -------------------------------------------------------------------------
        Test.prototype.create = function () {
            this.stage.backgroundColor = 0xFFFFFF;
            var coin;
            // ===============================================================
            // BASIC SETUP
            // ===============================================================
            var _this = this;
            // create Spriter loader - class that can change Spriter file into internal structure
            var spriterLoader = new Spriter.Loader();
            // create Spriter file object - it wraps XML/JSON loaded with Phaser Loader
            //var spriterFile = new Spriter.SpriterXml(this.cache.getXML("TESTXml"));
            var spriterFile = new Spriter.SpriterJSON(this.cache.getJSON("TESTJson"));
            // proces Spriter file (XML/JSON) with Spriter loader - outputs Spriter animation which you can instantiate multiple times with SpriterGroup
            var spriterData = spriterLoader.load(spriterFile);
            // create actual renderable object - it is extension of Phaser.Group
            this._spriterGroup = new Spriter.SpriterGroup(this.game, spriterData, "TEST", "blob", 0, 5);
            this._spriterGroup.position.setTo(300, 250);
            this._barbg = this.game.add.image(190, 340, "BarBG");
            this._bar = this.game.add.image(198, 348, "Bar");
            this._enemyHealthNumbers = this.game.add.text(this.game.world.centerX, 365, "10/10", this);
            this._enemyHealthNumbers.anchor.setTo(0.5);
            this._enemyHealthNumbers.font = 'Revalia';
            this._enemyHealthNumbers.fontSize = 10;
            this._enemyHealthNumbers.stroke = '#000000';
            this._enemyHealthNumbers.strokeThickness = 4;
            this._enemyHealthNumbers.fill = '#FFFFFF';
            this._enemyHealthNumbers.visible = false;
            this._enemyLabel = this.game.add.text(this.game.world.centerX, 400, "Junkie Slime - Level 1", this);
            this._enemyLabel.anchor.setTo(0.5);
            this._enemyLabel.font = 'Sniglet';
            this._enemyLabel.fontSize = 32;
            this._damageLabel = this.game.add.text(60, 95, "1", this);
            this._damageLabel.anchor.setTo(0.5);
            this._damageLabel.font = 'Sniglet';
            this._damageLabel.fontSize = 32;
            this._enemyLabel.fill = '#FFFFFF';
            this._enemyLabel.visible = false;
            this._damageLabel.fill = '#FFFFFF';
            this._damageLabel.visible = false;
            this._floorLabel = this.game.add.text(60, 30, "Floor 1", this);
            this._floorLabel.anchor.setTo(0.5);
            this._floorLabel.font = 'Sniglet';
            this._floorLabel.fontSize = 32;
            this._floorLabel.fill = '#FFFFFF';
            this._floorLabel.visible = false;
            this._goldLabel = this.game.add.text(590, 460, "0", this);
            this._goldLabel.anchor.setTo(0.5);
            this._goldLabel.font = 'Sniglet';
            this._goldLabel.fontSize = 32;
            this._goldLabel.fill = '#FFFFFF';
            this._goldLabel.visible = false;
            this._monsterNumLabel = this.game.add.text(590, 95, "0 / 10", this);
            this._monsterNumLabel.anchor.setTo(0.5);
            this._monsterNumLabel.font = 'Sniglet';
            this._monsterNumLabel.fontSize = 32;
            this._monsterNumLabel.fill = '#FFFFFF';
            this._monsterNumLabel.visible = false;
            this._skullIcon = this.game.add.image(565, 10, "Skull");
            this._skullIcon.scale.set(.75, .75);
            this._swordIcon = this.game.add.sprite(10, 70, "SwordIcon");
            this._swordIcon.scale.set(.5, .5);
            this._goldIcon = this.game.add.sprite(560, 360, "GoldIcon");
            this.game.time.events.add(Phaser.Timer.SECOND, this.createFonts, this);
            this._spriterGroup.onLoop.add(function () {
                if (_this._spriterGroup.currentAnimationName == "hurt") {
                    _this._spriterGroup.playAnimationById(0);
                    _this._spriterGroup.setAnimationSpeedPercent(5);
                }
            });
            this._upgradeButton = this.game.add.sprite(15, 140, "UpgradeButton");
            this._upgradeButton.inputEnabled = true;
            this._upgradeButton.events.onInputDown.add(function () {
                if (_this._gold >= _this._upgradePrice) {
                    _this._gold -= _this._upgradePrice;
                    _this._damage *= _this._multiplier;
                    _this._damage = _this._damage;
                    _this._upgradePrice *= _this._multiplier;
                    _this._upgradePrice = Math.ceil(_this._upgradePrice);
                    if (_this._damage % 1 != 0)
                        _this._damageLabel.setText(_this._damage.toFixed(2));
                    else
                        _this._damageLabel.setText(_this._damage.toString());
                    _this._goldLabel.setText(_this._gold.toString());
                    _this._upgradeLabel.setText(_this._upgradePrice.toString());
                }
            });
            this._upgradeLabel = this.game.add.text(85, 195, "10", this);
            this._upgradeLabel.anchor.setTo(0.5);
            this._upgradeLabel.font = 'Sniglet';
            this._upgradeLabel.fontSize = 22;
            this._upgradeLabel.fill = '#FFFFFF';
            this._upgradeLabel.visible = false;
            this._coinGroup = this.game.add.group();
            // this._coinGroup.enableBody = true;
            // this._coinGroup.physicsBodyType = Phaser.Physics.ARCADE;
            for (var c = 0; c < 100; c++) {
                coin = new SpriterExample.Coin(this.game, 0, 0);
                coin.kill();
                Test._coinPool.push(coin);
                this._coinGroup.add(coin);
            }
            this.input.onDown.add(function () {
                if (_this._spriterGroup.position.y == 250) {
                    _this._spriterGroup.playAnimationById(1);
                    _this._spriterGroup.setAnimationSpeedPercent(20);
                }
                if (!_this._upgradeButton.input.pointerOver(1)) {
                    _this._enemyHealth -= _this._damage;
                    _this._bar.scale.x = (_this._enemyHealth / _this._enemyMaxHealth);
                    _this._updateHealthText();
                    if (_this._enemyHealth <= 0) {
                        _this.enemyDestroyed();
                    }
                }
            });
            // adds SpriterGroup to Phaser.World to appear on screen
            this.world.add(this._spriterGroup);
        };
        Test.prototype.createFonts = function () {
            this._enemyHealthNumbers.visible = true;
            this._enemyHealthNumbers.setText("10 / 10");
            this._enemyLabel.visible = true;
            this._enemyLabel.setText("Junkie Slime - Level 1");
            this._floorLabel.visible = true;
            this._floorLabel.setText("Floor 1");
            this._monsterNumLabel.visible = true;
            this._monsterNumLabel.setText("0 / 10");
            this._damageLabel.visible = true;
            this._damageLabel.setText("1");
            this._goldLabel.visible = true;
            this._goldLabel.setText("0");
            this._upgradeLabel.visible = true;
            this._upgradeLabel.setText("50");
        };
        // -------------------------------------------------------------------------
        Test.prototype.update = function () {
            this._spriterGroup.updateAnimation();
            this._coinGroup.update();
            if (this._spriterGroup.position.y < 250) {
                if (this._spriterGroup.position.y + this.fallAmt > 250) {
                    this._spriterGroup.position.y = 250;
                }
                else {
                    this._spriterGroup.position.y += this.fallAmt;
                }
            }
        };
        // -------------------------------------------------------------------------
        Test.prototype.render = function () {
        };
        Test._coinPool = new Array();
        return Test;
    })(Phaser.State);
    SpriterExample.Test = Test;
})(SpriterExample || (SpriterExample = {}));
