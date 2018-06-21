const JND_EXCEL = [
	{baseCorrelation: 0.3, error: 0.0001, maxStepSize: 0.01, convergeFromAbove: true, initialDifference: 0.1, numPoints: 100, mean: 0.5, SD: 0.2, numSD: 2.5},
	{baseCorrelation: 0.6, error: 0.0001, maxStepSize: 0.01, convergeFromAbove: true, initialDifference: 0.1, numPoints: 100, mean: 0.5, SD: 0.2, numSD: 2.5},
	{baseCorrelation: 0.9, error: 0.0001, maxStepSize: 0.01, convergeFromAbove: true, initialDifference: 0.1, numPoints: 100, mean: 0.5, SD: 0.2, numSD: 2.5}
];

// TO DO: use node require(latin-square) to do this. 
// For now, hard coding...
function selectFromLatinSquare(){

	// Generate latin square matrix:
	var matrix = generateLatinSquare(JND_EXCEL.length);

	// Randomly choose a row: 
	var row = Math.floor(Math.random() * (JND_EXCEL.length - 1));

	// Get order: 
	var order = matrix[row];

}

// Generates a latin square of n dimensions
function generateLatinSquare(n){
		var matrix = [];

    // A variable to control the 
    // rotation point.
    var k = n+1;
 
    // Loop to print rows
    for (i = 1; i <= n; i++)
    {

        // This loops runs only after
        // first iteration of outer 
        // loop. It prints
        // numbers from n to k
        var temp = k;
        var row = [];
        while (temp <= n)
        {
        		row.push(temp);
            temp++;
        }
 
        // This loop prints numbers from
        // 1 to k-1.
        for (j = 1; j < k; j++){
        	row.push(j);
 				}

        k--;
        matrix.push(row);
    }
    //console.log(matrix);
    return matrix;
} 

/**
* Converts the coordinates into this format for d3:
* [ [x1, y1], [x2, y2] ... [xn, yn] ]
* And multiplies each value by multiplier. 
*
* @param { {x_values: [], y_values: []} }  coordinates
* @param integer						   multiplier
*/
function prepareCoordinates(coordinates, multiplier){

	var array = [];
	var reorganizedCoordinates = [];

	for (i = 0; i < coordinates.x_values.length; i++){
		array.push(coordinates.x_values[i] * multiplier);
		array.push(coordinates.y_values[i] * multiplier);

		reorganizedCoordinates.push(array);
		array = [];
	}
	return reorganizedCoordinates;
}

// Randomizes the position of the base and adjusted coordinates
// being displayed on the left or right graphs. 
function randomizePosition(trial, base_coordinates, adjusted_coordinates, base_correlation, adjusted_correlation){
	
	var result = {left: [], right: []};

	if (Math.random() < 0.5){
    result.left = base_coordinates;
    trial.data.left_correlation = base_correlation;

    result.right = adjusted_coordinates;
    trial.data.right_correlation = adjusted_correlation;
    }
  else{
    result.left = adjusted_coordinates;
    trial.data.left_correlation = adjusted_correlation;

    result.right = base_coordinates;
    trial.data.right_correlation = base_correlation;
  }

  return result;
}

// Given a jnd trial data, determine whether the response is
// correct or not. 
function responseIsCorrect(data){

	if ((data.right_correlation > data.left_correlation) 
        && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('m') ||
        (data.left_correlation > data.right_correlation)
        && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('z')){

    data.correct = true;
		return true;
  }
  else {

    data.correct = false;
    return false;
  }
}


