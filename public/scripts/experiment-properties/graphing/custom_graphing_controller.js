import {create_distractor_scatter_plot} from "/scripts/experiment-properties/graphing/d3-custom-plots/distractor_scatter_plot.js";
export {is_custom_plot, prepare_custom_plot};

/**
 * Checks if the experiment needs a custom plot.
 *
 * @param  {object}   experiment
 * @return {boolean}
 */
function is_custom_plot(experiment) {

    if (experiment.condition_group === "distractor") {
        return true;
    }
    return false;
}

/**
 * Routes to the correct plotting code in /d3-custom-plots depending on 
 * experiment condition.
 *
 * @param  {object}   experiment
 * @return {boolean}
 */
function prepare_custom_plot(experiment) {

    if (experiment.condition_group === "distractor") {
        prepare_distractor_scatter_plot(experiment);
    } else {
        throw Error("Condition " + experiment.condition_name + " does not have a custom plot function.");
    }
}

////////////////////////////////////////////////////////////////////////////////////////
// CUSTOM PREPARE METHODS HERE
////////////////////////////////////////////////////////////////////////////////////////

/**
 * Sets up attributes from trial data for distractor scatter plots and creates the plots.
 *
 * @param {object}   experiment
 */
function prepare_distractor_scatter_plot(experiment) {

  let datasets = experiment.coordinates;
  let distractors = experiment.distractor_coordinates;
  let trial_data = experiment.trial_data;
  let attributes = "";

  for (let i in datasets) {

    attributes = {
      target: {
        dataset: datasets[i],
        graph_attributes: {
          axis_color:  ("axis_color"   in trial_data ? trial_data.axis_color   : "BLACK"),
          point_color: ("target_color" in trial_data ? trial_data.target_color : "BLACK"),
          point_shape: ("target_shape" in trial_data ? trial_data.target_shape : "circle"),
          point_size:  ("point_size"   in trial_data ? trial_data.point_size   : 3),
        }
      },
      distractor: {
        dataset: distractors[i],
        graph_attributes: {
          point_color: ("dist_color" in trial_data ? trial_data.dist_color : "RED"),
          point_shape: ("dist_shape" in trial_data ? trial_data.dist_shape : "circle"),
          point_size:  ("point_size" in trial_data ? trial_data.point_size : 3),
        }
      }
    };
    
    create_distractor_scatter_plot(attributes);

  }

  // Set background color
  document.body.style.backgroundColor = (trial_data.background_color ? trial_data.background_color : "WHITE");
}
