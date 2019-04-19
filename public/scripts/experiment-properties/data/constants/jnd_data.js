export {JND_BASE, JND_CONDITIONS};

const JND_BASE = {

  foundational : 
    [
    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.8, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.7, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.5, error: 0.0001, max_step_size: 0.01, converge_from_above: false, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.4, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.2, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.1, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.0, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.8, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.7, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.5, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.4, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6}
    ],

  design: 
    [
    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},

    {distribution_type: "gaussian", base_correlation: 0.9, error: 0.0001, max_step_size: 0.01, converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 6},
    ]
}

const JND_CONDITIONS = {

  distractor_rainbow : 
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'GREEN', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'GREEN', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'GREEN', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'RED', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'BLUE', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'BLUE', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'BLUE', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'YELLOW', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'YELLOW', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'YELLOW', target_color: 'BLACK', dist_point_size: 6}
    ],

  distractor_square_red_hue :
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d83862', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d83862', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d83862', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d54049', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d54049', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d54049', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#c05819', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#c05819', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#c05819', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#ae6500', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#ae6500', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#ae6500', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'}
    ],

  distractor_square_red_lum :
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9e210f', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9e210f', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9e210f', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#b63821', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#b63821', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#b63821', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#e45f43', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#e45f43', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#e45f43', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#fe7657', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#fe7657', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#fe7657', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'}
    ],

  distractor_square_red_chrom:
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#aa6453', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#aa6453', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#aa6453', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#bc5942', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#bc5942', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#bc5942', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dc391f', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dc391f', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dc391f', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#eb1607', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#eb1607', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#eb1607', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'}
    ], 

  distractor_square_yellow_hue :
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#ffaf7d', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#ffaf7d', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#ffaf7d', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f4bc6a', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f4bc6a', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f4bc6a', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#bfce6d', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#bfce6d', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#bfce6d', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9fd57d', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9fd57d', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9fd57d', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'hue'}
    ],

  distractor_square_yellow_lum :
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#b19e41', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#b19e41', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#b19e41', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#c6b254', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#c6b254', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#c6b254', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f1da7a', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f1da7a', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f1da7a', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#fff08e', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#fff08e', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#fff08e', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'lum'}
    ],

  distractor_square_yellow_chrom:
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d1c6a3', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d1c6a3', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d1c6a3', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d7c685', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d7c685', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d7c685', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dec644', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dec644', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dec644', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dfc602', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dfc602', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dfc602', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#dbc667', target_shape: 'square', point_size: 8, dimension: 'chro'}
    ], 

  distractor_square_blue_hue :
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008897', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008897', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008897', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#0085ad', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#0085ad', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#0085ad', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#5575bc', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#5575bc', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#5575bc', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#816ab1', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#816ab1', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#816ab1', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'hue'}
    ],

  distractor_square_blue_lum :
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#005a95', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#005a95', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#005a95', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#006ca9', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#006ca9', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#006ca9', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#006ca9', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#006ca9', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#006ca9', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#43a4e6', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#43a4e6', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#43a4e6', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'lum'}
    ],

  distractor_square_blue_chrom:
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#6a7887', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#6a7887', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#6a7887', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#4d7ba1', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#4d7ba1', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#4d7ba1', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#0081d9', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#0081d9', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#0081d9', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#0085f7', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#0085f7', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#0085f7', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#007ebc', target_shape: 'square', point_size: 8, dimension: 'chro'}
    ], 

  distractor_square_green_hue :
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#6b7e21', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#6b7e21', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#6b7e21', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#4d8433', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#4d8433', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#4d8433', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008a67', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008a67', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008a67', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008a67', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008a67', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008a67', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'hue'}
    ],

  distractor_square_green_lum :
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#006228', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#006228', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#006228', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#007438', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#007438', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#007438', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#399b5c', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#399b5c', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#399b5c', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#4eaf6e', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#4eaf6e', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#4eaf6e', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'lum'}
    ],

  distractor_square_green_chrom:
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#5e7e66', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#5e7e66', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#5e7e66', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#468358', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#468358', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#468358', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008d33', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008d33', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#008d33', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#00920c', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#00920c', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#00920c', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'},
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#20874a', target_shape: 'square', point_size: 8, dimension: 'chro'}
    ], 

  distractor_multi: 
    [
    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#cd4c32', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#cd4c32', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#cd4c32', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#007ebc', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#007ebc', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#007ebc', target_color: 'BLACK', dist_point_size: 6}, 
    
    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#20874a', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#20874a', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#20874a', target_color: 'BLACK', dist_point_size: 6}, 

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dbc667', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dbc667', target_color: 'BLACK', dist_point_size: 6},

    {dist_base: 0.2, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dbc667', target_color: 'BLACK', dist_point_size: 6} 
    ],

  distractor_blue_shades: 
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#004078', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#004078', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#004078', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#2c6fad', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#2c6fad', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#2c6fad', target_color: '#699938', dist_point_size: 6}, 
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#69a3e5', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#69a3e5', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#69a3e5', target_color: '#699938', dist_point_size: 6}, 

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#a2d9ff', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#a2d9ff', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#a2d9ff', target_color: '#699938', dist_point_size: 6} 
    ],

  distractor_red_shades: 
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9f2b2a', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9f2b2a', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9f2b2a', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#bc4740', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#bc4740', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#bc4740', target_color: '#699938', dist_point_size: 6}, 
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#db6158', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#db6158', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#db6158', target_color: '#699938', dist_point_size: 6}, 

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#ff988a', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#ff988a', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#ff988a', target_color: '#699938', dist_point_size: 6} 
    ],

  distractor_yellow_shades: 
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d3c86a', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d3c86a', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d3c86a', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9b9236', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9b9236', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9b9236', target_color: '#699938', dist_point_size: 6}, 
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#80781b', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#80781b', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#80781b', target_color: '#699938', dist_point_size: 6}, 

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f0e484', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f0e484', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f0e484', target_color: '#699938', dist_point_size: 6} 
    ],

  distractor_yellow_shades: 
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d3c86a', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d3c86a', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d3c86a', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9b9236', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9b9236', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9b9236', target_color: '#699938', dist_point_size: 6}, 
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#80781b', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#80781b', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#80781b', target_color: '#699938', dist_point_size: 6}, 

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f0e484', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f0e484', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#f0e484', target_color: '#699938', dist_point_size: 6} 
    ],

  distractor_control_shades: 
    [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6}, 
    
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6}, 

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', target_color: '#699938', dist_point_size: 6} 
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
    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false},

    {point_color: "BLACK", strip_width: 1, fixed_strip_height: false}
    ], 

  distractor_ratio_pilot:
    [
    // 1:1 ratio
    {base_correlation: 0.3, dist_base: 0.3, dist_error: 0.0001, num_points: 75, dist_num_points: 75, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},

    {base_correlation: 0.6, dist_base: 0.3, dist_error: 0.0001, num_points: 75, dist_num_points: 75, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},
    
    {base_correlation: 0.9, dist_base: 0.3, dist_error: 0.0001, num_points: 75, dist_num_points: 75, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},
   
    // 1:5 ratio
    {base_correlation: 0.3, dist_base: 0.3, dist_error: 0.0001, num_points: 30, dist_num_points: 150, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},

    {base_correlation: 0.6, dist_base: 0.3, dist_error: 0.0001, num_points: 30, dist_num_points: 150, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},
    
    {base_correlation: 0.9, dist_base: 0.3, dist_error: 0.0001, num_points: 30, dist_num_points: 150, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},
    
    // 5:1 ratio
    {base_correlation: 0.3, dist_base: 0.3, dist_error: 0.0001, num_points: 150, dist_num_points: 30, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},

    {base_correlation: 0.6, dist_base: 0.3, dist_error: 0.0001, num_points: 150, dist_num_points: 30, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},
    
    {base_correlation: 0.9, dist_base: 0.3, dist_error: 0.0001, num_points: 150, dist_num_points: 30, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},
    
    // 3:1 ratio
    {base_correlation: 0.3, dist_base: 0.3, dist_error: 0.0001, num_points: 150, dist_num_points: 50, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},

    {base_correlation: 0.6, dist_base: 0.3, dist_error: 0.0001, num_points: 150, dist_num_points: 50, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},
    
    {base_correlation: 0.9, dist_base: 0.3, dist_error: 0.0001, num_points: 150, dist_num_points: 50, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},
    
    // 1:3 ratio
    {base_correlation: 0.3, dist_base: 0.3, dist_error: 0.0001, num_points: 50, dist_num_points: 150, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},

    {base_correlation: 0.6, dist_base: 0.3, dist_error: 0.0001, num_points: 50, dist_num_points: 150, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},
    
    {base_correlation: 0.9, dist_base: 0.3, dist_error: 0.0001, num_points: 50, dist_num_points: 150, dist_color: '#dbc667', target_color: '#007ebc', point_size: 4},
    
    ] 
}
