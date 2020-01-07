import { Machine, interpret } from "xstate";

const lightBubleMachine = Machine({
	id: "lightBuble",
	initial: "unlit",
	states: {
		lit: {
			on: {
				BREAK: {
					target: "broken",
					actions: (context, event) => {
						console.log({ context, event });
					}
				},
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
service.send("TOGGLE");
service.send("BREAK");
