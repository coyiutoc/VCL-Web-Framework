import JND from "/scripts/experiments/jnd/jnd.js";
export var jnd_exp = new JND(params);

var timeline = [];
var address = location.protocol + "//" + location.hostname + ":" + location.port; 

// =========================================================
// WELCOME TRIAL BLOCK

var welcome = {
  type: 'html-keyboard-response',
  stimulus: `<div align = "center">` + `<img src="${address}/img/VCL_lab_logo.png"></img><br><br>` +
            `<b>Base:</b> JND` + '<br>' + 
            `<b>Trial Type:</b> ${jnd_exp.trial_structure}` + '<br>' + 
            `<b>Graph Type:</b> ${jnd_exp.graph_type}` + '<br>' + 
            `<b>Condition:</b> ${jnd_exp.condition_name}` + 
            '<br><br><br><p><font size = 15>Press any key to begin.<p></font>' +
            '</div>',
  data: {type: 'instruction'}
};
timeline.push(welcome);

// =========================================================
// INSTRUCTION TRIAL BLOCKS

switch(jnd_exp.graph_type){
  case "scatter":

    if (jnd_exp.condition_name === "distractor_multi" || jnd_exp.condition_name === "distractor_rainbow") {
      var instructions = {
      type: "html-keyboard-response",
      stimulus: "<div align = 'center'> <p>In this experiment, two graphs will appear side-by-side." + 
          "<br> Indicate which graph is more correlated by pressing the Z or M key. </p><p>" +
          "<div style='height: 290px; width: 700px; display: block;'>"+
          `<div style='float: left;'><img src='${address}/img/sample_multi_distractor_1.png'></img>` +
          "<p class='small'><strong>Press the Z key</strong></p></div>" +
          `<div style='float: right;'><img src='${address}/img/sample_multi_distractor_2.png'></img>` +
          "<p class='small'><strong>Press the M key</strong></p></div>" +
          "</div>" + "<div> <br><p>Press any key to continue.</p> </div>" + 
          "</div>"          
      };
    }
    else if (jnd_exp.condition_group === "distractor") {

      let name_split_array = jnd_exp.condition_name.split("_");
      let target = "";
      let color = "";
      let axis = "";

      if (name_split_array.length === 4){
        target = name_split_array[1];
        color = name_split_array[2];
        axis = name_split_array[3];
      } else {
        target = name_split_array[1];
        color = name_split_array[3];
        axis = name_split_array[4];

      }

      var instructions = {
      type: "html-keyboard-response",
      stimulus: `<div align = 'center'>In this experiment, two graphs will appear side-by-side. 
                 <br> 
                 Indicate which graph has a higher correlation of the <b>target-colored</b> ${target}s by pressing the Z or M key. 
                 <br>
                 Ignore any squares with a <b>distractor</b> color.
                 <br>
                 <br>
                 <img src='${address}/img/distractors/target-distractors/${color}_${axis}.png'></img>
                 <br>
                <div style='height: 43vh; display: block;'>
                  <div style='float: left;'>
                    <img src='${address}/img/distractors/plots/sample_distractor_${color}_1.png'></img>
                    <p class='small'><strong>Press the Z key</strong></p>
                  </div>
                <div style='float: right;'>
                  <img src='${address}/img/distractors/plots/sample_distractor_${color}_2.png'></img>
                  <p class='small'><strong>Press the M key</strong></p></div>
                </div>
                <div> 
                  <br>
                  <p>Press any key to continue.</p> 
                </div>
                `        
      };
    } else {
      var instructions = {
      type: "html-keyboard-response",
      stimulus: "<div align = 'center'> <p>In this experiment, two graphs will appear side-by-side." + 
          "<br> Indicate which graph is more correlated by pressing the Z or M key. </p><p>" +
          "<div style='height: 290px; width: 700px; display: block;'>"+
          `<div style='float: left;'><img src='${address}/img/sample_scatter_1.png'></img>` +
          "<p class='small'><strong>Press the Z key</strong></p></div>" +
          `<div style='float: right;'><img src='${address}/img/sample_scatter_2.png'></img>` +
          "<p class='small'><strong>Press the M key</strong></p></div>" +
          "</div>" + "<div> <br><p>Press any key to continue.</p> </div>" + 
          "</div>"          
      };
    }
    break;

  case "strip":
    if (jnd_exp.condition_name === "line_length_strip") {
      var instructions = {
      type: "html-keyboard-response",
      stimulus: "<div align = 'center'> <p>In this experiment, two graphs will appear one on top of the other." + 
          "<br> Indicate which graph is more correlated by pressing the Z or M key. </p><p>" +
          "<strong>Press the Z key if the graph <u>above</u> is more correlated.</strong>" +
          `<div style='float: center; display: block;'><img src='${address}/img/sample_line_length_strip.png'></img></div>` +
          "<strong>Press the M key if the graph <u>below</u> is more correlated.</strong>"
      };
    } else {
      var instructions = {
      type: "html-keyboard-response",
      stimulus: "<div align = 'center'> <p>In this experiment, two graphs will appear one on top of the other." + 
          "<br> Indicate which graph is more correlated by pressing the Z or M key. </p><p>" +
          "<strong>Press the Z key if the graph <u>above</u> is more correlated.</strong>" +
          `<div style='float: center; display: block;'><img src='${address}/img/sample_jnd_strip.png'></img></div>` +
          "<strong>Press the M key if the graph <u>below</u> is more correlated.</strong>"
      };
    }
    break;

  case "ring":
    var instructions = {
    type: "html-keyboard-response",
    stimulus: "<div align = 'center'> <p>In this experiment, two graphs will appear one on top of the other." + 
        "<br> Indicate which graph is more correlated by pressing the Z or M key. </p><p>" +
        "<strong>Press the Z key if the graph <u>above</u> is more correlated.</strong>" +
        `<div style='float: center; display: block;'><img src='${address}/img/sample_jnd_ring.png'></img></div>` +
        "<strong>Press the M key if the graph <u>below</u> is more correlated.</strong>"
    };
    break;  
}

var ready = {
  type: 'html-keyboard-response',
  stimulus: "<div align = 'center'> <font size = 20><p>Ready? We will first do some practice trials. <p>" + "<br><br><p><b>Press any key to begin.</b></p></font></div>",
  data: {type: 'instruction'}
}

var instruction_trials = {
  timeline: [instructions, ready]
};

timeline.push(instruction_trials);

// =========================================================
// PRACTICE TRIAL BLOCKS

// ---------------------------------------------------------
// FEEDBACK

var feedback = {
  type: 'html-keyboard-response',
  // choices: jsPsych.NO_KEYS, //No responses will be accepted as a valid response.
  // trial_duration: 500,
  data: {type: 'feedback'},
  stimulus: function(){

    document.body.style.backgroundColor = jnd_exp.trial_data.feedback_background_color;

    var last_trial = JSON.parse(jsPsych.data.getLastTrialData().json());
    var last_trial_correct = last_trial[0]["correct"];

    // For debugging purposes:
    if (last_trial_correct == -1){
      return '<p>' + 
             '<font style="font-size:50px; color:blue">Exiting from experiment.<p></font>'
    }

    else if (last_trial_correct){
      return '<p><i class="fa fa-check-circle" style="font-size:50px; color:green; margin-right: 10px;"></i>' + 
             '<font style="font-size:50px; color:green">Correct!<p></font>'
    }
    else{
      return '<p><i class="fa fa-close" style="font-size:50px; color:red; margin-right: 10px;"></i>' + 
             '<font style="font-size:50px; color:red;"">Incorrect!<p></font>'
    }
  }
};

// ---------------------------------------------------------
// PRACTICE TIMELINE

var practice_jnd = jnd_exp.generate_trial("practice");

var practice = {
  timeline: [practice_jnd, feedback], // We use same feedback block as that used in practice 
  loop_function: function(data){ // Return true if timeline should continue
                                 // Return false if timeline should end

    // Flag is always true for each trial since we display one trial for 
    // each condition on the practice                              
    jnd_exp.first_trial_of_sub_condition = true;

    // For debugging, if you want to exit out of experiment, press q:
    if (jsPsych.pluginAPI.convertKeyCharacterToKeyCode('q') == data.values()[0].key_press){
      // Turn flag on 
      jnd_exp.first_trial_of_sub_condition = true;
      return false;
    }

    // If there are still more practice conditions, increment current index
    if (jnd_exp.current_practice_condition_index < (jnd_exp.practice_conditions_constants.length-1)){
      jnd_exp.current_practice_condition_index++; 
      console.log("!!!!!!!!!! Moved to new practice condition at index " 
                  + jnd_exp.current_practice_condition_index);
      return true; 
    }
    // Else end experiment
    else{
      // Turn flag on 
      jnd_exp.first_trial_of_sub_condition = true;
      return false;
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
    document.body.style.backgroundColor = jnd_exp.trial_data.feedback_background_color;
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

var trial = jnd_exp.generate_trial("test");

var experiment = {
  timeline: [trial, feedback], // We use same feedback block as that used in practice 
  loop_function: function(data){ // Return true if timeline should continue
                                 // Return false if timeline should end

    // For debugging, if you want to exit out of experiment, press q:
    if (jsPsych.pluginAPI.convertKeyCharacterToKeyCode('q') == data.values()[0].key_press){
      return false;
    }

    // If subcondition should end:
    if(jnd_exp.end_sub_condition()){
      jnd_exp.first_trial_of_sub_condition = true;
      // If there are still more subconditions, increment current index
      if (jnd_exp.current_sub_condition_index < (jnd_exp.sub_conditions_constants.length-1)){
        jnd_exp.current_sub_condition_index++; 
        console.log("!!!!!!!!!! Moved to new sub condition at index " 
                    + jnd_exp.current_sub_condition_index);
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
  },
  on_finish: function(data){
    jnd_exp.trial_data = data; 
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

    jnd_exp.export_trial_data();
    jnd_exp.export_summary_data();
    
    // Reset background color to feedback
    document.body.style.backgroundColor = jnd_exp.trial_data.feedback_background_color;
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