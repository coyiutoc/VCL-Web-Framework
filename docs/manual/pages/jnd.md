# >> JND

- **Task**: Discrimination
- **Method**: Forced choice with Staircase

## Specifications

**_**Note that all CAPPED variables are constants taken from the excel sheets/data file.**_**

- For a given subcondition, there are at minimum 24 trials and at maximum 52. Once a user has reached the 24th trial, we start computing for convergence by calculating an F-value to see if it is lower than the threshold. 
  - If the F-value is < `(1-CONVERGENCE_THRESHOLD)`, then the current subcondition ends, and proceeds to the next subcondition.
  - If the F-value is >= `(1-CONVERGENCE_THRESHOLD)`, then the trials continue.

### Practice Procedure

- We choose 4 subconditions randomly, and let the participant run through those. It otherwise follows the same procedure like the test detailed below.

### Test Procedure
- For a given subcondition's trial:
  - The BASE_CORRELATION for that subcondition will be used to calculate the distribution of one plot, but we need to calculate the adjusted correlation on a trial-by-trial basis.
    - _At the first presentation of a trial_, there is a need to compute the adjusted correlation. 
      - If converging from above, we calculate it by: `Math.min(MAX_CORRELATION, BASE_CORRELATION + INITIAL_DIFFERENCE)`
      - If converging from below, we calculate it by: `Math.max(MAX_CORRELATION, BASE_CORRELATION - INITIAL_DIFFERENCE)`
    - _If this is NOT the first presentation of a trial_, then use the **staircase method** to calculate the adjusted correlation. 
      - If converging from above:
        - If the **previous** trial was correct, adjusted correlation = `Math.max(INITIAL_DIFFERENCE, previous adjusted correlation - MAX_STEP_SIZE)`
        - If the **previous** trial was incorrect, adjusted correlation = `Math.min(MAX_CORRELATION, previous adjusted correlation + MAX_STEP_SIZE * INCORRECT_MULTIPLIER)`
      - If converging from below:
        - If the **previous** trial was correct, adjusted correlation = `Math.min(INITIAL_DIFFERENCE, previous adjusted correlation + MAX_STEP_SIZE)`
        - If the **previous** trial was incorrect, adjusted correlation = `Math.max(MIN_CORRELATION, previous adjusted correlation - MAX_STEP_SIZE * INCORRECT_MULTIPLIER)`
   - Generate a gaussian distribution using the BASE_CORRELATION and adjusted correlation.
   - Plot each distribution onto a separate plot, and randomize whether the right/left plots get the base or adjusted correlation. The manner in which the distribution is plotted varies depending on the type of plot. For example:
       - For a conventional strip, the x coordinate defines the horizontal translation while the y coordinate determines the height of the "strip".
       - For a conventional ring, the x coordinate defines the horizontal translation while the y coordinate determines the radius of the "ring".
   - A user can make keyboard inputs with the "z" or "m" keys. "z" corresponds to the left graph, "m" corresponds to the right graph.

## JsPsych Timeline
### General Timeline

```
- Display instructions
- Ready screen
- Display JND practice trials {
    For a given JND experiment, continue to display trials if: 
    - There are still more practice subconditions
  }  
- Stop screen
- Ready screen
- Display JND test trials {
    For a given JND experiment, continue to display trials if: 
    - There are still more test subconditions
  }  
- Stop screen with data download options
```

### Trial Logic

Within the trial object, all computations for distributions and constants are performed in the `on_start()` function. This means that prior to a trial executing, we perform ALL operations detailed in this function. This trial object can be found on line 120 in `scripts/experiments/jnd.js`. 

In general, this is what is executed:
```javascript
on_start: function(){

  // Retrieve the constants (i.e variables listed in the section below) for the given subcondition index i
  var constants = get_constants_for_subcondition(i); 
  
  // Calculate adjusted correlation
  // (Refer to next section for pseudocode of this function)
  var adjusted_correlation = calculate_adjusted_correlation(constants);

  // Save all relevant constants of this trial to the JsPsych data object
  handle_data_saving(constants); 

  var base_coordinates = generate_distribution(constants.BASE_CORRELATION, 
                                               constants.ERROR, 
                                               constants.NUM_POINTS, 
                                               constants.NUM_SD, 
                                               constants.MEAN,
                                               constants.SD);

  var adjusted_coordinates = generate_distribution(adjusted_correlation, 
                                               constants.ERROR, 
                                               constants.NUM_POINTS, 
                                               constants.NUM_SD, 
                                               constants.MEAN,
                                               constants.SD);

  // Randomize position of the base/adjusted correlations to be either left/right
  // and keep these positions constant for a given subcondition
  var result = randomize_position(base_coordinates, adjusted_coordinates);
  
  // Set these correlations to the global D3 variables used for plotting
  left_coordinates = result.left;
  right_coordinates = result.right; 

} 
```

### Adjusted Correlation
Below is the pseudocode for how the adjusted correlation value is generated for a given trial. 

```javascript

var MIN_CORRELATION = 0.0;
var MAX_CORRELATION = 1.0;
var INCORRECT_MULTIPLIER = 3;

function calculate_adjusted_correlation(constants){
  
   // If first trial, compute solely using constants:
   if (this_is_the_first_trial()){
      var adjusted_correlation = initialize_adjusted_statistic(constants.CONVERGE_FROM_ABOVE,
                                                               constants.BASE_CORRELATION, 
                                                               constants.INITIAL_DIFFERENCE);
   }
   // If not first trial, data from previous trial is needed:
   else{
     var last_JND_trial = get_data_from_last_trial();

     var adjusted_correlation = get_next_adjusted_statistic(last_JND_trial.correct,
                                                            constants.CONVERGE_FROM_ABOVE,
                                                            last_JND_trial.adjusted_correlation,
                                                            constants.BASE_CORRELATION,
                                                            constants.MAX_STEP_SIZE);
   }
   return adjusted_correlation;
}

function initialize_adjusted_statistic(converge_from_above, base_correlation, initial_difference){

  var adjusted_correlation;

  if (converge_from_above){
    adjusted_correlation = Math.min(MAX_CORRELATION, base_correlation + initial_difference); }
  else{
    adjusted_correlation = Math.max(MIN_CORRELATION, base_correlation - initial_difference);
  };

  return adjusted_correlation;
}

function get_next_adjusted_statistic(correct, converge_from_above, adjusted_quantity, base_correlation, max_step_size){

  var next_adjusted_statistic;

  var initial_difference = base_correlation;

  if (converge_from_above) {
    if (correct) {
      next_adjusted_statistic = Math.max(initial_difference, adjusted_quantity - max_step_size);
    } else {
      next_adjusted_statistic = Math.min(MAX_CORRELATION, adjusted_quantity + max_step_size
                                * INCORRECT_MULTIPLIER);
    }
  } else {
    if (correct) {
      next_adjusted_statistic = Math.min(initial_difference, adjusted_quantity + max_step_size);
    } else {
      next_adjusted_statistic = Math.max(MIN_CORRELATION, adjusted_quantity - max_step_size
                                * INCORRECT_MULTIPLIER);
    }
  }

  return next_adjusted_statistic;
}
```

### Constants
These are the constants extracted from the input excel sheets. The values of these constants differ for each sub condition.

- BASE_CORRELATION
- ERROR
- MAX_STEP_SIZE
- CONVERGE_FROM_ABOVE
- INITIAL_DIFFERENCE
- NUM_POINTS
- MEAN
- SD
- NUM_SD
