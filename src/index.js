function lightBulb() {
	let isLit = false;
	let isBroken = false;

	return {
		state() {
			return { isLit, isBroken };
		},

		toggle() {
			isLit = !isLit;
		},

		break() {
			isBroken = true;
		}
	};
}

const buble = lightBulb();
const log = () => {
	console.log(buble.state());
};
