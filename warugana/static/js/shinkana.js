export class Shinkana extends createjs.Text {
  constructor(target) {
    const {size, red, green, blue, char} = target;
    const r = Math.floor(255 - (red/2));
    const g = Math.floor(255 - (green/2));
    const b = Math.floor(255 - (blue/2));
    super(char, `${size}px Arial`, `rgba(${r},${g},${b},0.5`);
    this.char = char;
    this.target = target;
    this.red = r;
    this.green = g;
    this.blue = b;
    this.x = (Game.stage.canvas.width / 2) - 32;
    this.y = Game.stage.canvas.height + 10;
  }
  
  tick() {
    const targX = this.target.parent.x + this.target.x;
    const targY = this.target.parent.y + this.target.y;
    this.x += Math.sign(targX - this.x);
    this.y += Math.sign(targY - this.y);
  }

  contact() {
    const targX = this.target.parent.x + this.target.x;
    const targY = this.target.parent.y + this.target.y;
    return this.x === targX && this.y === targY;
  }

  kill() {
    if (!!this.target.parent) {
      this.target.parent.killChild(this.target);
    }
  }
}
