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
    ]  
}
