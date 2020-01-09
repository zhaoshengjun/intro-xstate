import { Machine, interpret, assign } from "xstate";

const multiColorBulbMachine = Machine({
	id: "multiColorBulb",
	initial: "unlit",
	states: {
		unlit: {
			on: {
				TOGGLE: "lit",
				BREAK: "broken"
			}
		},
		lit: {
			on: {
				TOGGLE: "unlit",
				BREAK: "broken"
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
