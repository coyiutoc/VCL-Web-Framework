export {initialize_random_order}

function initialize_random_order(length) {

	let order = [];

	for (let i = 0; i < length; i++) {
		order.push(i);
	}

	return order.sort( () => Math.random() - 0.5);
}
