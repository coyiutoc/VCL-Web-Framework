// export {ESTIMATION_BASE, ESTIMATION_CONDITIONS};
const TRIALS_PER_ROUND = 4;
const MAX_STEP_SIZE = 0.05;
const FILL_COLOR = '#0000FF';
const OUTLINE_COLOR = '#0000FF';

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

let ESTIMATION_CONDITIONS = {
    shape_estiation: [],
    line_length: [],
    rectangle_square: [],
    rectangle_rotated_square_solid: [],
    rectangle_rotated_square_outline: [],
    triangle: [],
    square: [],
    line_length_2: [],
    line_arc:[],
    triangle_fan:[]
};

let ESTIMATION_BASE = {
    shape_estiation: {
        ref_shapes: {
            types: ["triangle", "circle", "square"],
            sizes: [2, 4, 6],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by:[0, 0, 0]
        },
        mod_shapes: {
            types: [["circle", "square"],
                ["triangle", "square"],
                ["triangle", "circle"]],
            sizes: [[1.2, 3.0], [3.1, 5.3], [5.0, 6.5]],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [[0, 0], [0, 0], [0, 0]]
        },
        trials_per_round: TRIALS_PER_ROUND,
        max_step_size: MAX_STEP_SIZE
    },
    line_length: {
        ref_shapes: {
            types: ["line"],
            sizes: [2, 4, 6],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by:[0]
        },
        mod_shapes: {
            types: [["line"]],
            sizes: [[1.2, 3.0], [3.1, 5.3], [5.0, 6.5]],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [[0]]
        },
        trials_per_round: TRIALS_PER_ROUND,
        max_step_size: MAX_STEP_SIZE
    },
    rectangle_square: {
        ref_shapes: {
            types: ["square"],
            sizes: [2, 4, 6],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by:[0]
        },
        mod_shapes: {
            types: [["rectangle"]],
            sizes: [[1.2, 3.0], [3.1, 5.3], [5.0, 6.5]],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [[0, 90]],
            width_height_ratio: 2
        },
        trials_per_round: TRIALS_PER_ROUND,
        max_step_size: MAX_STEP_SIZE
    },
    rectangle_rotated_square_solid: {
        ref_shapes: {
            types: ["square"],
            sizes: [2, 4, 6],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by:[45]
        },
        mod_shapes: {
            types: [["rectangle"]],
            sizes: [[1.2, 3.0], [3.1, 5.3], [5.0, 6.5]],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [[45, 0]],
            width_height_ratio: 2
        },
        trials_per_round: TRIALS_PER_ROUND,
        max_step_size: MAX_STEP_SIZE
    },
    rectangle_rotated_square_outline: {
        ref_shapes: {
            types: ["square"],
            sizes: [2, 4, 6],
            fill: '#FFFFFF',
            outline: OUTLINE_COLOR,
            rotate_by:[45]
        },
        mod_shapes: {
            types: [["rectangle"]],
            sizes: [[1.2, 3.0], [3.1, 5.3], [5.0, 6.5]],
            fill: '#FFFFFF',
            outline: OUTLINE_COLOR,
            rotate_by: [[45, 0]],
            width_height_ratio: 2
        },
        trials_per_round: TRIALS_PER_ROUND,
        max_step_size: MAX_STEP_SIZE
    },
    triangle: {
        ref_shapes: {
            types: ["triangle"],
            sizes: [2, 4, 6],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by:[0]
        },
        mod_shapes: {
            types: [["triangle"]],
            sizes: [[1.2, 3.0], [3.1, 5.3], [5.0, 6.5]],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [[0, 90]]
        },
};

const generate_estimation_data = (condition) => {
   let result = [];
   let curr_cond = ESTIMATION_BASE[condition];
   let ref_shapes = curr_cond.ref_shapes;
   let mod_shapes = curr_cond.mod_shapes;
   ref_shapes.types.forEach((ref_shape, index)=>{
       ref_shapes.sizes.forEach((size)=>{
           let condition = {};
           condition.ref_shape = ref_shape;
           condition.ref_size = size;
           condition.ref_rotate_by = ref_shapes.rotate_by[index];
           condition.ref_fill = ref_shapes.fill;
           condition.ref_outline = ref_shapes.outline;
           let curr_mod_shapes = mod_shapes.types[index];
           curr_mod_shapes.forEach((mod_shape)=>{
               let curr_condition = {};
               Object.assign(curr_condition, condition);
               curr_condition.mod_shape = mod_shape;

           })
       });
   });
   return result;
};

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
