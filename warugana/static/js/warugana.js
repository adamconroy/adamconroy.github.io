import { Kanateki } from "./kanateki.js";

// todo: set up entity base class so we can have all these guys updating the same
// typescript?
export class Warugana extends createjs.Container {
  // Constructor takes an entity ID that denotes the configuration
  // the full entity as well as the children Kanateki
  constructor(entityID) {
    super();
    // get data based on entity ID
    // ...
    const data = {
      attributes: {
        x: 0,
        y: 0,
        speed: 1, // TODO: how to measure this, pixels per second? percent per second?
      },
      kanateki: [
        {
          x: 0,
          y: 0,
          size: 48,
          red: 255,
          green: 255,
          blue: 255,
          char: 'き',
        },
        {
          x: 80,
          y: 10,
          size: 64,
          red: 0,
          green: 255,
          blue: 255,
          char: 'つ',
        }
      ],
    };
    this.setAttributes(data.attributes);

    // parse data into our attributes as well as children
    // this.attributes = data.attributes

    this.bounds = {
      x: data.kanateki[0].x,
      y: data.kanateki[0].y,
      width: data.kanateki[0].size,
      height: data.kanateki[0].size
    };

    data.kanateki.forEach((k) => {
      this.setBounds(k);
      const kanateki = new Kanateki(k);
      this.addChild(kanateki);
    });

    // put outselves in the middle for now
    this.bounds.x = Game.stage.canvas.width / 2 - this.bounds.width / 2;
    this.bounds.y = 0;
    this.x = this.bounds.x;
    this.y = this.bounds.y;

    // sort the children in case the static data is wrong
    // if it isn't this is just an O(n*2) operation so no bigs
    // sort by character first, then Y so our search for
    // first hit of a character based on Y will be easiest
    this.sortChildren((k1, k2) => {
      if (k1.char > k2.char) { return 1; }
      if (k1.char < k2.char) { return -1; }
      return 0;
    });
    this.sortChildren((k1, k2) => {
      if (k1.y > k2.y) { return 1; }
      if (k1.y < k2.y) { return -1; }
      return 0;
    });
  }

  setAttributes(attr) {
    const {x, y} = attr;
    this.x = x;
    this.y = y;
  }

  setBounds(k) {
    if (k.x < this.bounds.x) {
      this.bounds.x = k.x;
    }
    if (k.y < this.bounds.y) {
      this.bounds.x = k.x;
    }
    if (k.x + k.size > this.bounds.x + this.bounds.width) {
      this.bounds.width = (k.x + k.size) - this.bounds.x;
    }
    if (k.y + k.size > this.bounds.y + this.bounds.height) {
      this.bounds.height = (k.y + k.size) - this.bounds.y;
    }
  }

  killChild(c) {
    this.removeChild(c);
    if (this.children.length == 0) {
      // kill ourselves
    }
  }

  tick() {
    this.y += 1;
    const typed = document.getElementById("kanainput").value;

    for (const c of this.children) {
      if (c.char === typed) {
        window.Game.inst.launchShinkana(c);
        document.getElementById("kanainput").value = "";
      }
    }
  }
}