const INCORRECT_MULTIPLIER = 3;
    
// Method to obtain the adjusted correlation on the first trial.
function initializeAdjustedStatistic(converge_from_above, initial_difference, base_correlation, max_correlation, min_correlation){

	var adjustedCorrelation;

    if (converge_from_above){
      adjustedCorrelation = Math.min(max_correlation, base_correlation + initial_difference); }
    else{
      adjustedCorrelation = Math.max(min_correlation, base_correlation - initial_difference);
    };

    return adjustedCorrelation; 
}

// Main method to obtain adjusted correlation.
function getNextAdjustedStatistic(correct, convergeFromAbove, adjustedQuantity, minCorrelation, maxCorrelation, baseCorrelation, initialDiff, maxStepSize) {

	var nextAdjustedStatistic;

	if (convergeFromAbove) {
		if (correct) {
			nextAdjustedStatistic = Math.max(initialDiff, adjustedQuantity - maxStepSize);
		} else {
			nextAdjustedStatistic = Math.min(maxCorrelation, adjustedQuantity + maxStepSize
											 * INCORRECT_MULTIPLIER);
		}
	} else {
		if (correct) {
			nextAdjustedStatistic = Math.min(initialDiff, adjustedQuantity + maxStepSize);
		} else {
			nextAdjustedStatistic = Math.max(minCorrelation, adjustedQuantity - maxStepSize
											 * INCORRECT_MULTIPLIER);
		}
	}

	return nextAdjustedStatistic;
}