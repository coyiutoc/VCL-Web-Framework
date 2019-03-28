import Stevens from "/scripts/experiments/stevens/stevens.js";
export var stevens_exp = new Stevens(params);

var timeline = [];
var address = location.protocol + "//" + location.hostname + ":" + location.port; 

// =========================================================
// WELCOME TRIAL BLOCK

var welcome = {
  type: 'html-keyboard-response',
  stimulus: `<div align = "center">` + `<img src="${address}/img/VCL_lab_logo.png"></img><br><br>` +
            `<b>Base:</b> stevens` + '<br>' + 
            `<b>Trial Type:</b> ${stevens_exp.trial_structure}` + '<br>' + 
            `<b>Graph Type:</b> ${stevens_exp.graph_type}` + '<br>' + 
            `<b>Condition:</b> ${stevens_exp.condition_name}` + 
            '<br><br><br><p><font size = 15>Press any key to begin.<p></font>' +
            '</div>',
  data: {type: 'instruction'}
};
timeline.push(welcome);

// =========================================================
// INSTRUCTION TRIAL BLOCKS

switch(stevens_exp.graph_type){
  case "scatter":

    if (stevens_exp.condition_group === "distractor" && stevens_exp.condition_name.split("_")[2] === "shades"){
      var instructions = {
        type: "html-keyboard-response",
        stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
            " and <b>z</b> keys to adjust the center graph <br> so that its correlation is roughly" +
            " the <u>midpoint</u> between the left and right graphs. <br><br>" +
            " <b>m</b> increases the correlation. <br>" +
            " <b>z</b> decreases the correlation. <br><br>" + 
            `<div style='float: left; margin-bottom: 25px;'><img src='${address}/img/stevens/distractor_shades.png'></img></div>` +
            "<br> <br> <br> When you are done adjusting the center graph, hit the <b>spacebar</b>." + 
            "<br> Press any key to continue. </div>"     
      }
    }
    else if (stevens_exp.condition_group === "distractor") {
      var instructions = {
        type: "html-keyboard-response",
        stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
            " and <b>z</b> keys to adjust the center graph <br> so that its correlation is roughly" +
            " the <u>midpoint</u> between the left and right graphs. <br><br>" +
            " <b>m</b> increases the correlation. <br>" +
            " <b>z</b> decreases the correlation. <br><br>" + 
            `<div style='float: left; margin-bottom: 25px;'><img src='${address}/img/stevens/distractor_square.png'></img></div>` +
            "<br> <br> <br> When you are done adjusting the center graph, hit the <b>spacebar</b>." + 
            "<br> Press any key to continue. </div>"     
      }
    } else {
      var instructions = {
        type: "html-keyboard-response",
        stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
            " and <b>z</b> keys to adjust the center graph <br> so that its correlation is roughly" +
            " the <u>midpoint</u> between the left and right graphs. <br><br>" +
            " <b>m</b> increases the correlation. <br>" +
            " <b>z</b> decreases the correlation. <br><br>" + 
            `<div style='float: left; margin-bottom: 25px;'><img src='${address}/img/stevens/scatter.png'></img></div>` +
            "<br> <br> <br> When you are done adjusting the center graph, hit the <b>spacebar</b>." + 
            "<br> Press any key to continue. </div>"     
       } 
    }    
    break;
  case "strip":
    if (stevens_exp.condition_name === "line_length_strip") {
      var instructions = {
        type: "html-keyboard-response",
        stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
            " and <b>z</b> keys to adjust the center graph <br> so that its correlation is roughly" +
            " the <u>midpoint</u> between the left and right graphs. <br><br>" +
            " <b>m</b> increases the correlation. <br>" +
            " <b>z</b> decreases the correlation. <br><br>" + 
            `<div style='float: left; margin-bottom: 25px;'><img src='${address}/img/stevens/line_length_strip.png'></img></div>` +
            "<br> <br> <br> When you are done adjusting the center graph, hit the <b>spacebar</b>." + 
            "<br> Press any key to continue. </div>"      
      }
    } else {
      var instructions = {
        type: "html-keyboard-response",
        stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
            " and <b>z</b> keys to adjust the center graph <br> so that its correlation is roughly" +
            " the <u>midpoint</u> between the left and right graphs. <br><br>" +
            " <b>m</b> increases the correlation. <br>" +
            " <b>z</b> decreases the correlation. <br><br>" + 
            `<div style='float: left; margin-bottom: 25px;'><img src='${address}/img/stevens/strip.png'></img></div>` +
            "<br> <br> <br> When you are done adjusting the center graph, hit the <b>spacebar</b>." + 
            "<br> Press any key to continue. </div>"      
      }
    }
    break;
  case "ring":  
    var instructions = {
      type: "html-keyboard-response",
      stimulus: "<div align = 'center'> <p>In this experiment, you will be using the <b>m</b>" +
          " and <b>z</b> keys to adjust the center graph <br> so that its correlation is roughly" +
          " the <u>midpoint</u> between the left and right graphs. <br><br>" +
          " <b>m</b> increases the correlation. <br>" +
          " <b>z</b> decreases the correlation. <br><br>" + 
          `<div style='float: left; margin-bottom: 25px;'><img src='${address}/img/stevens/ring_strip_size.png'></img></div>` +
          "<br> <br> <br> When you are done adjusting the center graph, hit the <b>spacebar</b>." + 
          "<br> Press any key to continue. </div>"      
    }
    break;
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

var practice_trial = stevens_exp.generate_trial("practice");

var practice = {
  timeline: [practice_trial],
  loop_function: function(data){ // Return true if timeline should continue
                                 // Return false if timeline should end

    // For debugging, if you want to exit out of experiment, press q:
    if (jsPsych.pluginAPI.convertKeyCharacterToKeyCode('q') == data.values()[0].key_press){
      stevens_exp.end_practice_experiment();
      stevens_exp.round_end = false;
      console.log("!!!!!!!!!! Practice trials finished ");
      return false;
    }

    // If spacebar is pressed and we can end the round (there was at least 1 input)
    if (32 == data.values()[0].key_press && stevens_exp.end_round()){

      // Save the midpoint for exclusion criteria calculations later
      let curr_index = stevens_exp.current_sub_condition_index;    
      stevens_exp.practice_trial_data[curr_index].push(stevens_exp.trial_data);

      // If there are still more rounds for this sub condition
      if (!stevens_exp.end_sub_condition()){
        console.log("!!!!!!!! GO TO NEXT ROUND ");
        stevens_exp.round_end = true;
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
        console.log("!!!!!!!!!! Practice trials finished ");
        stevens_exp.end_practice_experiment();
        stevens_exp.round_end = false;

        return false;
      }
    } 
    // Else continue w/ current subcondition:
    else {
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
    let results = stevens_exp.calculate_exclusion_criteria();

    return "<div>" + results + "</div>" + 
           "<div align = 'center'> <font size = 6><p>This concludes the practice trials.<p>" + 
           "<p><b>Any questions?</b></p></font></div>";
  },
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
        stevens_exp.round_end = true;
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
            'Trial and summary data files will now automatically download locally.' + 
            '</div>' ,
  on_start: function(){

    stevens_exp.export_trial_data();
    stevens_exp.export_summary_data();

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