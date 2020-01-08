import { Machine, interpret } from "xstate";

const idleMachine = Machine(
	{
		id: "idle",
		initial: "idle",
		states: {
			idle: {
				entry: ["logEntry"],
				exit: ["logExit"]
			}
		},
		on: {
			DO_NOTHING: "idle"
		}
	},
	{
		actions: {
			logEntry: () => console.log("entered"),
			logExit: () => console.log("exited")
		}
	}
);

const service = interpret(idleMachine).start();
service.send("DO_NOTHING");
