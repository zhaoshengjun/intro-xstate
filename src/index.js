import { Machine, interpret, assign } from "xstate";

const doubleCounterMachine = Machine(
	{
		id: "doubleCounter",
		initial: "idle",
		context: {
			count: 0,
			previousCount: undefined
		},
		states: {
			idle: {
				on: {
					INC_COUNT_TWICE: {
						actions: [
							"setPreviousCount",
							context =>
								console.log(`Before: ${context.previousCount}`),
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
			incCount: (context, event) => {
				console.log("incCount: ", { context });
				context.count = context.count + 1;
			},
			setPreviousCount: (context, event) => {
				console.log("setPreviousCount: ", { context });
				setTimeout(() => {
					context.previousCount = context.count;
				}, 1000);
			}
		}
	}
);

const service = interpret(doubleCounterMachine).start();
console.log(service.state.value);
service.send("INC_COUNT_TWICE");
console.log(service.state.value);
