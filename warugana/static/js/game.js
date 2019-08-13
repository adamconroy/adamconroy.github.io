import { Warugana } from "./warugana.js";
import { HIRAGANA, KATAKANA } from "./kana.js";
import { Shinkana } from "./shinkana.js";

export class Game {
  constructor() {
    Game.showFPS = false;
    Game.stage = new createjs.Stage("board");
    Game.activeShinkana = [];
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", this.tick)
   
    window.addEventListener("keydown", Game.keyDownHandler);
//    window.addEventListener("keyup", Game.keyUpHandler);

    document.getElementById("config_form").style.display = "none";

    const useHiragana = document.getElementById("hiragana_checkbox").checked;
    const useKatakana = document.getElementById("katakana_checkbox").checked;

    // create the input element to bind to
    const kanaIn = document.getElementById("kanainput");
    kanaIn.style.display = "block";
    wanakana.bind(document.getElementById("kanainput"));

    //
    // create our first warugana
    const w = new Warugana();

    Game.stage.addChild(w);
  }

  startNewGame() {
  }

  tick(event) {
    if (event.paused) {
      // do nothing?
      return;
    }

    if (Game.showFPS) {
      Game.updateFPS();
    }

    // go through the active warugana and tell them to update
    Game.stage.children.forEach((w) => {
      w.tick();
    });

    Game.activeShinkana.forEach((s, i) => {
      s.tick();

      if (s.contact()) {
        s.kill();
        Game.stage.removeChild(s);
        Game.activeShinkana.splice(i, 1);
      }
    });

    Game.stage.update();
  }

  launchShinkana(target) {
    const s = new Shinkana(target);
    Game.activeShinkana.push(s);
    Game.stage.addChild(s);
  }

  static updateFPS() {
    let now = new Date().getTime();
    if (!Game.firstUpdate || now - Game.firstUpdate >= 1000) {
      if (!!Game.updates) {
        $("#fps").text(Game.updates + "fps");
      }
      Game.firstUpdate = new Date().getTime();
      Game.updates = 0;
    }
    Game.updates++;
  }

  static keyDownHandler(event) {
    // make sure that typing always goes to the input
    document.getElementById("kanainput").focus();
//    console.log("keydown", event);
  }

  static keyUpHandler(event) {
//    console.log("keyup", event);
  }

  static start() {
    const useHiragana = document.getElementById("hiragana_checkbox").checked;
    const useKatakana = document.getElementById("katakana_checkbox").checked;
    if (!useHiragana && !useKatakana) {
      alert("Must use at least one kana syllabary");
      return;
    }

    $(".menu_container").hide();
    $("#board").show();

    Game.inst = new Game();
  }
}

window.Game = Game;
