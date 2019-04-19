import {initialize_latin_square} from "/scripts/experiment-properties/balancing/generators/latin_square_generator.js";
import {initialize_random_order} from "/scripts/experiment-properties/balancing/generators/random_generator.js";

export {balance_subconditions};

/**
 * Returns the balanced order of the subconditions given balancing type,
 * experiment, and number of subconditions.
 *
 * @param {string}     		balancing_type
 * @param {experiment_name} name of experiment
 * @param {dataset_length}  length of dataset AKA number of subconditions
 *
 * @return {[]}		  		array of indices, representing each subcondition in the dataset.
 */
function balance_subconditions(balancing_type, experiment_name, dataset_length){

	// BALANCING_TYPES constant from /config/balancing-config.js
	if (BALANCING_TYPES[balancing_type] === undefined) {
		throw Error(balancing_type + " balancing type is not supported.");
	}

	// EXPERIMENTS constant from /config/experiments-config.js
	if (EXPERIMENTS[experiment_name]["balancing_type"].includes(balancing_type)){

		switch (balancing_type) {
			case "latin_square":
				return initialize_latin_square(dataset_length);
			case "random":
				return initialize_random_order(dataset_length);
			default:
				throw Error(balancing_type + " has not been defined.");
		}
	}
}