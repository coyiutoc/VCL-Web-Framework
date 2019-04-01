import {prepare_distractor_scatter_plot} from "/scripts/experiment-properties/graphing/d3-custom-plots/distractor_scatter_plot.js";
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
