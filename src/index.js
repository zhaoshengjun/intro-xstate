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
							context =>
								console.log(`Before: ${context.previousCount}`),
							"setPreviousCount",
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
			incCount: assign({ count: context => context.count + 1 }),
			setPreviousCount: assign({
				previousCount: context => context.count
			})
		}
	}
);

const service = interpret(doubleCounterMachine).start();
console.log(service.state.value);
service.send("INC_COUNT_TWICE");
console.log(service.state.value);
