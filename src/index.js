import { Machine, interpret, assign } from "xstate";

const alarmClockMachine = Machine(
	{
		id: "alarmClock",
		initial: "idle",
		states: {
			idle: {
				on: {
					ALARM: "alarming"
				}
			},
			alarming: {
				activities: ["beeping"],
				on: {
					STOP: "idle"
				}
			}
		}
	},
	{
		activities: {
			beeping: () => {
				const beep = () => console.log("beep");
				beep();
				const interval = setTimeout(beep, 1000);
				return () => clearInterval(interval);
			}
		}
	}
);

const service = interpret(alarmClockMachine).start();
console.log(service.state.value);
service.send("ALARM");
console.log(service.state.value);
setTimeout(() => {
	service.send("STOP");
	console.log(service.state.value);
}, 2000);
