// import {create_scatter_plot} from "/scripts/experiment-properties/graphing/d3-base-plots/scatter_plot.js";
const plots = require('d3-vs-plots');
import {create_strip_plot} from "/scripts/experiment-properties/graphing/d3-base-plots/strip_plot.js";
import {create_ring_plot} from "/scripts/experiment-properties/graphing/d3-base-plots/ring_plot.js";
import {create_shape_plot} from "/scripts/experiment-properties/graphing/d3-base-plots/shape_plot.js";
import {is_custom_plot, prepare_custom_plot} from "/scripts/experiment-properties/graphing/custom_graphing_controller.js";
export {plot_distributions};

/**
 * Main point of entry to determine whether there is a custom plotting code for
 * the condition, or we use one of the standard supported graph plots.
 *
 * @param {object}   experiment
 */
function plot_distributions(experiment) {

	let experiment_name = experiment.constructor.name;

	// If experiment uses a custom plotting code not supported by
	// main plots:
	if (is_custom_plot(experiment)){
		return prepare_custom_plot(experiment);
	}

	switch (experiment.graph_type) {
		case "scatter":
			prepare_scatter_plot(experiment);
			break;

		case "strip":
			prepare_strip_plot(experiment);
			break;

		case "ring":
			prepare_ring_plot(experiment);
			break;

		case "shapes":
			prepare_shapes_plot(experiment);
			break;

		default:
			throw Error("Graph type " + experiment.graph_type + " is not supported.");
	}
}

/**
 * Sets up attributes from trial data for scatter plots and creates the plots.
 *
 * @param {object}   experiment
 */
function prepare_scatter_plot(experiment) {

	let datasets = experiment.coordinates;
	let trial_data = experiment.trial_data;

    for (let i in datasets) {

    	let attributes = {
			dataset: datasets[i],
			graph_attributes: generate_attributes_object("scatter", trial_data, i)
		};

        plots.scatter_plot.create_scatter_plot(attributes);
	}

    // Set background color
    document.body.style.backgroundColor = (trial_data.background_color ? trial_data.background_color : "WHITE");
}

/**
 * Sets up attributes from trial data for strip plots and creates the plots.
 *
 * @param {object}   experiment
 */
function prepare_strip_plot(experiment) {

	let datasets = experiment.coordinates;
	let trial_data = experiment.trial_data;

	for (let i in datasets) {

		let attributes = {
			dataset: datasets[i],
			graph_attributes: generate_attributes_object("strip", trial_data, i)
		};

		create_strip_plot(attributes);
	}

	// Set background color
    document.body.style.backgroundColor = (trial_data.background_color ? trial_data.background_color : "WHITE");
}

/**
 * Sets up attributes from trial data for ring plots and creates the plots.
 *
 * @param {object}   experiment
 */
function prepare_ring_plot(experiment) {

	let datasets = experiment.coordinates;
	let trial_data = experiment.trial_data;

	for (let i in datasets) {

		let attributes = {
			dataset: datasets[i],
			graph_attributes: generate_attributes_object("ring", trial_data, i)
		};

		create_ring_plot(attributes);
	}

	// Set background color
    document.body.style.backgroundColor = (trial_data.background_color ? trial_data.background_color : "WHITE");
}

/**
 * Sets up attributes from trial data for shape plots and creates the plots.
 *
 * @param {object}   experiment
 */
function prepare_shapes_plot(experiment) {

	let radii = experiment.radii;
	let trial_data = experiment.trial_data;

	let max_radius = Math.max(...radii);
  	let min_radius = Math.min(...radii);

	for (let i in radii) {

		let attributes = {
			curr_radius: radii[i],
			max_radius:  max_radius,
			min_radius:  min_radius, 
			graph_attributes: generate_attributes_object("shapes", trial_data, i)
		};

		create_shape_plot(attributes);
	}

	// Set background color
    document.body.style.backgroundColor = (trial_data.background_color ? trial_data.background_color : "WHITE");
}

/**
 * Generates the js object for graph_attributes based on what is specified in
 * the graphing-config.js. 
 *
 * E.g., will return object in this format:
 * {
 *	"axis_color"  : "BLACK",
 *  "point_color" : "RED",
 *  "point_size"  : 3
 *   ....
 * }
 *
 * @param {string}   plot_type			Only takes in "scatter", "strip", "ring", "shapes"
 * @param {object}   trial_data         Trial data object from experiment model
 * @param {int}		 plot_number		Denotes plot number from left to right (e.g. leftmost is 1 etc.)
 *
 * @return {object}  graph_attributes
 */
function generate_attributes_object(plot_type, trial_data, plot_number) {

	let obj = {};
	let graph = GRAPH_TYPES[plot_type]; //GRAPH_TYPES comes from /config/graphing-config.js
	let attributes = graph["attributes"];

	for (let key in attributes) {

		let attrib = attributes[key];

		// These attributes are dependent on plot_number:
		if (key === "shapes") {

			obj[key] = (key in trial_data ? trial_data[key][plot_number] : attrib["default"])

		} else {

			// Check if the key exists in trial_data
			// If it exists, used the value in trial_data
			// Else, use the default specified
			obj[key] = (key in trial_data ? trial_data[key] : attrib["default"]);
		}
	}

	return obj;
}
