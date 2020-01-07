import { Machine, interpret } from "xstate";

const lightBubleMachine = Machine(
	{
		id: "lightBuble",
		initial: "unlit",
		states: {
			lit: {
				on: {
					BREAK: {
						target: "broken",
						actions: ["logBroken", "log"]
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
	},
	{
		actions: {
			logBroken: (context, event) => {
				console.log({ context, event });
			},
			log: event => {
				console.log("broken", event);
			}
		}
	}
);

const service = interpret(lightBubleMachine).start("lit");

service.onTransition(state => console.log(state.value));
service.send("TOGGLE");
service.send("TOGGLE");
service.send("BREAK", { room: "dinning room" });
