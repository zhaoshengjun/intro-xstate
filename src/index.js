import { Machine, interpret } from "xstate";

const lightBubleMachine = Machine(
	{
		id: "lightBuble",
		initial: "unlit",
		states: {
			lit: {
				exit: ["darkAndCold"],
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
				entry: ["logBroken"]
			}
		}
	},
	{
		actions: {
			logBroken: (context, event) => {
				console.log({ context, event });
			},
			darkAndCold: () => console.log("It's getting dark and cold.")
		}
	}
);

const service = interpret(lightBubleMachine).start("lit");

service.onTransition(state => console.log(state.value));
service.send("TOGGLE");
service.send("TOGGLE");
service.send("BREAK", { room: "dinning room" });
