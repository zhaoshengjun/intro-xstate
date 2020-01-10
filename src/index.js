import { Machine, interpret, assign } from "xstate";

const doubleCounterMachine = Machine(
	{
		id: "doubleCounter",
		initial: "idle",
		context: {
			count: 0
		},
		states: {
			idle: {
				on: {
					INC_COUNT_TWICE: {
						actions: [
							context => console.log(`Before: ${context.count}`),
							"incCount",
							"incCount",
							context => console.log(`After: ${context.count}`)
						]
					}
				}
			}
		}
	},
	{
		actions: {
			incCount: assign({ count: context => context.count + 1 })
		}
	}
);

const service = interpret(doubleCounterMachine).start();
console.log(service.state.value);
service.send("INC_COUNT_TWICE");
console.log(service.state.value);
