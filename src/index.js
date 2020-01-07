import { Machine, interpret } from "xstate";

const lightBubleMachine = Machine({
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

const service = interpret(lightBubleMachine).start("lit");

service.onTransition(state => console.log(state.value));
service.send("TOGGLE");
service.send("BREAK");
