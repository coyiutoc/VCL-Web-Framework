export {ESTIMATION_BASE, ESTIMATION_CONDITIONS};

const ESTIMATION_BASE = {
  estimation : [
      {distribution_type: "gaussian", round_type: 'test', trials_per_round: 4, high_ref: 1, low_ref: 0, error: 0.0001, num_points: 100, regen_rate: 1000, mean: 0.5, SD: 0.2, num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', background_color: 'WHITE', point_size: 3, regen_rate: 1000},
  ],
};

const ESTIMATION_CONDITIONS = {
   shape_estimation: [
       {base_shape: "circle", mod_shape: "rectangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "circle", mod_shape: "rectangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "circle", mod_shape: "rectangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "circle", mod_shape: "rectangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "circle", mod_shape: "rectangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "circle", mod_shape: "rectangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},

       {base_shape: "circle", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "circle", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "circle", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "circle", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "circle", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "circle", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},

       {base_shape: "triangle", mod_shape: "rectangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "triangle", mod_shape: "rectangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "triangle", mod_shape: "rectangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "triangle", mod_shape: "rectangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "triangle", mod_shape: "rectangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "triangle", mod_shape: "rectangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},

       {base_shape: "triangle", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "triangle", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "triangle", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "triangle", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "triangle", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "triangle", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},

       {base_shape: "rectangle", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "rectangle", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "rectangle", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "rectangle", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "rectangle", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "rectangle", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},

       {base_shape: "rectangle", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "rectangle", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "rectangle", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "rectangle", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "rectangle", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: true , line_color: '#000000',fill_color: '#4a77dd'},
       {base_shape: "rectangle", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.01, is_smaller: false, line_color: '#000000',fill_color: '#4a77dd'}
   ]
};