export class Kanateki extends createjs.Text {
  constructor(data) {
    const {x, y, size, red, green, blue, char} = data;
    super(char, `${size}px Arial`, `rgb(${red},${green},${blue}`);
    this.char = char;
    this.size = size;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.x = x;
    this.y = y;
  }
}