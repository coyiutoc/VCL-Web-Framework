// =========================================================
// FOUNDATIONAL

const JND_PRACTICE_FULL =
[
  {base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.8, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.7, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.5, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.4, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.2, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.1, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.0, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.8, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.7, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.5, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.4, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3}
];

const JND_PRACTICE_SHORT = 
[
  {base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.8, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.7, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3}
];

const JND_TEST_FULL = 
[
  {base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.8, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.7, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.5, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.4, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.2, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.1, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.0, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.8, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.7, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.5, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.4, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3}
];

const JND_TEST_SHORT = 
[
  {base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.8, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.7, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

  {base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3}
];

const STEVENS_FULL = 
[
  {round_type: 'test', trials_per_round: 4, high_ref: 1, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 0.5, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 1, low_ref: 0.5, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 0.25, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 0.5, low_ref: 0.25, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 0.75, low_ref: 0.5, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 1, low_ref: 0.75, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000}
];

const STEVENS_SHORT = 
[
  {round_type: 'test', trials_per_round: 4, high_ref: 1, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 0.5, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 1, low_ref: 0.5, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 0.25, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000}
];

// =========================================================
// DESIGN

const JND_DESIGN_PRACTICE_SHORT = 
[
  {base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'RED', axis_color: 'RED', text_color: 'RED', feedback_background_color: 'WHITE', background_color: 'BLACK', point_size: 3},

  {base_correlation: 0.8, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'RED', axis_color: 'RED', text_color: 'RED', feedback_background_color: 'WHITE', background_color: 'BLACK', point_size: 3},

  {base_correlation: 0.7, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'RED', axis_color: 'RED', text_color: 'RED', feedback_background_color: 'WHITE', background_color: 'BLACK', point_size: 3},

  {base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'RED', axis_color: 'RED', text_color: 'RED', feedback_background_color: 'WHITE', background_color: 'BLACK', point_size: 3}
];

const STEVENS_DESIGN_PRACTICE_SHORT = 
[
  {round_type: 'test', trials_per_round: 4, high_ref: 1, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'RED', axis_color: 'RED', text_color: 'RED', background_color: 'BLACK', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 0.5, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'RED', axis_color: 'RED', text_color: 'RED', background_color: 'BLACK', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 1, low_ref: 0.5, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'RED', axis_color: 'RED', text_color: 'RED', background_color: 'BLACK', point_size: 3, regen_rate: 1000},

  {round_type: 'test', trials_per_round: 4, high_ref: 0.25, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'RED', axis_color: 'RED', text_color: 'RED', background_color: 'BLACK', point_size: 3, regen_rate: 1000}
];

/**
 * Retrieves foundational data set. If desired, can choose a shorter version of 
 * the set (helpful for debugging purposes) - in this case, it will only
 * give 4 test subconditions and 4 practice subconditions.
 *
 * @param  block_type {string}             "test" or "practice"
 *         is_full_set {boolean}           if false, will return a subset of the usual 
 *                                         number of subconditions
 * @return data {[ {assoc array}, {assoc array} ... ]}
 */   
function get_jnd_data(block_type, is_full_set){
  if (block_type == "practice"){
    if (is_full_set){
      return JND_PRACTICE_FULL;
    }
    else{
      return JND_PRACTICE_SHORT;
    }
  }
  else if (block_type == "test"){
    if (is_full_set){
      return JND_TEST_FULL; 
    }
    else{
      return JND_TEST_SHORT; 
    }  
  }
}

/**
 * Retrieves foundational data set. If desired, can choose a shorter version of 
 * the set (helpful for debugging purposes) - in this case, it will only
 * give 4 test subconditions and 4 practice subconditions. 
 * 
 * Note that Stevens foundational has identical practice and test subconditions (based on excel).
 *
 * @param  is_full_set {boolean}           if false, will return a subset of the usual 
 *                                         number of subconditions
 * @return data {[ {assoc array}, {assoc array} ... ]}
 */  
function get_stevens_data(is_full_set){
  if (is_full_set){ 
    return STEVENS_FULL;
  }
  else{
    return STEVENS_SHORT;
  }
}

export {
  JND_PRACTICE_FULL,
  JND_PRACTICE_SHORT,
  JND_DESIGN_PRACTICE_SHORT,
  JND_TEST_FULL,
  JND_TEST_SHORT,
  get_jnd_data,
  get_stevens_data
}