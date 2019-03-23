export {ESTIMATION_BASE, ESTIMATION_CONDITIONS};

const ESTIMATION_BASE = {
    estimation : [
        {base_shape: "triangle", mod_shape: "square", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "square", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "square", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "square", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "square", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "square", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "circle", mod_shape: "square", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "square", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "square", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "circle", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "triangle", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "square", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "square", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "square", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

    ],
};

const ESTIMATION_CONDITIONS = {
    shape_estimation: [
        {base_shape: "circle", mod_shape: "square", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "square", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "square", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "circle", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "triangle", mod_shape: "square", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "square", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "square", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "triangle", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "square", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "square", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "square", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "square", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "square", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "square", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
    ],
    line_length: [
        {base_shape: "line", mod_shape: "line", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', stroke_width: 1.5, mod_rotate_by: 45},
        {base_shape: "line", mod_shape: "line", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', stroke_width: 1.5, mod_rotate_by: 45},
        {base_shape: "line", mod_shape: "line", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', stroke_width: 1.5, mod_rotate_by: 45},
        {base_shape: "line", mod_shape: "line", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', stroke_width: 1.5, mod_rotate_by: 0},
        {base_shape: "line", mod_shape: "line", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', stroke_width: 1.5, mod_rotate_by: 0},
        {base_shape: "line", mod_shape: "line", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', stroke_width: 1.5, mod_rotate_by: 0},
    ],
    rectangle_square: [
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 90},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 90},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 90},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 0},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 0},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 0},
    ],
    rectangle_rotated_square_solid: [
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 45, ref_rotate_by: 45},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 45, ref_rotate_by: 45},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 45, ref_rotate_by: 45},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 0, ref_rotate_by:45},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 0, ref_rotate_by:45},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 0, ref_rotate_by: 45},
    ],
    rectangle_rotated_square_outline: [
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#FFFFFF', outline:'#0000FF', mod_rotate_by: 45, ref_rotate_by: 45},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#FFFFFF', outline:'#0000FF', mod_rotate_by: 45, ref_rotate_by: 45},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#FFFFFF', outline:'#0000FF', mod_rotate_by: 45, ref_rotate_by: 45},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#FFFFFF', outline:'#0000FF', mod_rotate_by: 0, ref_rotate_by:45},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#FFFFFF', outline:'#0000FF', mod_rotate_by: 0, ref_rotate_by:45},
        {base_shape: "square", mod_shape: "rectangle", width_height_ratio: 2, base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#FFFFFF', outline:'#0000FF', mod_rotate_by: 0, ref_rotate_by: 45},
   ],
    triangle: [
        {base_shape: "triangle", mod_shape: "triangle", width_height_ratio: 2, base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 90},
        {base_shape: "triangle", mod_shape: "triangle", width_height_ratio: 2, base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 90},
        {base_shape: "triangle", mod_shape: "triangle", width_height_ratio: 2, base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 90},
        {base_shape: "triangle", mod_shape: "triangle", width_height_ratio: 2, base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 0},
        {base_shape: "triangle", mod_shape: "triangle", width_height_ratio: 2, base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 0},
        {base_shape: "triangle", mod_shape: "triangle", width_height_ratio: 2, base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF', mod_rotate_by: 0},
    ]
};