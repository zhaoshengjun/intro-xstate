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
console.log(lightBubleMachine.initialState.value);
console.log(lightBubleMachine.transition("unlit", "TOGGLE").value);
console.log(lightBubleMachine.transition("unlit", "BREAK").value);
console.log(lightBubleMachine.transition("broken", "TOGGLE").value);