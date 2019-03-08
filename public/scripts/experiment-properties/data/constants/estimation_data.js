export {ESTIMATION_BASE, ESTIMATION_CONDITIONS};

const ESTIMATION_BASE = {
    // #0000ff is the code for blue
    estimation : [
        {base_shape: "triangle", mod_shape: "rectangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "rectangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "rectangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "rectangle", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "rectangle", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "rectangle", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "circle", mod_shape: "rectangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "rectangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "rectangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "circle", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "triangle", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "rectangle", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "rectangle", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "rectangle", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

    ],
};

const ESTIMATION_CONDITIONS = {
    /*
    shape_estimation: [
        {base_shape: "circle", mod_shape: "rectangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "rectangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "rectangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "circle", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "circle", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "triangle", mod_shape: "rectangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "rectangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "rectangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "triangle", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "triangle", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "rectangle", mod_shape: "triangle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "rectangle", mod_shape: "triangle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "rectangle", mod_shape: "triangle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},

        {base_shape: "rectangle", mod_shape: "circle", base_size : 2, min_size : 1.2, max_size: 3.0, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "rectangle", mod_shape: "circle", base_size : 4, min_size : 3.1, max_size: 5.3, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
        {base_shape: "rectangle", mod_shape: "circle", base_size : 6, min_size : 5.0, max_size: 6.5, max_step_size: 0.05, trials_per_round: 4,fill_color: '#0000FF'},
    ]
    */
};