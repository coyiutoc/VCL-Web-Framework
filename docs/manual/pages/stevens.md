# >> Stevens

- **Task**: Discrimination
- **Method**: Estimation w/ Bisection

## Specifications

**_**Note that all CAPPED variables are constants taken from the excel sheets/data file.**_**

### Practice Procedure

- We choose the first **4** subconditions of the data constants (prior to any balancing being done on the subconditions). It otherwise follows the same procedure like the test detailed below.
- Exclusion criteria is calculated during the practice procedure. 2 values are calculated at the end of every subcondition, then stored to be displayed to the researcher who will then determine whether the participant should be excluded or not. 
  - We calculate standard deviation using the estimated correlations at the end of a trial (e.g. the value when the user hits space bar).
  - To calculate anchoring, summate the final estimated correlation values for when the trial started with the LOW_REF for the middle plot, and the values for when the trial started with the HIGH_REF for the middle plot. So there would be 2 values for when the user started on LOW_REF, and 2 values for when the user started on HIGH_REF. Then take the absolute difference between these 2 sums.
    - `anchoring_value = Math.abs(high_ref_trial_sum - low_ref_trial_sum)`
  - So essentially, there will be 4 sets of anchoring and standard deviation values. 
  - A subcondition is flagged if the anchoring value > 0.5 or if the standard deviation is > 0.2. 

### Test Procedure
- A subcondition's structure is "nested" in a sense, in which the user has **4** tries (TRIALS_PER_ROUND) to set the middle graph to be the midpoint between the two other plots. 
  - For example: let us say a subcondition is defined to have a high correlation (HIGH_REF) of 1.0 and a low correlation (LOW_REF) of 0. These are the R values for the two comparison plots. However, the starting value for the middle plot (the one that participants adjust) will alternate between starting off as the HIGH_REF or LOW_REF.
     - Trial 1: middle graph's starting correlation = LOW_REF
     - Trial 2: middle graph's starting correlation = HIGH_REF
     - Trial 3: middle graph's starting correlation = LOW_REF
     - Trial 4: middle graph's starting correlation = HIGH_REF
  - A trial is defined as a series of presentations using the HIGH_REF and LOW_REF values, in which the position of the HIGH_REF and LOW_REF distributions are constant (e.g. in Round 1: right graph = HIGH_REF, left graph = LOW_REF). The positioning of whether the left/right plots get which distribution is random **across** trials, but **consistent** within a trial. So Round 2 might have the right graph = LOW_REF and left graph = HIGH_REF instead.
     - Within a given trial, the user can use the "z" or "m" keys to decrease or increase respectively the correlation of the middle graph. Once the user believes that their middle correlation is a midpoint between the two straddling graphs, they hit _spacebar_ to lock in their answer. So this process happens 4 times, with (a) the middle graph alternating between taking the LOW or HIGH_REF, and (b) the straddling graphs randomizing in position in terms of whether the left or right get the HIGH and LOW_REF correlations.
   - To calculate the estimated correlation with respect to the key press (e.g. they want to increase or decrease the correlation), the following formulas apply:
     - `step_size = (HIGH_REF - LOW_REF) / MAX_STEP_INTERVAL`
     - If increasing the correlation, `estimated_correlation = Math.min(HIGH_REF, last trial's estimated correlation + (Math.random() * step_size)`
     - If decreasing the correlation, `estimated_correlation = Math.max(LOW_REF, last trial's estimated correlation - (Math.random() * step_size)`
   - Within a given trial, all the distributions will **refresh** (e.g. new distributions will be generated using the HIGH_REF, LOW_REF and estimated correlation values) with a refresh rate defined by REGEN_RATE. 
- Distributions used are gaussian. The manner in which the distribution is plotted varies depending on the type of plot. For example:
   - For a conventional strip, the x coordinate defines the horizontal translation while the y coordinate determines the height of the "strip".
   - For a conventional ring, the x coordinate defines the horizontal translation while the y coordinate determines the radius of the "ring".

## JsPsych Timeline
```
- Display instructions
- Ready screen
- Display Stevens practice trials {
    For a given Stevens experiment, continue to display trials if: 
    - The person has inputted less than the value of TRIALS_PER_ROUND for a given subcondition, or, 
    - There are still more subconditions to show, or
    - The person's performance has not passed the exclusion criteria
  }  
- Stop screen
- Ready screen
- Display Stevens test trials {
    For a given Stevens experiment, continue to display trials if: 
    - The person has inputted less than the value of TRIALS_PER_ROUND for a given subcondition, or, 
    - There are still more subconditions to show
  }  
- Stop screen with data download options
```

### Trial Logic

Within the trial object, all computations for distributions and constants are performed in the `on_start()` function. This means that prior to a trial executing, we perform ALL operations detailed in this function. This trial object can be found on line 123 in `scripts/experiments/stevens.js`. 

In general, this is what is executed:
```javascript
on_start: function(){

  // Retrieve the constants (i.e variables listed in the section below) for the given subcondition index i
  var constants = get_constants_for_subcondition(i); 
  
  // Save all relevant constants of this trial to the JsPsych data object
  handle_data_saving(constants); 

  // Update the estimated correlation
  // (Refer to next section for pseudocode of this function)
  var estimated_correlation = update_estimated_correlation(this.trial, constants, last_trial); 

  // Generate the gaussian distributions
  var high_coordinates = generate_distribution(constants.HIGH_REF, 
                                               constants.ERROR, 
                                               constants.NUM_POINTS, 
                                               constants.NUM_SD, 
                                               constants.MEAN,
                                               constants.SD);

  var high_coordinates = generate_distribution(constants.LOW_REF, 
                                               constants.ERROR, 
                                               constants.NUM_POINTS, 
                                               constants.NUM_SD, 
                                               constants.MEAN,
                                               constants.SD);

  var estimated_coordinates = generate_distribution(estimated_correlation, 
                                               constants.ERROR, 
                                               constants.NUM_POINTS, 
                                               constants.NUM_SD, 
                                               constants.MEAN,
                                               constants.SD);

  // Randomize position of the low/high correlations to be either left/right
  // and keep these positions constant for a given subcondition
  if (is_last_trial_of_subcondition(i)){
    var result = randomize_position(high_coordinates, low_coordinates);
  }
  
  // Set these correlations to the global D3 variables used for plotting
  left_coordinates = result.left;
  right_coordinates = result.right; 
  middle_coordinates = estimated_coordinates;

} 
```

### Estimated Correlation
Below is the pseudocode for how the estimated correlation value is generated for a given trial. 

```javascript
var MAX_STEP_INTERVAL = 10;

function update_estimated_correlation(trial, constants, last_trial){

  var estimated_correlation;

  // If this is the first trial, we need to initialize the middle correlation value
  if (this_is_the_first_trial()){
    estimated_correlation = Math.random() < 0.5 ? constants.LOW_REF : constants.HIGH_REF;
    trial.data.step_size = (constants.HIGH_REF - constants.LOW_REF) / MAX_STEP_INTERVAL;
  }

  // If there was a key press in the last value, we set this current trial's middle correlation value
  // to be based on that input
  else if (last_trial.key_press != null && last_trial.key_press.is_valid_value){
    if (last_trial.key_press == UP_VALUE){
      estimated_correlation = Math.min(constants.HIGH_REF, last_trial.estimated_correlation + (Math.random() * 
      last_trial.step_size));
    }
    else if (last_trial.key_press == DOWN_VALUE){
      estimated_correlation = Math.max(constants.LOW_REF, last_trial.estimated_correlation - (Math.random() * 
      last_trial.step_size));
    }
  }

  // If there was no input in the last trial
  else {
    estimated_correlation = last_trial.estimated_correlation;
  }

  return estimated_correlation;
}
```

### Constants
These are the constants extracted from the input excel sheets. The values of these constants differ for each sub condition.

- DISTRIBUTION_TYPE
- ROUND_TYPE
- TRIALS_PER_ROUND
- HIGH_REF
- LOW_REF
- ERROR
- NUM_POINTS
- POINT_SIZE
- POINT_COLOR
- BACKGROUND_COLOR
- TEXT_COLOR
- AXIS_COLOR
- REGEN_RATE
- MEAN
- SD
- NUM_SD