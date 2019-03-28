import {create_scatter_plot} from "/scripts/experiment-properties/graphing/d3/scatter_plot.js";
import {create_strip_plot} from "/scripts/experiment-properties/graphing/d3/strip_plot.js";
import {create_ring_plot} from "/scripts/experiment-properties/graphing/d3/ring_plot.js";

export function plot_distributions(experiment) {

	let experiment_name = experiment.constructor.name;

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

		default:
			throw Error("Graph type " + experiment.graph_type + " is not supported.");
	}
}

function prepare_scatter_plot(experiment) {

	let datasets = experiment.coordinates;
	let distractors = experiment.distractor_coordinates;
	let trial_data = experiment.trial_data;
	let attributes = "";

    for (let i in datasets) {

    	// For one-distribution plots
    	if (!distractors) {

	    	attributes = {
				target: {
					dataset: datasets[i],
					graph_attributes: {
						axis_color: (trial_data.axis_color ? trial_data.axis_color : "BLACK"),
						point_color: (trial_data.point_color ? trial_data.point_color : "BLACK"),
						point_shape: (trial_data.point_shape ? trial_data.point_shape : "circle"),
						point_size: (trial_data.point_size ? trial_data.point_size : 3),
					}
				}
			};

		}

		// For two-distribution (distractor) plots
		else {

			attributes = {
				target: {
					dataset: datasets[i],
					graph_attributes: {
						axis_color: (trial_data.axis_color ? trial_data.axis_color : "BLACK"),
						point_color: (trial_data.target_color ? trial_data.target_color : "BLACK"),
						point_shape: (trial_data.target_shape ? trial_data.target_shape : "circle"),
						point_size: (trial_data.point_size ? trial_data.point_size : 3),
					}
				},
				distractor: {
					dataset: distractors[i],
					graph_attributes: {
						point_color: (trial_data.dist_color ? trial_data.dist_color : "RED"),
						point_shape: (trial_data.dist_shape ? trial_data.dist_shape : "circle"),
						point_size: (trial_data.point_size ? trial_data.point_size : 3),
					}
				}
			};
		}
		
	    create_scatter_plot(attributes);
	}

    // Set background color
    document.body.style.backgroundColor = (trial_data.background_color ? trial_data.background_color : "WHITE");
}

function prepare_strip_plot(experiment) {

	let datasets = experiment.coordinates;
	let trial_data = experiment.trial_data;

	for (let i in datasets) {

		let attributes = 
			{
				target: {
					dataset: datasets[i],
					graph_attributes: {
						axis_color: (trial_data.axis_color ? trial_data.axis_color : "BLACK"),
						fill_color: (trial_data.fill_color ? trial_data.fill_color : "BLACK"),
						fixed_strip_height: ("fixed_strip_height" in trial_data ? trial_data.fixed_strip_height : true),
						strip_width: (trial_data.strip_width ? trial_data.strip_width : 1),
					}
				}
			};

		create_strip_plot(attributes);
	}

	// Set background color
    document.body.style.backgroundColor = (trial_data.background_color ? trial_data.background_color : "WHITE");
}

function prepare_ring_plot(experiment) {

	let datasets = experiment.coordinates;
	let trial_data = experiment.trial_data;

	for (let i in datasets) {

		let attributes = 
			{
				target: {
					dataset: datasets[i],
					graph_attributes: {
						axis_color: (trial_data.axis_color ? trial_data.axis_color : "BLACK"),
						fill_color: (trial_data.fill_color ? trial_data.fill_color : "none"),
						ring_thickness: (trial_data.ring_thickness ? trial_data.ring_thickness : 1),
						stroke_color: (trial_data.stroke_color ? trial_data.stroke_color : "BLACK"),
					}
				}
			};

		create_ring_plot(attributes);
	}

	// Set background color
    document.body.style.backgroundColor = (trial_data.background_color ? trial_data.background_color : "WHITE");
}
