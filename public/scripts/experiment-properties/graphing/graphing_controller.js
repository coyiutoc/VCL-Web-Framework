import {create_scatter_plot} from "/scripts/experiment-properties/graphing/d3-base-plots/scatter_plot.js";
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
			graph_attributes: {
				axis_color:  ("axis_color"  in trial_data ? trial_data.axis_color  : "BLACK"),
				point_color: ("point_color" in trial_data ? trial_data.point_color : "BLACK"),
				point_shape: ("point_shape" in trial_data ? trial_data.point_shape : "circle"),
				point_size:  ("point_size"  in trial_data ? trial_data.point_size  : 3),
			}
		};
		
	    create_scatter_plot(attributes);
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
			graph_attributes: {
				axis_color: 		("axis_color"         in trial_data ? trial_data.axis_color         : "BLACK"),
				fill_color: 		("fill_color"         in trial_data ? trial_data.fill_color         : "BLACK"),
				fixed_strip_height: ("fixed_strip_height" in trial_data ? trial_data.fixed_strip_height : true),
				strip_width: 		("strip_width"        in trial_data ? trial_data.strip_width        : 1),
			}	
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
			graph_attributes: {
				axis_color:     ("axis_color"     in trial_data ? trial_data.axis_color     : "BLACK"),
				fill_color:     ("fill_color"     in trial_data ? trial_data.fill_color     : "none"),
				ring_thickness: ("ring_thickness" in trial_data ? trial_data.ring_thickness : 1),
				stroke_color:   ("stroke_color"   in trial_data ? trial_data.stroke_color   : "BLACK"),
			}
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
			graph_attributes: {
				axis_color: 	("axis_color"     in trial_data ? trial_data.axis_color     : "BLACK"),
				fill_color: 	("fill_color"     in trial_data ? trial_data.fill_color     : "BLACK"),
				shape_type:  	("shapes"         in trial_data ? trial_data.shapes[i]      : "circle"),
				slice_rotation: ("slice_rotation" in trial_data ? trial_data.slice_rotation : 0),
				stroke_color:   ("stroke_color"   in trial_data ? trial_data.stroke_color   : "none"),
			}
		};

		create_shape_plot(attributes);
	}

	// Set background color
    document.body.style.backgroundColor = (trial_data.background_color ? trial_data.background_color : "WHITE");
}
