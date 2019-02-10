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
    `<b>Trial Type:</b> ${estimation_exp.range}` + '<br>' +
    `<b>Graph Type:</b> ${estimation_exp.graph_type}` + '<br>' +
    `<b>Condition:</b> ${estimation_exp.condition_name}` +
    '<br><br><br><p><font size = 15>Press any key to begin.<p></font>' +
    '</div>',
    data: {type: 'instruction'}
};
timeline.push(welcome);

// =========================================================
// INSTRUCTION TRIAL BLOCKS

switch(estimation_exp.graph_type){
    case "shapes":
        if (estimation_exp.condition_name === "shape_estimation") {
            var instructions = {
                type: "html-keyboard-response",
                stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
                " and <b>z</b> keys to adjust the size of the shape on the right <br> so that it's size is roughly" +
                " the <u>same</u> as the shape on the left. <br><br>" +
                `<div><img src='${address}/img/sample_circle.png'></img><img src='${address}/img/sample_triangle.png'></img></div>` +
                " <b>m</b> increases the size. <br>" +
                " <b>z</b> decreases the size. <br><br>" +
                `<div style='float: left; margin-bottom: 25px;'></div>` +
                "<br> <br> <br> When you are done adjusting the size, hit the <b>spacebar</b>." +
                "<br> Press any key to continue. </div>"
            };
        }
        break;
}

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

var practice = {
    timeline: [practice_estimation],
    loop_function: function(data){
        // Return true if timeline should continue false if timeline should end

        // For debugging, if you want to exit out of experiment, press q:
        if (jsPsych.pluginAPI.convertKeyCharacterToKeyCode('q') === data.values()[0].key_press){
            estimation_exp.practice_end = true;
            estimation_exp.round_end = false;
            console.log("!!!!!!!!!! Practice trials finished ");
            return false;
        }

        let last_trial = jsPsych.data.get().last(1).values()[0];
        let curr_num_adjustments = last_trial.num_adjustments;

        // If user has 4 inputs, end trial OR
        // If spacebar is pressed and we can end the round (there was at least 1 input)
        if (jsPsych.pluginAPI.convertKeyCharacterToKeyCode('space') === data.values()[0].key_press
                && estimation_exp.end_round("practice")){

            if (estimation_exp.current_sub_condition_index < (estimation_exp.sub_conditions_constants.length-1))
            {
                estimation_exp.current_sub_condition_index++;
                estimation_exp.round_end = true;
                console.log("!!!!!!!!!! Moved to new sub condition at index "
                    + estimation_exp.current_sub_condition_index);
                return true;
            }
            // Else end experiment
            else{
                console.log("!!!!!!!!!! Practice trials finished ");
                estimation_exp.practice_end = true;
                estimation_exp.round_end = false;
                return false;
            }
        }
        // Else continue w/ current subcondition:
        else{
            return true;
        }
    }
};

timeline.push(practice);

// ---------------------------------------------------------
// STOP BLOCK

var stop = {
    type: 'html-keyboard-response',
    stimulus: function() {
        let results = estimation_exp.calculate_exclusion_criteria();

        return "<div>" + results + "</div>" +
            "<div align = 'center'> <font size = 6><p>This concludes the practice trials.<p>" +
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
    loop_function: function(data) { // Return true if timeline should continue
        // Return false if timeline should end

        // For debugging, if you want to exit out of experiment, press q:
        if (jsPsych.pluginAPI.convertKeyCharacterToKeyCode('q') === data.values()[0].key_press){
            return false;
        }

        // If spacebar is pressed and we can end the round (there was at least 1 input)
        if (32 === data.values()[0].key_press && estimation_exp.end_round("test")){

            // If there are still more rounds for this sub condition
            if (!estimation_exp.end_sub_condition()){
                console.log("!!!!!!!! GO TO NEXT ROUND ");
                estimation_exp.round_end = true;
                return true;
            }
            // If there are still more subconditions, increment current index
            else if (estimation_exp.current_sub_condition_index < (estimation_exp.sub_conditions_constants.length-1)){
                estimation_exp.current_sub_condition_index++;
                console.log("!!!!!!!!!! Moved to new sub condition at index "
                    + estimation_exp.current_sub_condition_index);
                return true;
            }
            // Else end experiment
            else{
                return false;
            }
        }
        // Else continue w/ current subcondition:
        else {
            return true;
        }

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
        estimation_exp.export_summary_data();
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