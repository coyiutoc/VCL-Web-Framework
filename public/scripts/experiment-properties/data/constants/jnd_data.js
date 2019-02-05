export {JND_BASE, JND_CONDITIONS};

const JND_BASE = {

  foundational : 
    [
    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.8, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.7, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.5, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.4, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.2, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.1, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.0, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.8, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.7, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.5, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.4, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3}
    ],

  design: 
    [
    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},
    ],

  design_multi: 
    [
    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#cd4c32', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#cd4c32', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#cd4c32', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#007ebc', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#007ebc', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#007ebc', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},
    
    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#20874a', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#20874a', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#20874a', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},
    
    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#dbc667', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#dbc667', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: '#dbc667', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 3}
    
    ]
}

const JND_CONDITIONS = {

  distractor_rainbow : 
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'GREEN', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'GREEN', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'GREEN', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'BLUE', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'BLUE', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'BLUE', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'YELLOW', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'YELLOW', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'YELLOW', target_color: 'BLACK', dist_point_size: 3}
    ],

  distractor_multi: 
    [
    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#cd4c32', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#cd4c32', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#cd4c32', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#007ebc', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#007ebc', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#007ebc', target_color: 'BLACK', dist_point_size: 3}, 
    
    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#20874a', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#20874a', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#20874a', target_color: 'BLACK', dist_point_size: 3}, 

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dbc667', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dbc667', target_color: 'BLACK', dist_point_size: 3},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dbc667', target_color: 'BLACK', dist_point_size: 3} 
    ],

  strip_ring_size:
    [
    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1},

    {ring_thickness: 1}
    ],

  line_length_strip:
    [
    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1},

    {point_color: "BLACK", strip_width: 1}
    ]  

}
