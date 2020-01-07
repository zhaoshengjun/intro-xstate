"use strict";

var _xstate = require("xstate");

var lightBubleMachine = (0, _xstate.Machine)({
  id: "lightBuble",
  initial: "unlit",
  states: {
    lit: {
      on: {
        BREAK: "broken",
        TOGGLE: "unlit"
      }
    },
    unlit: {
      on: {
        BREAK: "broken",
        TOGGLE: "lit"
      }
    },
    broken: {}
  }
});
var service = (0, _xstate.interpret)(lightBubleMachine).start("lit");
service.onTransition(function (state) {
  return console.log(state.value);
});
service.send("TOGGLE");
service.send("BREAK");