// =========================================================
// CONSTANTS

const MATHJS_URL = "https://unpkg.com/mathjs@4.4.2/dist/math.min.js";

var timeline = [];
const localhost = "http://localhost:8080";
var round_end = false; // Flag to check when a round for a given subcondition has ended
var practice_end = false; // Flag to check when practice trials have ended

// Variables used to generate D3 stevens_trial_display.html:
var left_coordinates;
var right_coordinates;
var middle_coordinates;
var distribution_size;
var trial_data; 

// =========================================================
// INSTANTIATE STEVENS EXPERIMENT OBJECT

const STEVENS_EXCEL = get_data_subset("stevens", stevens_exp.range, stevens_exp.condition_name);

stevens_exp.prepare_experiment("latin_square", STEVENS_EXCEL);

// =========================================================
// WELCOME TRIAL BLOCK

var welcome = {
  type: 'html-keyboard-response',
  stimulus: '<div align = "center">' + '<img src="../img/VCL_lab_logo.png"></img> <br>' +
            'This is a <b>Proof of Concept</b> for a <b>Foundational Stevens Experiment</b>.' + 
            '<br><br><p><font size = 15>Press any key to begin.<p></font>' +
            '</div>',
  data: {type: 'instruction'}
};
timeline.push(welcome);

// =========================================================
// INSTRUCTION TRIAL BLOCKS

var instructions = {
  type: "html-keyboard-response",
  stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
      " and <b>z</b> keys to adjust the center graph <br> so that its correlation is roughly" +
      " the <u>midpoint</u> between the left and right graphs. <br><br>" +
      " <b>m</b> increases the correlation. <br>" +
      " <b>z</b> decreases the correlation. <br><br>" + 
      "<div style='float: left; margin-bottom: 25px;'><img src='../img/sample_stevens.png'></img></div>" +
      "<br> <br> <br> When you are done adjusting the center graph, hit the <b>spacebar</b>." + 
      "<br> Press any key to continue. </div>"          
};

var ready = {
  type: 'html-keyboard-response',
  stimulus: "<div align = 'center'> <font size = 20><p>Ready? We will first do some practice trials. <p>" + "<br> <br> <p><b>Press any key to begin.</b></p></font></div>",
  data: {type: 'instruction'}
}

var instruction_trials = {
  timeline: [instructions, ready]
};

timeline.push(instruction_trials);

// =========================================================
// PRACTICE TRIAL BLOCKS

// ---------------------------------------------------------
// PRACTICE TIMELINE

var practice_stevens = stevens_exp.generate_trial("practice");

var practice = {
  timeline: [practice_stevens],
  loop_function: function(data){ // Return true if timeline should continue
                                 // Return false if timeline should end

    // For debugging, if you want to exit out of experiment, press q:
    if (81 == data.values()[0].key_press){
      practice_end = true;
      round_end = false;
      console.log("!!!!!!!!!! Practice trials finished ");
      return false;
    }

    // If spacebar is pressed and we can end the round (there was at least 1 input)
    if (32 == data.values()[0].key_press && stevens_exp.end_round()){
      
      // !!!!!!!! TODO: 
      // This hack throws off the trial variables like input_count_array and trial_num.

      // If there are still more rounds for this sub condition
      // if (!stevens_exp.end_sub_condition()){
      //   console.log("!!!!!!!! GO TO NEXT ROUND ");
      //   round_end = true;
      //   return true;
      // }

      if (stevens_exp.current_sub_condition_index < (stevens_exp.sub_conditions_constants.length-1))
      { 
        stevens_exp.current_sub_condition_index++;
        round_end = true; 
        console.log("!!!!!!!!!! Moved to new sub condition at index " 
                     + stevens_exp.current_sub_condition_index);
        return true; 
      }
      // Else end experiment
      else{
        console.log("!!!!!!!!!! Practice trials finished ");
        practice_end = true;
        round_end = false;
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
  stimulus: "<div align = 'center'> <font size = 20><p>This concludes the practice trials.<p>" + "<br><br><p><b>Any questions?</b></p></font></div>",
  data: {type: 'instruction'},
  on_start: function(stop){
    // Reset background color to feedback
    document.body.style.backgroundColor = 'WHITE';
  }
}

var ready_experiment = {
  type: 'html-keyboard-response',
  stimulus: "<div align = 'center'> <font size = 20><p>Ready?<p>" + "<br><br><p><b>Press any key to begin.</b></p></font></div>",
  data: {type: 'instruction'}
}

var stop_trials = {
  timeline: [stop, ready_experiment]
};

timeline.push(stop_trials);


// =========================================================
// EXPERIMENT TRIAL BLOCKS

var trial = stevens_exp.generate_trial("test");

var experiment = {
  timeline: [trial],
  loop_function: function(data){ // Return true if timeline should continue
                                 // Return false if timeline should end

    // For debugging, if you want to exit out of experiment, press q:
    if (jsPsych.pluginAPI.convertKeyCharacterToKeyCode('q') == data.values()[0].key_press){
      return false;
    }

    // If spacebar is pressed and we can end the round (there was at least 1 input)
    if (32 == data.values()[0].key_press && stevens_exp.end_round()){

      // If there are still more rounds for this sub condition
      if (!stevens_exp.end_sub_condition()){
        console.log("!!!!!!!! GO TO NEXT ROUND ");
        round_end = true;
        return true;
      }
      // If there are still more subconditions, increment current index
      else if (stevens_exp.current_sub_condition_index < (stevens_exp.sub_conditions_constants.length-1)){ 
        stevens_exp.current_sub_condition_index++; 
        console.log("!!!!!!!!!! Moved to new sub condition at index " 
                     + stevens_exp.current_sub_condition_index);
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
            '<a href="#" onclick="stevens_exp.export_trial_data();" class="btn btn-info btn-block" role="button" style="width: 300px; font-size: 20px">Download Trial Data</a>' +
            '<a href="#" onclick="stevens_exp.export_summary_data();" class="btn btn-info btn-block" role="button" style="width: 300px; font-size: 20px">Download Summary Data</a>' +
            '</div>',
  on_start: function(stop){
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