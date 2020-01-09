import { Machine, interpret } from "xstate";

const multiColorBulbMachine = Machine(
	{
		id: "multiColorBulb",
		initial: "unlit",
		context: {
			color: "#fff"
		},
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
					BREAK: "broken",
					CHANGE_COLOR: {
						actions: ["changeColor"]
					}
				}
			},

			broken: {
				type: "final"
			}
		}
	},
	{
		actions: {
			changeColor: (context, event) => console.log({ context, event })
		}
	}
);

const service = interpret(multiColorBulbMachine).start();
console.log(service.state.value);
service.send("TOGGLE");
console.log(service.state.value);
service.send("CHANGE_COLOR", { color: "#f00" });
console.log(service.state.value);
service.send("TOGGLE");
console.log(service.state.value);
service.send("BREAK");
console.log(service.state.value);
