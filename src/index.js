import { Machine, interpret, assign } from "xstate";

const multiColorBulbMachine = Machine({
	id: "multiColorBulb",
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
		broken: {
			type: "final"
		}
	}
});

const service = interpret(multiColorBulbMachine).start();
console.log(service.state.value);
service.send("TOGGLE");
console.log(service.state.value);
service.send("TOGGLE");
console.log(service.state.value);
service.send("BREAK");
console.log(service.state.value);
