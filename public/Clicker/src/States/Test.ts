module SpriterExample {

    export class Test extends Phaser.State {

        private _skullIcon: Phaser.Image;
        private _enemyLabel: Phaser.Text;
        private _floorLabel: Phaser.Text;
        private _damageLabel: Phaser.Text;
        private _floorNum: number = 1;
        private _monsterNumLabel: Phaser.Text;
        private _monsterOutOfTen: number = 0;

        private _goldLabel: Phaser.Text;

        private _spriterGroup: Spriter.SpriterGroup;
        private _text: string = "";

        private _barbg: Phaser.Image;
        private _bar: Phaser.Image;

        private _goldValue: number = 1;


        private _damage: number = 1;
        private _numUpgraded: number = 0;
        private _gold: number = 0;

        private _enemyHealth: number = 10;
        private _enemyMaxHealth: number = 10;
        private _enemyHealthNumbers: Phaser.Text;

        private _numEnemiesDestroyed: number = 0;
        private _maxEnemiesToDestroy: number = 10;

        private _multiplier: number = 1.15;

        private fallAmt: number = 50;
        private _swordIcon: Phaser.Sprite;
        private _goldIcon: Phaser.Sprite;

        private _upgradeButton: Phaser.Sprite;
        private _upgradeLabel: Phaser.Text;
        private _upgradePrice: number = 50;
       

        public static _coinPool: Array<Coin> = new Array<Coin>();
        private _coinGroup: Phaser.Group;

        public static instance: Test;

        // -------------------------------------------------------------------------
        constructor() {
            super();

            Test.instance = this;
        }

        updateGold(Amount: number) {
            this._gold += Amount;
            this._goldLabel.setText(this._gold.toString());
        }

        enemyDestroyed() {
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
            var randGold: number = Math.floor(Math.random() * (7 - 3) + 3);

            for (var a: number = 0; a < randGold; a++) {
                var coin: Coin = Test._coinPool.pop();
                coin._value = this._goldValue;
                coin.reset(Math.random() * (400 - 200) + 200, Math.random() * (400 - 350) + 350, 1);
                coin.position.y -= 100;
            }
        }

        _updateHealthText() {

            if (this._enemyHealth % 1 != 0)
                this._enemyHealthNumbers.setText(this._enemyHealth.toFixed(2) + " / " + this._enemyMaxHealth.toString());
            else
                this._enemyHealthNumbers.setText(this._enemyHealth.toString() + " / " + this._enemyMaxHealth.toString());
        }

        // -------------------------------------------------------------------------
        create() {
            this.stage.backgroundColor = 0xFFFFFF;

            var coin: Coin;
            

            
            

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

                    if(_this._damage % 1 != 0)
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

            for (var c: number = 0; c < 100; c++) {
                coin = new Coin(this.game, 0, 0);
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




        }

        createFonts() {


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
        }

        // -------------------------------------------------------------------------
        update() {
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
        }

        // -------------------------------------------------------------------------
        render() {
         
        }


        /*

        // =========================================================================
        // ============= UNDER CONSTRUCTION - TOUCH AT YOUR OWN RISK ===============
        // =========================================================================

        // -------------------------------------------------------------------------
        // definitions if using minimized Spriter files
        public minimizedDefinitions: any = {
            "name": "spriter_data",
            "minName": "s",
            "attributes": {
                "scml_version": "v",
                "generator": "g",
                "generator_version": "gv"
            },
            "childElements": {
                "folder": {
                    "name": "folder",
                    "minName": "d",
                    "attributes": {
                        "id": "i",
                        "name": "n"
                    },
                    "childElements": {
                        "file": {
                            "name": "file",
                            "minName": "f",
                            "attributes": {
                                "id": "i",
                                "name": "n",
                                "width": "w",
                                "height": "h",
                                "pivot_x": "px",
                                "pivot_y": "py"
                            }
                        }
                    }
                },
                "entity": {
                    "name": "entity",
                    "minName": "e",
                    "attributes": {
                        "id": "i",
                        "name": "n"
                    },
                    "childElements": {
                        "obj_info": {
                            "name": "obj_info",
                            "minName": "o",
                            "attributes": {
                                "name": "n",
                                "type": "t",
                                "w": "w",
                                "h": "h"
                            },
                            "childElements": {
                                "frames": {
                                    "name": "frames",
                                    "minName": "f",
                                    "childElements": {
                                        "i": {
                                            "name": "i",
                                            "minName": "i",
                                            "attributes": {
                                                "folder": "d",
                                                "file": "f"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "animation": {
                            "name": "animation",
                            "minName": "a",
                            "attributes": {
                                "id": "i",
                                "name": "n",
                                "length": "l",
                                "interval": "t",
                                "looping": "c"
                            },
                            "childElements": {
                                "mainline": {
                                    "name": "mainline",
                                    "minName": "m",
                                    "childElements": {
                                        "key": {
                                            "name": "key",
                                            "minName": "k",
                                            "attributes": {
                                                "id": "i",
                                                "time": "t"
                                            },
                                            "childElements": {
                                                "bone_ref": {
                                                    "name": "bone_ref",
                                                    "minName": "b",
                                                    "attributes": {
                                                        "id": "i",
                                                        "parent": "p",
                                                        "timeline": "t",
                                                        "key": "k"
                                                    }
                                                },
                                                "object_ref": {
                                                    "name": "object_ref",
                                                    "minName": "o",
                                                    "attributes": {
                                                        "id": "i",
                                                        "name": "n",
                                                        "timeline": "t",
                                                        "parent": "p",
                                                        "key": "k",
                                                        "z_index": "z",
                                                        "folder": "d",
                                                        "file": "f",
                                                        "abs_x": "ax",
                                                        "abs_y": "ay",
                                                        "abs_pivot_x": "apx",
                                                        "abs_pivot_y": "apy",
                                                        "abs_scale_x": "asx",
                                                        "abs_scale_y": "asy",
                                                        "abs_angle": "r",
                                                        "abs_a": "a"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "timeline": {
                                    "name": "timeline",
                                    "minName": "t",
                                    "attributes": {
                                        "id": "i",
                                        "name": "n",
                                        "obj": "o",
                                        "object_type": "t"
                                    },
                                    "childElements": {
                                        "key": {
                                            "name": "key",
                                            "minName": "k",
                                            "attributes": {
                                                "id": "i",
                                                "time": "t",
                                                "spin": "s",
                                                "curve_type": "ct",
                                                "c1": "c1",
                                                "c2": "c2"
                                            },
                                            "childElements": {
                                                "bone": {
                                                    "name": "bone",
                                                    "minName": "b",
                                                    "attributes": {
                                                        "x": "x",
                                                        "y": "y",
                                                        "angle": "r",
                                                        "scale_x": "sx",
                                                        "scale_y": "sy"
                                                    }
                                                },
                                                "object": {
                                                    "name": "object",
                                                    "minName": "o",
                                                    "attributes": {
                                                        "folder": "d",
                                                        "file": "f",
                                                        "x": "x",
                                                        "y": "y",
                                                        "scale_x": "sx",
                                                        "scale_y": "sy",
                                                        "pivot_x": "px",
                                                        "pivot_y": "py",
                                                        "angle": "r",
                                                        "a": "a"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // ---- end ----
        */
    }
}
