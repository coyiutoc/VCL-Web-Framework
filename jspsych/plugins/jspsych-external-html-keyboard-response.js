/** (June 2018, Caitlin Coyiuto)
This is a modification of the external-html plugin, in that it can now take several
keycodes as options to progress in the trial. A lot of the modified code
was modelled from html-keyboard-response plugin.  
*/

jsPsych.plugins['external-html-keyboard-response'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'external-html-keyboard-response',
    description: '',
    parameters: {
      url: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'URL',
        default: undefined,
        description: 'The url of the external html page'
      },
      check_fn: {
        type: jsPsych.plugins.parameterType.FUNCTION,
        pretty_name: 'Check function',
        default: function() { return true; },
        description: ''
      },
      force_refresh: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Force refresh',
        default: false,
        description: 'Refresh page.'
      },
      // if execute_Script == true, then all javascript code on the external page
      // will be executed in the plugin site within your jsPsych test
      execute_Script: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Execute scripts',
        default: true,
        description: 'If true, JS scripts on the external html file will be executed.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    var url = trial.url;
    if (trial.force_refresh) {
      url = trial.url + "?time=" + (new Date().getTime());
    }

    var response = {
      rt: null,
      key: null
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.url,
        "key_press": response.key,
        "choices": trial.choices
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      //display_element.querySelector('#jspsych-external-html-keyboard-response-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: false,
        allow_held_key: false
      });
    }

    // if trial_duration is defined, set timer
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    load(display_element, url, function() {
      // var t0 = (new Date()).getTime();
      // var finish = function() {
      //   if (trial.check_fn && !trial.check_fn(display_element)) { return };
      //   if (trial.cont_key) { document.removeEventListener('keydown', key_listener); }
      //   var trial_data = {
      //     rt: (new Date()).getTime() - t0,
      //     url: trial.url
      //   };
      //   display_element.innerHTML = '';
      //   jsPsych.finishTrial(trial_data);
      // };

      // by default, scripts on the external page are not executed with XMLHttpRequest().
      // To activate their content through DOM manipulation, we need to relocate all script tags
      if (trial.execute_Script) {
        for (const scriptElement of display_element.getElementsByTagName("script")) {
          const relocatedScript = document.createElement("script");
          relocatedScript.text = scriptElement.text;
          relocatedScript.type = "module";
          scriptElement.parentNode.replaceChild(relocatedScript, scriptElement);
        };
      }

      // if (trial.cont_btn) { display_element.querySelector('#'+trial.cont_btn).addEventListener('click', finish); }
      // if (trial.cont_key) {
      //   var key_listener = function(e) {
      //     if (e.which == trial.cont_key) finish();
      //   };
      //   display_element.addEventListener('keydown', key_listener);
      // }

    });
  };

  // helper to load via XMLHttpRequest
  function load(element, file, callback){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", file, true);
    xmlhttp.onload = function(){
        if(xmlhttp.status == 200 || xmlhttp.status == 0){ //Check if loaded
            element.innerHTML = xmlhttp.responseText;
            callback();
        }
    }
    xmlhttp.send();
  }

  return plugin;
})();
