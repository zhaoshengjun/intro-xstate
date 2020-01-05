function lightBulb() {
	let isLit = false;
	let isBroken = false;

	return {
		state() {
			return { isLit, isBroken };
		},

		toggle() {
			if (isBroken) {
				isLit = false;
				return;
			}
			isLit = !isLit;
		},

		break() {
			isBroken = true;
			isLit = false;
		}
	};
}

const buble = lightBulb();
const log = () => {
	console.log(buble.state());
};
buble.toggle();
buble.break();
log();
