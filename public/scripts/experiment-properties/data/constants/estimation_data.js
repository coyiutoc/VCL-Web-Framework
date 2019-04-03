export {ESTIMATION_BASE};

const TRIALS_PER_ROUND = 4;
const MAX_STEP_SIZE = 0.05;
const FILL_COLOR = '#0000FF';
const OUTLINE_COLOR = '#0000FF';

const ESTIMATION_BASE = {
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
            width_height_ratio: 2,
            outline: OUTLINE_COLOR,
            rotate_by: [[0, 90]]
        }
    },
};
