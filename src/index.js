import { Machine, interpret } from "xstate";

const echoMachine = Machine({
	id: "echo",
	initial: "listening",
	states: {
		listening: {
			on: {
				SPEAK: {},
				ECHO: {
					actions: () => console.log("echo, echo")
				}
			}
		}
	}
});

const service = interpret(echoMachine).start();
service.send("SPEAK");
service.send("ECHO");
