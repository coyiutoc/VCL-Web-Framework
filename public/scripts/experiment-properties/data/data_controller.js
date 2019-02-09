import {JND_BASE, JND_CONDITIONS} from "/scripts/experiment-properties/data/constants/jnd_data.js";
import {STEVENS_BASE, STEVENS_CONDITIONS} from "/scripts/experiment-properties/data/constants/stevens_data.js";
import {JND_RADIUS_BASE} from "/scripts/experiment-properties/data/constants/jnd_radius_data.js";
import {ESTIMATION_BASE, ESTIMATION_CONDITIONS} from "./constants/estimation_data";

export { get_data,
         get_data_subset };

// Add the subcondition name + how many subcondition repeats.
// Otherwise default is zero for any condition.
const SUBCONDITION_REPEATS = {
    foundational : {},
    design : {},
    design_multi : {
        distractor_multi: 4
    }
}

/**
 * Retrieves the data for the corresponding experiment object.
 *
 * @param  experiment  {object}       Model object of the experiment 
 *
 * @return dataset     [{assoc}, {assoc}, .... ]         
 */
function get_data(experiment){

  var dataset;

  var range = experiment.range;
  var condition = experiment.condition_name;
  var experiment_name = experiment.constructor.name;

  if (experiment_name === "JND"){

    dataset = JND_BASE[range];

    if (condition !== "base") {

      if (!JND_CONDITIONS[condition]) {
        throw new Error(condition + " not supported.");
      }

      dataset = create_condition_dataset(dataset, JND_CONDITIONS[condition]);
    }
  }
  else if (experiment_name === "JND_Radius"){

    dataset = JND_RADIUS_BASE[range];

  }
  else if (experiment_name === "Stevens"){

    dataset = STEVENS_BASE[range];

    if (condition !== "base") {

      if (!STEVENS_CONDITIONS[condition]) {
        throw new Error(condition + " not supported.");
      }

      dataset = create_condition_dataset(dataset, STEVENS_CONDITIONS[condition]);
    }
  }
  else if (experiment_name === "Estimation") {
    dataset = ESTIMATION_BASE[range];
      if (condition !== "base") {
        if (!ESTIMATION_CONDITIONS[condition]) {
            throw new Error(condition + " not supported.");
        }
        dataset = create_condition_dataset(dataset, ESTIMATION_CONDITIONS[condition]);
      }
  }
  else {
    throw new Error(experiment + " not supported.");
  }

  // Repeat subconditions if specified
  let result = [];
  let repeats = SUBCONDITION_REPEATS[range][condition];

  if (repeats > 0) {
      for (let i = 0; i < repeats; i++) {
        result = result.concat(dataset);
      }
  } else {
    result = dataset;
  }    

  return result;
}

/**
 * Retrieves a smaller dataset (4 subconditions) given experiment, range and condition.
 *
 * @param  experiment  {string}            "jnd" or "stevens"   
 *         range       {string}            "foundational" or "design"         
 *         condition   {string}            Name of condition
 *
 * @return dataset     [{assoc}, {assoc}, .... ]         
 */
function get_data_subset(experiment, range, condition) {

  var dataset = get_data(experiment, range, condition);

  return dataset.slice(0, 4);
}

/**
 * Appends condition-specific data to the dataset.
 *
 * @param  dataset           [{assoc}, {assoc}, .... ]     dataset with base experiment constants   
 * @param  condition_data    [{assoc}, {assoc}, .... ]     condition set for that experiment
 *
 * @return dataset           [{assoc}, {assoc}, .... ]  
 **/
function create_condition_dataset(dataset, condition_data){

  var condition_dataset = [];

  for (let i in dataset) {
    let obj = Object.assign({}, dataset[i], condition_data[i]);
    condition_dataset.push(obj);
  }

  return condition_dataset;
}
