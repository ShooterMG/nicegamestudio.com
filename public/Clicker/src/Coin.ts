module SpriterExample {

    export class Coin extends Phaser.Sprite {
        // game derived from Phaser.Game

        private _gravity: number = 1;
        private _velocityY: number = 0;
        private _velocityX: number = 0;
        private _groundY: number = 0;
        private _falling: boolean = false;
        public _value: number = 1;

        constructor(game: Phaser.Game, X: number, Y: number, Value: number = 1) {
            super(game, X, Y, "Gold");
            this._value = Value;
        }

        reset(X: number = 0, Y: number = 0, Health: number) {

            this._groundY = Y;

            this._velocityX = Math.random() * (10 - -10) + -10;
            this._velocityY = -20;

            

            this._falling = true;
            

            return super.reset(X, Y, Health);
        }

        update() {


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
                            Test._coinPool.push(_this);
                            Test.instance.updateGold(_this._value);

                        }, this);
                    }
                }
                
            }

            super.update();
        }


    }
}