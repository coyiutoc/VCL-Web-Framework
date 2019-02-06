import JND_Radius from "/scripts/experiments/jnd_radius/jnd_radius.js";
export var jnd_radius_exp = new JND_Radius(params);

var timeline = [];
var address = location.protocol + "//" + location.hostname + ":" + location.port; 

// Firefox check for formatting
if (typeof InstallTrigger !== 'undefined') {
  var isFirefox = true;
} else {
  var isFirefox = false;
}

// =========================================================
// WELCOME TRIAL BLOCK

let shape_names = jnd_radius_exp.condition_name.split("_");

var welcome = {
  type: 'html-keyboard-response',
  stimulus: `<div align = "center" style="margin-top: ${isFirefox ? "25vh" : "0"}">` + `<img src="${address}/img/VCL_lab_logo.png"></img><br><br>` +
            `<b>Base:</b> ${jnd_radius_exp.constructor.name}` + '<br>' + 
            `<b>Trial Type:</b> ${jnd_radius_exp.range}` + '<br>' + 
            `<b>Condition:</b> ${shape_names[0]}, ${shape_names[1]}` + 
            '<br><br><br><p><font size = 15>Press any key to begin.<p></font>' +
            '</div>',
  data: {type: 'instruction'}
};
timeline.push(welcome);

// =========================================================
// INSTRUCTION TRIAL BLOCKS

var instructions = {
  type: "html-keyboard-response",
  stimulus:       
      `
      <div align = 'center' style = 'margin-top: ${isFirefox ? "35vh" : "0"}; height: 35vh; display: block'>
        <p>In this experiment, two shapes will appear side-by-side.
        <br>
        Indicate which graph is has a <b>greater area</b> by pressing the Z or M key. </p><p>
        <div style='height: auto;'>
          <div style='float: left;'>
            <img src="${address}/img/sample_${shape_names[0]}.png"></img> 
            <p class='small'><strong>Press the Z key</strong></p>
          </div>

          <div style='float: right;'>
            <img src="${address}/img/sample_${shape_names[1]}.png"></img>
            <p class='small'><strong>Press the M key</strong></p>
          </div>
        </div>
      </div>  
      <br>
      <div style='text-align: center; display: block'><br><br><br><p>Press any key to continue.</div>
      ` 
};

timeline.push(instructions);

// =========================================================
// FEEDBACK

var feedback = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS, //No responses will be accepted as a valid response.
  trial_duration: 500,
  data: {type: 'feedback'},
  stimulus: function(){

    document.body.style.backgroundColor = jnd_radius_exp.trial_data.feedback_background_color;

    var last_trial = JSON.parse(jsPsych.data.getLastTrialData().json());
    var last_trial_correct = last_trial[0]["correct"];

    // For debugging purposes:
    if (last_trial_correct == -1){
      return '<p>' + 
             `<div style = "margin-top: ${isFirefox ? "45vh" : "0"};"><font style="font-size:50px; color:blue">Exiting from experiment.<p></font></div>`
    }

    else if (last_trial_correct){
      return `<p><div style = "margin-top: ${isFirefox ? "45vh" : "0"};"><i class="fa fa-check-circle" style="font-size:50px; color:green; margin-right: 10px;"></i>` + 
             '<font style="font-size:50px; color:green">Correct!<p></font></div>'
    }
    else{
      return `<p><div style = "margin-top: ${isFirefox ? "45vh" : "0"};"><i class="fa fa-close" style="font-size:50px; color:red; margin-right: 10px;"></i>` + 
             '<font style="font-size:50px; color:red;"">Incorrect!<p></font></div>'
    }
  }
};

// =========================================================
// EXPERIMENT TRIAL BLOCKS

var trial = jnd_radius_exp.generate_trial("test");

var experiment = {
  timeline: [trial, feedback], // We use same feedback block as that used in practice 
  loop_function: function(data){ // Return true if timeline should continue
                                 // Return false if timeline should end

    // For debugging, if you want to exit out of experiment, press q:
    if (jsPsych.pluginAPI.convertKeyCharacterToKeyCode('q') == data.values()[0].key_press){
      return false;
    }

    // If subcondition should end:
    if(jnd_radius_exp.end_sub_condition()){
      jnd_radius_exp.first_trial_of_sub_condition = true;
      // If there are still more subconditions, increment current index
      if (jnd_radius_exp.current_sub_condition_index < (jnd_radius_exp.sub_conditions_constants.length-1)){
        jnd_radius_exp.current_sub_condition_index++; 
        console.log("!!!!!!!!!! Moved to new sub condition at index " 
                    + jnd_radius_exp.current_sub_condition_index);
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
    jnd_radius_exp.trial_data = data; 
  }
};

timeline.push(experiment);

console.log("======================");

// =========================================================
// DATA DOWNLOADING 

var experiment_end = {
  type: 'html-keyboard-response',
  stimulus: `<div align = "center" style = "margin-top: ${isFirefox ? "45vh" : "0"};">` + 
            '<p><font size = 10>You have completed the experiment!<p></font>' +
            '<br>' +
            'Trial and summary data files will now automatically download locally.' + 
            '</div>' ,
  on_start: function(){

    jnd_radius_exp.export_trial_data();
    jnd_radius_exp.export_summary_data();

    // Reset background color to feedback
    document.body.style.backgroundColor = jnd_radius_exp.trial_data.feedback_background_color;
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
