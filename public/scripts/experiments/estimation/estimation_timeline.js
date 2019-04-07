import Estimation from "/scripts/experiments/estimation/estimation.js";
export var estimation_exp = new Estimation(params);

var timeline = [];
var address = location.protocol + "//" + location.hostname + ":" + location.port;

// =========================================================
// WELCOME TRIAL BLOCK

var welcome = {
    type: 'html-keyboard-response',
    stimulus: `<div align = "center">` + `<img src="${address}/img/VCL_lab_logo.png"></img><br><br>` +
    `<b>Base:</b> estimation` + '<br>' +
    `<b>Trial Type:</b> ${estimation_exp.trial_structure}` + '<br>' +
    `<b>Graph Type:</b> ${estimation_exp.graph_type}` + '<br>' +
    `<b>Condition:</b> ${estimation_exp.condition_name}` +
    '<br><br><br><p><font size = 15>Press any key to begin.<p></font>' +
    '</div>',
    data: {type: 'instruction'}
};
timeline.push(welcome);

// =========================================================
// INSTRUCTION TRIAL BLOCKS
/*
switch(estimation_exp.graph_type){
    case "shapes":
        if (estimation_exp.condition_name === "shape_estimation") {
            var instructions = {
                type: "html-keyboard-response",
                stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
                " and <b>z</b> keys to adjust the size of the modifiable shape<br> so that it's size is roughly" +
                " the <u>same</u> as the reference shape. <br><br>" +
                `<div><img src='${address}/img/sample_circle.png'></img><img src='${address}/img/sample_triangle.png'></img></div>` +
                " <b>m</b> increases the size. <br>" +
                " <b>z</b> decreases the size. <br><br>" +
                `<div style='float: left; margin-bottom: 25px;'></div>` +
                "<br> <br> <br> When you are done adjusting the size, hit the <b>spacebar</b>." +
                "<br> Press any key to continue. </div>"
            };
        } else if (estimation_exp.condition_name === "triangle") {
            var instructions = {
                type: "html-keyboard-response",
                stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
                " and <b>z</b> keys to adjust the size of the modifiable shape<br> so that it's size is roughly" +
                " the <u>same</u> as the reference shape. <br><br>" +
                `<div><img src='${address}/img/sample_triangle_1.png'></img><img src='${address}/img/sample_triangle_2.png'></img></div>` +
                " <b>m</b> increases the size. <br>" +
                " <b>z</b> decreases the size. <br><br>" +
                `<div style='float: left; margin-bottom: 25px;'></div>` +
                "<br> <br> <br> When you are done adjusting the size, hit the <b>spacebar</b>." +
                "<br> Press any key to continue. </div>"
            };
        } else if (estimation_exp.condition_name === "rectangle_square") {
            var instructions = {
                type: "html-keyboard-response",
                stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
                " and <b>z</b> keys to adjust the size of the modifiable shape<br> so that it's size is roughly" +
                " the <u>same</u> as the reference shape. <br><br>" +
                `<div><img src='${address}/img/sample_rect_1.png'></img><img src='${address}/img/sample_rect_2.png'></img></div>` +
                " <b>m</b> increases the size. <br>" +
                " <b>z</b> decreases the size. <br><br>" +
                `<div style='float: left; margin-bottom: 25px;'></div>` +
                "<br> <br> <br> When you are done adjusting the size, hit the <b>spacebar</b>." +
                "<br> Press any key to continue. </div>"
            };
        } else if (estimation_exp.condition_name === "rectangle_rotated_square_solid") {
            var instructions = {
                type: "html-keyboard-response",
                stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
                " and <b>z</b> keys to adjust the size of the modifiable shape<br> so that it's size is roughly" +
                " the <u>same</u> as the reference shape. <br><br>" +
                `<div><img src='${address}/img/sample_rect_1.png'></img><img src='${address}/img/sample_rect_2.png'></img></div>` +
                " <b>m</b> increases the size. <br>" +
                " <b>z</b> decreases the size. <br><br>" +
                `<div style='float: left; margin-bottom: 25px;'></div>` +
                "<br> <br> <br> When you are done adjusting the size, hit the <b>spacebar</b>." +
                "<br> Press any key to continue. </div>"
            };
        } else if (estimation_exp.condition_name === "rectangle_rotated_square_outline") {
            var instructions = {
                type: "html-keyboard-response",
                stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
                " and <b>z</b> keys to adjust the size of the modifiable shape<br> so that it's size is roughly" +
                " the <u>same</u> as the reference shape. <br><br>" +
                `<div><img src='${address}/img/sample_rect_1.png'></img><img src='${address}/img/sample_rect_2.png'></img></div>` +
                " <b>m</b> increases the size. <br>" +
                " <b>z</b> decreases the size. <br><br>" +
                `<div style='float: left; margin-bottom: 25px;'></div>` +
                "<br> <br> <br> When you are done adjusting the size, hit the <b>spacebar</b>." +
                "<br> Press any key to continue. </div>"
            };
        }
        if (estimation_exp.condition_name === "line_length"){
            var instructions = {
                type: "html-keyboard-response",
                stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
                " and <b>z</b> keys to adjust the size of the modifiable shape<br> so that it's size is roughly" +
                " the <u>same</u> as the reference shape. <br><br>" +
                `<div><img src='${address}/img/sample_line_1.png'></img><img src='${address}/img/sample_line_2.png'></img></div>` +
                " <b>m</b> increases the size. <br>" +
                " <b>z</b> decreases the size. <br><br>" +
                `<div style='float: left; margin-bottom: 25px;'></div>` +
                "<br> <br> <br> When you are done adjusting the size, hit the <b>spacebar</b>." +
                "<br> Press any key to continue. </div>"
            };
        }
        break;
    default:
        throw Error("unexpected condition name");
};
*/
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
                " and <b>z</b> keys to adjust the size of the modifiable shape<br> so that it's size is roughly" +
                " the <u>same</u> as the reference shape. <br><br>" +
                `<div><img src='${address}/img/sample_circle.png'></img><img src='${address}/img/sample_triangle.png'></img></div>` +
                " <b>m</b> increases the size. <br>" +
                " <b>z</b> decreases the size. <br><br>" +
                `<div style='float: left; margin-bottom: 25px;'></div>` +
                "<br> <br> <br> When you are done adjusting the size, hit the <b>spacebar</b>." +
                "<br> Press any key to continue. </div>"
};

var ready = {
    type: 'html-keyboard-response',
    stimulus: "<div align = 'center'> <font size = 20><p>Ready? We will first do some practice trials. <p>" + "<br> <br> <p><b>Press any key to begin.</b></p></font></div>",
    data: {type: 'instruction'}
};

var instruction_trials = {
    timeline: [instructions, ready]
};

timeline.push(instruction_trials);

// =========================================================
// PRACTICE TRIAL BLOCKS

// ---------------------------------------------------------
// PRACTICE TIMELINE

var practice_estimation = estimation_exp.generate_trial("practice");
var trial_loop_function = function (data) {
    console.log("====================loop_function=======================");
    let last_trial = jsPsych.data.get().last(1).values()[0];
    // console.log(JSON.stringify(last_trial));
    if (jsPsych.pluginAPI.convertKeyCharacterToKeyCode('q') === data.values()[0].key_press){
        estimation_exp.set_variables_to_experiment();
        console.log("Practice trials finished with key = q, set variables to experiment");
        return false;
    }
    else if (jsPsych.pluginAPI.convertKeyCharacterToKeyCode('space') === data.values()[0].key_press) {
        let num_adjustments = last_trial.adjustments.length;
        if (num_adjustments === 0) {
            window.alert("Please make adjustments before pressing space bar");
            // repeat previous round
            // if curr_round_num > 0, go back to previous round
            if (estimation_exp.curr_round_num !== 0) {
                estimation_exp.curr_round_num--;
            }
            // else go back to last round of previous condition
            else if (estimation_exp.curr_round_num) {
                estimation_exp.curr_condition_index--;
                estimation_exp.curr_round_num = estimation_exp.ROUNDS_PER_COND - 1;
            }
            return true;
        } else {
            if (estimation_exp.curr_condition_index === estimation_exp.curr_conditions_constants.length) {
                // all rounds of all sub_conditions has finished
                if (estimation_exp.is_practice === false) {
                    estimation_exp.export_trial_data();
                    console.log("Experiment finished");
                } else {
                    console.log("Practice finished");
                }
                estimation_exp.set_variables_to_experiment();
                return false;
            } else {
                console.log("Continue Experiment");
                return true;
            }
        }
    } else {
        console.log("error estimation_timeline.js 105")
    }
};
var practice = {
    timeline: [practice_estimation],
    loop_function: trial_loop_function,
    on_finish: function (data) {
    }
};
timeline.push(practice);

// ---------------------------------------------------------
// STOP BLOCK

var stop = {
    type: 'html-keyboard-response',
    stimulus: function() {
        return "<div align = 'center'> <font size = 6><p>This concludes the practice trials.<p>" +
            "<p><b>Any questions?</b></p></font></div>";
    },
    data: {type: 'instruction'},
    on_start: function(stop){
        // Reset background color to feedback
        document.body.style.backgroundColor = 'WHITE';
    }
};

var ready_experiment = {
    type: 'html-keyboard-response',
    stimulus: "<div align = 'center'> <font size = 20><p>Ready?<p>" + "<br><br><p><b>Press any key to begin.</b></p></font></div>",
    data: {type: 'instruction'}
};

var stop_trials = {
    timeline: [stop, ready_experiment]
};

timeline.push(stop_trials);


// =========================================================
// EXPERIMENT TRIAL BLOCKS

var trial = estimation_exp.generate_trial("test");
var experiment = {
    timeline: [trial],
    loop_function: trial_loop_function,
    on_start: function (data) {
        console.log("Should only be excuted before all experiments");
    }
};

timeline.push(experiment);

console.log("======================");

// =========================================================
// DATA DOWNLOADING 

var experiment_end = {
    type: 'html-keyboard-response',
    stimulus: '<div align = "center">' +
    '<p><font size = 10>You have completed the experiment!<p></font>' +
    '<br>' +
    'Trial and summary data files will now automatically download locally.' +
    '</div>' ,
    on_start: function(){
        estimation_exp.export_trial_data();
        // estimation_exp.export_summary_data();
        // Reset background color to feedback
        document.body.style.backgroundColor = 'WHITE';
    }
};
timeline.push(experiment_end);

// =========================================================
// START JSPSYCH

jsPsych.init({
    timeline: timeline,
    on_finish: function(){
        jsPsych.data.displayData();
    }
});