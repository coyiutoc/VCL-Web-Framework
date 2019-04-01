export {generate_estimation_experiment_data};
const TRIALS_PER_ROUND = 4;
const MAX_STEP_SIZE = 0.05;
const FILL_COLOR = '#0000FF';
const OUTLINE_COLOR = '#0000FF';
const MATCH_SIZES = {
    "2": {
        min_size: 1.2,
        max_size: 3
    },
    "4": {
        min_size: 3.1,
        max_size: 5.3
    },
    "6": {
        min_size: 5.0,
        max_size: 6.5
    }
};

let ESTIMATION_BASE = {
    shape_estimation: {
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
            rotate_by: [[0], [0], [0]]
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
            rotate_by: [0]
        },
        mod_shapes: {
            types: [["triangle"]],
            sizes: [[1.2, 3.0], [3.1, 5.3], [5.0, 6.5]],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [[0, 90]]
        }
    },
};

const generate_estimation_experiment_data = (condition) => {
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
            condition.max_step_size = MAX_STEP_SIZE;
            condition.trials_per_round = TRIALS_PER_ROUND;
            mod_shapes.types[index].forEach((mod_shape)=>{
                mod_shapes.rotate_by[index].forEach((angle)=>{
                    let curr_sub_cond = {};
                    Object.assign(curr_sub_cond, condition);
                    curr_sub_cond.mod_shape = mod_shape;
                    curr_sub_cond.mod_min_size = MATCH_SIZES[size.toString()].min_size;
                    curr_sub_cond.mod_max_size = MATCH_SIZES[size.toString()].min_size;
                    curr_sub_cond.mod_rotate_by = angle;
                    curr_sub_cond.mod_fill = mod_shapes.fill;
                    curr_sub_cond.mod_outline = mod_shapes.outline;
                    result.push(curr_sub_cond);
                });

            });
        });
    });
    console.log(JSON.stringify(result));
    return result;
};

