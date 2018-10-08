const TRIAL_LIMIT = 250;

function generateDistribution(correlation, error, size, numsd, mean, sd){

  // dynamicallyLoadScript(MATHJS_URL);
  var coordinates = {x_values: [], y_values: []};
  var overshootSize = size + 20; // Generating > size will guarantee we have
                                 // a distribution of the speciied size later. 

  var done = true;
  // Initialize the points and make sure the correlation is in an acceptable error range.
  // Restart from scratch if adjusting for the error value is taking too long.
  do {
      // Reset coordinates:
      coordinates = {x_values: [], y_values: []};

      initializePoints(coordinates, correlation, overshootSize, numsd, mean, sd);
      done = adjustPointsForError(coordinates, correlation, error, overshootSize, numsd, mean, sd);
  } while(done == false);

  // Transformation into range [0, 1]
  transformPoints(coordinates, mean, sd);
  readjustPoints(coordinates, correlation, error, overshootSize, numsd, mean, sd);

  // Since this is code ported from the java codebase, coordinates are plotted
  // so that origin as at the top left (this makes the distribution negative instead
  // of positive). To force it to be positive, we flip the whole distribution 
  // across y axis. 
  for (let i = 0; i<coordinates.y_values.length; i++) {
    coordinates.y_values[i] = coordinates.y_values[i] * (-1);
  }

  return coordinates; 
}

function initializePoints(coordinates, correlation, size, numsd, mean, sd){
  var xVal;
  var x2Val;
  var yVal;

  for (let i = 0; i < size; i++) {
    do {
        xVal = random_bm();
        x2Val = random_bm();

        // formula for generating gaussian distribution: y = p*x + sqrt(1-p^2)*(x2)
        yVal = (correlation * xVal) + (Math.sqrt(1 - (correlation * correlation)) * x2Val);
    } while (pointNotWithinRequiredStdDevs(xVal, yVal, numsd));

    coordinates.x_values.push(xVal);
    coordinates.y_values.push(yVal);
  }
}

function adjustPointsForError(coordinates, correlation, error, size, numsd, mean, sd) {

  var currTrial = 0;

  // Try to correct the correlation value, up to a maximum of TRIAL_LIMIT trials.
  while (correlationNotWithinError(coordinates, correlation, error) && (currTrial < TRIAL_LIMIT)) {
    currTrial += 1;
    coordinates.x_values.splice(size - 1, 1);
    coordinates.y_values.splice(size - 1, 1);
    var x;
    var x2;
    var y;
    do {
      x = random_bm();
      x2 = random_bm();
      y = (correlation * x) + (Math.sqrt(1 - (correlation * correlation)) * x2);
    } while (pointNotWithinRequiredStdDevs(x, y, numsd));
    coordinates.x_values.push(x);
    coordinates.y_values.push(y);
  }
  return !(correlationNotWithinError(coordinates, correlation, error));
}

// Replaces the points that are outside of the [0,1] range.
function readjustPoints(coordinates, correlation, error, size, numsd, mean, sd) {
  
  var temp_coordinates = {x_values: [], y_values: []};
  var max_iterations = 500;

  for (let i = 0; i<size; i++) {
    if (pointNotWithinRequiredStdDevs(coordinates.x_values[i], coordinates.y_values[i], numsd, mean, sd)){
      coordinates.x_values.splice(i, 1);
      coordinates.y_values.splice(i, 1);
      var x;
      var x2;
      var y;

      var temp = 0;
      while (temp < max_iterations){
        x = random_bm();
        x2 = random_bm();
        y = (correlation * x) + (Math.sqrt(1 - (correlation * correlation)) * x2);
        x = x*sd + mean;
        y = y*sd + mean;

        if (i > 0) {
          temp_coordinates.x_values = coordinates.x_values[i-1];
          temp_coordinates.y_values = coordinates.y_values[i-1];

          // redefining undefined?
          // CAITLINNNNNN
          // temp_coordinates.x_values[i] = x;
          // temp_coordinates.y_values[i] = y;
        }

        if (!pointNotWithinRequiredStdDevs(x, y, numsd, mean, sd) && (i > 0) &&
            !correlationNotWithinError(temp_coordinates, correlation, error)){
          break;
        }

        temp++; 
      }

      coordinates.x_values[i] = x;
      coordinates.y_values[i] = y;
    }
  }

  /*
  If, after replacing the points, the correlation is outside of the error thresholds, regenerate the entire
  distribution
   */
  //if (correlationNotWithinError(coordinates, correlation, error)) {
    //coordinates = {x_values: [], y_values: []};
    //generateDistribution(correlation, error, size, numsd, mean, sd);
  //}
}

// CAITLINNNNNNNN
// function pointNotWithinRequiredStdDevs(x, y, numsd){
//   return pointNotWithinRequiredStdDevs2(x, y, numsd, 0, 1);
// }

function pointNotWithinRequiredStdDevs(x, y, numsd, mean, sd){

  var leftThreshold = mean - numsd*sd;
  var rightThreshold = mean + numsd*sd;

  return (x < leftThreshold) || (x > rightThreshold) || (y < leftThreshold) || (y > rightThreshold);
}

function correlationNotWithinError(coordinates, correlation, error){
  return Math.abs(correlation - getPearsonCorrelation(coordinates.x_values, coordinates.y_values)) > error;
}

function transformPoints(coordinates, mean, sd) {

    /** Calculate the needed x- and y- scale/translation amount
     * by using the formulas for:
     *         mean change: newMeanX = scaleX*meanX+translateX
     *             stdev change: newStdevX = scaleX*stdevX
     */
    var scaleX = sd/math.std(coordinates.x_values);
    var scaleY = sd/math.std(coordinates.y_values);
    var translateX = mean - math.mean(coordinates.x_values)*scaleX;
    var translateY = mean - math.mean(coordinates.y_values)*scaleY;
    scalePoints(coordinates,scaleX,scaleY);
    translatePoints(coordinates,translateX,translateY);
}

// Scales the points in a distribution with the given x and y scale values.
function scalePoints(coordinates, scaleX, scaleY) {
  for (let i = 0; i<coordinates.x_values.length; i++) {
    coordinates.x_values[i] = coordinates.x_values[i] * scaleX;
    coordinates.y_values[i] = coordinates.y_values[i] * scaleY;
  }
}

// Translates the points in a distribution with the given x and y translate values.
function translatePoints(coordinates, x, y) {
  for (let i = 0; i<coordinates.x_values.length; i++) {
    coordinates.x_values[i] = coordinates.x_values[i] + x;
    coordinates.y_values[i] = 1 - (coordinates.y_values[i] + y);
  }
}

// Returns Pearson Correlation Coefficient.
// SOURCE: https://memory.psych.mun.ca/tech/js/correlation.shtml
function getPearsonCorrelation(x, y) {
  var shortestArrayLength = 0;
   
  if(x.length == y.length) {
      shortestArrayLength = x.length;
  } else if(x.length > y.length) {
      shortestArrayLength = y.length;
      console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
  } else {
      shortestArrayLength = x.length;
      console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
  }

  var xy = [];
  var x2 = [];
  var y2 = [];

  for(var i=0; i<shortestArrayLength; i++) {
      xy.push(x[i] * y[i]);
      x2.push(x[i] * x[i]);
      y2.push(y[i] * y[i]);
  }

  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_x2 = 0;
  var sum_y2 = 0;

  for(let i=0; i< shortestArrayLength; i++) {
      sum_x += x[i];
      sum_y += y[i];
      sum_xy += xy[i];
      sum_x2 += x2[i];
      sum_y2 += y2[i];
  }

  var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
  var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
  var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
  var step4 = Math.sqrt(step2 * step3);
  var answer = step1 / step4;

  return answer;
}

// SOURCE: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
function random_bm() {
  var u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function dynamicallyLoadScript(url) {
  var script = document.createElement("script"); // Make a script DOM node
  script.src = url; // Set it's src to the provided URL

  document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

export {
  TRIAL_LIMIT,
  generateDistribution
}