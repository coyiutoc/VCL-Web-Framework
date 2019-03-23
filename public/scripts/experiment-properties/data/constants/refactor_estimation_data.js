// export {ESTIMATION_BASE, ESTIMATION_CONDITIONS};
const shape_types = [
    "line",
    "triangle",
    "square",
    "rectangle",
    "circle"
];

const sizes = [
    {base_size : 2, min_size : 1.2, max_size: 3.0},
    {base_size : 4, min_size : 3.1, max_size: 5.3},
    {base_size : 6, min_size : 5.0, max_size: 6.5}
];

const TRIALS_PER_ROUND = 4;
const MAX_STEP_SIZE = 0.05;
const FILL_COLOR = '#0000FF';
const OUTLINE_COLOR = '#0000FF';

/**
 *
 * @param shape_types {Array}
 * @param is_ref {Boolean}
 * @param fill {String}
 * @param outline {String}
 * @returns {Array}
 */
const generate_shapes = (shape_types, is_ref, fill = FILL_COLOR, outline = OUTLINE_COLOR) => {
    let shapes = [];
    shape_types.forEach((shape_type) => {
        sizes.forEach((size) => {
            let curr = {};
            curr.type = shape_type;
            curr.fill = fill;
            curr.outline = outline;
            if (is_ref) {
                curr.size = size.base_size;
                shapes.push(curr);
            } else {
                curr.size = size.min_size;
                shapes.push(curr);
                let other = JSON.parse(JSON.stringify(curr));
                other.size = size.max_size;
                shapes.push(other);
            }
        });
    });
    return shapes;
};

/**
 *
 * @param ref_shapes {Object}
 * @param mod_shapes {Object}
 * @returns {Array}
 */
const generate_estimation_conditions = (ref_shapes, mod_shapes) => {
    let conditions = [];
    ref_shapes.forEach((ref_shape) => {
        mod_shapes.forEach((mod_shape) => {
            let cond = {};
            cond.ref_shape = JSON.parse(JSON.stringify(ref_shape));
            cond.mod_shape = JSON.parse(JSON.stringify(mod_shape));
            cond.trials_per_round = TRIALS_PER_ROUND;
            cond.max_step_size = MAX_STEP_SIZE;
            conditions.push(cond);
        });
    });
    return conditions;
};

const create_estimation_exp_data = (condtion) => {
    let ref_shapes, mod_shapes;
    switch (condtion) {
        case 'triangle':
            ref_shapes = generate_shapes(['triangle'], true);
            mod_shapes = generate_shapes(['triangle'], false);
            break;
        case 'rectangle_square':
            ref_shapes = generate_shapes(['square'], true);
            mod_shapes = generate_shapes(['rectangle'], false);
            break;
        case 'line_length':
            ref_shapes = generate_shapes(['line'], true);
            mod_shapes = generate_shapes(['line'], false);
            break;
        case 'shape_estimation':
            break;

    }
    return generate_estimation_conditions(ref_shapes, mod_shapes);
};

const ESTIMATION_BASE_REFACTOR = {
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

const ESTIMATION_CONDITIONS_REFACTOR = {
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