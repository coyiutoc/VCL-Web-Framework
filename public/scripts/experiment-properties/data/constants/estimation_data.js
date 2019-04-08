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
            rotate_by: [[0], [0], [0]],
            height_to_width: [1, 1, 1]
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
            rotate_by: [[0]],
            height_to_width: [1]
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
            height_to_width:[2]
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
            height_to_width: [2]
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
            height_to_width: [2]
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
            height_to_width: [2],
            outline: OUTLINE_COLOR,
            rotate_by: [[0, 90]]
        }
    },

    square: {
        ref_shapes: {
            types: ["square"],
            sizes: [2, 4, 6],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [0]
        },
        mod_shapes: {
            types: [["square"]],
            sizes: [[1.2, 3.0], [3.1, 5.3], [5.0, 6.5]],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [[0, 15]],
            height_to_width:[1]
        }
    },

    line_rotated: {
        ref_shapes: {
            types: ["line"],
            sizes: [2, 4, 6],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [90]
        },
        mod_shapes: {
            types: [["line"]],
            sizes: [[1.2, 3.0], [3.1, 5.3], [5.0, 6.5]],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [[15, 75, -15, -75]]
        }
    },

    line_curve: {
        ref_shapes: {
            types: ["line"],
            sizes: [2, 4, 6],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [90]
        },
        mod_shapes: {
            types: [["line", "curve_left", "curve_right"]],
            sizes: [[1.2, 3.0], [3.1, 5.3], [5.0, 6.5]],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [[0]]
        }
    },

    triangle_fan: {
        ref_shapes: {
            types: ["triangle"],
            sizes: [2, 4, 6],
            fill: FILL_COLOR,
            outline: OUTLINE_COLOR,
            rotate_by: [0]
        },
        mod_shapes: {
            types: [["triangle", "fan", "triangle"]],
            sizes: [[1.2, 3.0], [3.1, 5.3], [5.0, 6.5]],
            fill: FILL_COLOR,
            height_to_width: [Math.sqrt(3)/ 2, Math.sqrt(3) / 2, 1 / Math.sqrt(3)],
            outline: OUTLINE_COLOR,
            rotate_by: [[0]]
        }
    },
};
