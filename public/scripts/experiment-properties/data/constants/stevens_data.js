export {STEVENS_BASE, STEVENS_CONDITIONS};

const STEVENS_BASE = {

  foundational : 
    [
    {distribution_type: "gaussian", round_type: 'test', trials_per_round: 4, high_ref: 1, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

    {distribution_type: "gaussian", round_type: 'test', trials_per_round: 4, high_ref: 0.5, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

    {distribution_type: "gaussian", round_type: 'test', trials_per_round: 4, high_ref: 1, low_ref: 0.5, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

    {distribution_type: "gaussian", round_type: 'test', trials_per_round: 4, high_ref: 0.25, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

    {distribution_type: "gaussian", round_type: 'test', trials_per_round: 4, high_ref: 0.5, low_ref: 0.25, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

    {distribution_type: "gaussian", round_type: 'test', trials_per_round: 4, high_ref: 0.75, low_ref: 0.5, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},

    {distribution_type: "gaussian", round_type: 'test', trials_per_round: 4, high_ref: 1, low_ref: 0.75, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},
    
    {distribution_type: "gaussian", round_type: 'consistency', trials_per_round: 4, high_ref: 0.375, low_ref: 0.125, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},
    
    {distribution_type: "gaussian", round_type: 'consistency', trials_per_round: 4, high_ref: 0.5, low_ref: 0.25, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},
    
    {distribution_type: "gaussian", round_type: 'consistency', trials_per_round: 4, high_ref: 0.625, low_ref: 0.375, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},
    
    {distribution_type: "gaussian", round_type: 'consistency', trials_per_round: 4, high_ref: 0.75, low_ref: 0.5, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},
    
    {distribution_type: "gaussian", round_type: 'consistency', trials_per_round: 4, high_ref: 0.875, low_ref: 0.625, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},
    
    {distribution_type: "gaussian", round_type: 'consistency', trials_per_round: 4, high_ref: 0.875, low_ref: 0.125, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},
    
    {distribution_type: "gaussian", round_type: 'consistency', trials_per_round: 4, high_ref: 0.75, low_ref: 0.25, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},
    
    {distribution_type: "gaussian", round_type: 'consistency', trials_per_round: 4, high_ref: 0.625, low_ref: 0.375, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},
    ],

  design: 
    [
    {distribution_type: "gaussian", round_type: 'design', trials_per_round: 4, high_ref: 1, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 5, regen_rate: 1000},

    {distribution_type: "gaussian", round_type: 'design', trials_per_round: 4, high_ref: 1, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 5, regen_rate: 1000},

    {distribution_type: "gaussian", round_type: 'design', trials_per_round: 4, high_ref: 1, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 5, regen_rate: 1000},

    {distribution_type: "gaussian", round_type: 'design', trials_per_round: 4, high_ref: 1, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 5, regen_rate: 1000},

    {distribution_type: "gaussian", round_type: 'design', trials_per_round: 4, high_ref: 1, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 5, regen_rate: 1000}
    ]
}

const STEVENS_CONDITIONS = {

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

    {point_color: "BLACK", strip_width: 1}
  ],

  distractor_square_red_hue:
  [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d83862', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#d54049', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#c05819', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#ae6500', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'hue'}
  ],

  distractor_square_red_lum :
  [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#9e210f', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#b63821', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#e45f43', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#fe7657', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'lum'}
  ],


  distractor_square_red_chrom:
  [
    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#aa6453', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#bc5942', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#dc391f', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: '#eb1607', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'},

    {dist_base: 0.3, dist_error: 0.0001, dist_num_points: 100, dist_color: 'WHITE', dist_shape: 'square', target_color: '#cd4c32', target_shape: 'square', point_size: 8, dimension: 'chro'}
  ], 
  
}
