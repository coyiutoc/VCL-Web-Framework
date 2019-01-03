# VCL Correlation : Proof of Concept Experiments

This is a Node.js application that runs proof of concept experiments for the following:

- Foundational Stevens
- Foundational JND

## Prerequisites

#### (1) Git clone the repository
#### (2) Install Node

Visit the following link to download Node: [here.](https://nodejs.org/en/)

#### (3) Install Dependencies

Navigate into the folder then run:

```
npm install
```

## Running the Experiment

```
node app.js
```

Or alternatively, with nodemon:

```
nodemon app.js
```

The app is available at [localhost:8080](localhost:8080). If you want to access it at a different port, change the port number in app.js (line 57). 

## Testing the POC

The following features can be used to assist in debugging:
- We can toggle between using only 4 sub conditions for the experiment, or the full 17. Make variable `use_all_data = false` if the shorter version is desired, or `use_all_data = true` if we want the full 17 sub conditions. Variable is on line 62 of `public/scripts/timelines/jnd_timeline.js` or on line 64 of `public/scripts/timelines/stevens_timeline.js`.

#### For JND: 
- We can force the right graph to ALWAYS be of greater correlation. To do so, comment the function `force_greater_right_position` and uncomment function `randomize_position` at lines 163-168 in `public/scripts/experiments/jnd.js`.
- If browser console is open while running the experiment, console will print the correlations of the left/right graphs, when convergence is reached and when we have moved onto a new subcondition. 
