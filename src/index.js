import { Machine, interpret, send } from "xstate";

const echoMachine = Machine({
	id: "echo",
	initial: "listening",
	states: {
		listening: {
			on: {
				SPEAK: {
					actions: send("ECHO")
				},
				ECHO: {
					actions: () => console.log("echo, echo")
				}
			}
		}
	}
});

const service = interpret(echoMachine).start();
service.send("SPEAK");
service.send("SPEAK");
