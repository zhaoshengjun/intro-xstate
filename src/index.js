import { Machine, interpret, assign } from "xstate";

const alarmClockMachine = Machine({
	id: "alarmClock",
	initial: "idle",
	states: {
		idle: {
			on: {
				ALARM: "alarming"
			}
		},
		alarming: {
			on: {
				STOP: "idle"
			}
		}
	}
});

const service = interpret(alarmClockMachine).start();
console.log(service.state.value);
service.send("ALARM");
console.log(service.state.value);
service.send("STOP");
console.log(service.state.value);
