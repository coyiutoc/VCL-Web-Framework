# Developing New Properties

Sometimes, new conditions require new properties to be added to the framework. This section goes through how to add new properties for each identifier.

## Trial Structures

To add a new trial structure to an **existing** experiment:

1. In `public/config/trial-structure-config.js`, add a new key-object pair. Add the relevant doc information like the pre-existing trial structures.
2. Make sure that the base experiment supports the new structure:
- In `public/config/experiments-config.js`, add the name of the new trial structure under the `trial_structure` key for the correct base experiment.
- Navigate to the right `public/scripts/data/constants/___data.js` file for the base experiment. Determine how many subconditions the structure will support, and add the new key-array object under the `<experiment_name>_BASE` object. For example:
```
const JND_BASE = {
	....

	new_trial_structure: // <--
	[
		{ ... }
		{ ... }
		etc. 
	]
}
```
When adding the attributes, make sure you add **all attributes that the experiment needs to run**. Look at the attributes required for each experiment [here](/VCL-Web-Framework/manual/supported_properties.html#experimental-attributes).
3. In `public/scripts/data/custom_subcondition_generator.js`, add a new key-object pair under `CUSTOM_TRIAL_STRUCTURE_CONDITIONS`. 
```
var CUSTOM_TRIAL_STRUCTURE_CONDITIONS = {
	foundational : [],
	...

    new_structure: [] // <-- 
}
```

## Balancing Types

If you want to add a new way to balance subconditions:

1. In `public/config/balancing-config.js`, add a new key-object pair. Add the relevant doc information like the pre-existing balancing types.
2. Create a new generator file inside `scripts/experiment-properties/balancing/generators`. It should take **the length of the dataset array, and return the ordered indices of the subconditions.** E.g., if the dataset has 4 subconditions, the random generator will give back [2, 0, 1, 3] AKA randomize the order of the indices.
3. Make sure the balancing controller supports the new type. In `scripts/experiment-properties/balancing/balancing_controllers.js`, import the function from your generator js, then add another case in the switch statement.
4. Make sure that the base experiment supports the new structure. In `public/config/experiments-config.js`, add the name of the new balancing type under the `balancing_type` key for the correct base experiment.

## Graph-Related

In terms of graph-related properties, you could either be adding attributes to an **already existing graph type**, or adding an entire new type of **plot or graph type**. 

### Graphical Attributes

This assumes that you are adding to a **pre-existing graph type**. E.g. if you want to add `stroke_width` to the `scatter` graph type.

1. In `public/config/graphing-config.js` add a key-object pair under the `attributes` of the graph type. Fill in the doc information, and what the default value is. If the attribute only takes in a **fixed** set of inputs, add a key called `valid_inputs: [input1, input2 .... ]`.
2. Add d3 code to handle the new attribute. Open the right js file corresponding to the graph type in `public/scripts/graphing/d3-base-plots`. 

### Graph Types

If you want to add a **completely new graph type** (AKA plot):

1. In `public/config/graphing-config.js`, add a new key-object pair for the graph type. Add the doc information, and all the attributes that can be manipulatable by subconditions.
2. In `public/config/experiments-config.js`, add the name of the graph type under the experiment that it will support.
3. In `public/scripts/experiment-properties/graphing/graphing_controller.js`:
 - Add a new switch case in `plot_distributions`. 
 - Add a new "prepare" function - it can be modelled after `prepare_scatter_plot`, but in the event that you need to pass additional params which are dependent on the trial data, you can add those in your `attributes` object too (look at `prepare_shapes_plot`). Basically, the prepare function sets up all the data and attributes needed for a **single** plot, and passes it into the d3 script that will actually generate the plot.
4. Now you need to write the d3 code, which will take in the the `attributes` object created in your `prepare` function.
 - Create a new js file named after the graph type inside `d3-base-plots`. 
 - Write your d3 code. You will be appending the chart to a div with id = `graph`. So you would be doing something like:
```
let chart = d3.select("#graph")
			  .append("svg")
			     ......
```

### Point/Shape Types

For some conditions, there may be a need to simply add a new kind of `point_type` (belonging to `scatter` graph type) or a new type of shape taken inside the `shapes` array (belonging to `shapes` graph type).

1. In `public/config/graphing-config.js`, add the name of the new kind of point or shape type, either under the `valid_inputs` key of scatter's `point_type`, or shapes' `shapes`. 
2. Add the relevant d3 code in the `public/scripts/experiment-properties/graphing/d3-base-plots`. 
- If adding a new `point-type`, open `scatter_plot.js`, and add a switch case with the d3 code in `plot_scatter_points`. 
- If adding a new shape type for `shapes`, open `shape_plot.js`, and add a switch case inside `create_shape_plot`. Write the d3 function to handle that case.

## Adding Experiments

In the case you are building an entirely new experiment, you will have to do all of the above, plus build the jsPsych timeline and model object to support the timeline. If you haven't read up on [JsPsych](https://www.jspsych.org/), I would suggest you do that first, and at least do the [reaction time tutorial](https://www.jspsych.org/tutorials/rt-task/).

1. In `public/config/experiments-config.js`, add a new key-object inside `EXPERIMENTS`. You need to provide the `trial_structure`, `graph_type`, `balancing_type`, `docs`, and all `attributes` the experiment supports. Refer to the above ^^ instructions if you are adding any new properties for the identifiers.
2. Create the **relevant html files** that (a) holds the jsPsych timeline, and (b) displays the trials. E.g. look under `public/views/jnd` - there is an HTML for jnd_experiment.html and jnd_trial_display.html.
  - Create a new folder with the same name as your experiment under `public/views` for your experiment.
  - Add an HTML file called `<experiment_name>_experiment.html` and `<experiment_name>_trial_display.html`. 
  - Inside the experiment HTML, you will pass the routing params from the server side. Literally copy and paste below and change all the `<Experiment Name>` tags to the new experiment.
  ```
  <!DOCTYPE html>
	<html>
	  <head>

	    <title>VCL: <Experiment Name> Experiment</title>

	    <%- include('../header'); %>

	    <script type="text/javascript">

	      // Routing params from EJS:
	      var params = {"trial_structure": "<%= trial_structure %>",
	                    "condition": "<%= condition %>",
	                    "graph_type": "<%= graph_type %>",
	                    "balancing": "<%= balancing %>",
	                    "subject_id": "<%= subject_id %>",
	                    "subject_initials": "<%= subject_initials %>"};

	    </script>

	    <script type="module" src="/scripts/experiments/<experiment_name>/<experiment_name>_timeline.js" ></script>

	  </head>

	  <body>
	  </body>

	</html>
  ```
  - Inside the trial display HTML, we need to call the function to plot the graphs. Copy and paste below, and change the `<experiment name>` tags.
  ```
  <!DOCTYPE html>
	<html>
	<head>
	    <link rel="icon" href="./img/VCL_favicon.png">

	    <!-- Scripts: -->

	    <!-- D3: -->
	    <script src = "https://d3js.org/d3.v4.min.js"></script>
	    <script src="https://d3js.org/d3-selection-multi.v0.4.min.js"></script>

	</head>
	<body>
	  <div align = "center">
	    
	    <!-- D3 graph goes here: -->
	    <div id="graph">
	    </div>
	    
	    <script type="module">
	    
	        import { <experiment_name>_exp } from "/scripts/experiments/<experiment_name>/<experiment_name>_timeline.js";
	        import { plot_distributions } from "/scripts/experiment-properties/graphing/graphing_controller.js";
	        
	        plot_distributions(<experiment_name>_exp);

	    </script>
	  </div>
	</body>
	</html>
  ```	
3. Add your **data** for the experiment. 
  - In `/scripts/data/constants` add a new js file called `<experiment_name>_data.js`. 
  - Add all your subcondition data for the trial structure it supports, and any new conditions. Refer [here](/VCL-Web-Framework/manual/developing_new_properties.html#trial-structures) if you're making a new trial structure, and [part 2 of here](/VCL-Web-Framework/manual/developing_new_conditions.html) for the new conditions.
  - In `/scripts/data/data_controller.js`, import your `BASE` and `CONDITIONS` variables your data js file. 
    - Add the new base experiment to `EXPERIMENT_BASES` and `EXPERIMENT_CONDITIONS`.
4. Update **server-side routing**. Open `app.js` under root, and add another `else if` statement. Make the response render the `<experiment_name>_experiment.html` that you recently created. 
5. Add the **experimental logic**. You need to build: **(a) the JsPsych timeline,** and **(b) a model class to support the timeline.** You **MAY** not need a new model class, especially if your experiment is simple enough and doesn't have a lot trial-by-trial dependencies (e.g. look at the visualSearch branch from [here](https://github.com/Wongelawit/Correlation_MultipleEnsemble)). I would suggest using `JND_Radius` as a base, it is the simplest among the experiments.
  - Add a new folder under `public/scripts/experiments`.
  - Add two js files, (or one if you don't need the model class), called `<experiment_name>.js` and `<experiment_name>_timeline.js`. 
  - For the timeline, there should be blocks for:
    - The welcome page
    - Instructions
    - Feedback (if any after a trial)
    - Experimental trial
    - The end page
  - For the model class, you need to be able to:
    - Retrieve the right data from the /constants folder
    - Balance the data
    - Make the trial block (e.g. `generate_trial` jsPsych object)
    - Save any variables that the researchers want saved on a trial-by-trial basis
    - Determine what is a correct/incorrect response, and change the next trial's presentation (if the experiment demands it)
    - Export the data once the experiment ends
  - There is no template for the model class, though there are some functions that you can probably re-use from `JND_Radius` (aka `prepare_experiment`), but a lot of the constants are subject to whatever the experiment needs, and the `generate_trial` object is task-dependent.   

## Overriding

There are instances where new conditions or plots cannot be supported naturally by the framework. These usually are **unconventional** instances. A good example are all the conditions prefixed with `distractor_<color>_shades`. These conditions plot **TWO** distributions onto a scatter graph, and additionally do not follow any of the supported trial structures. There is therefore a way to **NOT USE** the base plots (e.g. anything in `d3-base-plots`) and to not be dependent on any of the trial structures, so you can create your subconditions dynamically instead of declaring them inside `/data/constants`. 

### Custom Plots

Assuming that you have a plot that can be categorized under one of the main graph types, but there is some **unconventional** set-up involved that may likely break or cause the main base plot code to become messy, create a custom d3 script. 

For example, the `distractor` conditions plot two distributions onto a single scatter plot, and also have a very specific way of plotting points to allow equal occlusion between the distributions. Adding this into this functionality into the `d3-base-plots/scatter_plot.js` will likely make things very messy. So we created a custom D3 script for it instead (`d3-custom-plots/distractor_scatter_plot.js`).

1. Inside `/scripts/experiment-properties/graphing/custom_graphing_controller.js`. 
   - Add an if-else clause inside the function `is_custom_plot`. Basically should return true for your condition.
   - Add an if-else clause inside `prepare_custom_plot`, and create a new function that sets up the attributes to be sent to your d3 function.
   - Import that function at the top of this script.
2. Create the d3 script. Add a new custom plot script inside `/d3-custom-plots`.
3. Lastly, although the d3 code is customized for your condition, the framework still assumes that your condition uses one of the base plots (e.g scatter, strip etc.). If the new plot doesn't fit "naturally" into these types, then you might as well create a [new graph type](/VCL-Web-Framework/manual/developing_new_properties.html#graph-types).

### Subcondition Generation

There are two instances where you can have custom code for your subconditions: (1) you want to write code that programmatically generates the subconditions instead of writing your data manually inside `/data/constants` (so this **still means you are following a certain trial structure**), or (2) you are **NOT following any trial structure** altogether, so the **trial structure is `custom`**. 

Inside `/scripts/data/custom_subcondition_generator.js`:
- For (1): Add your condition name inside `CUSTOM_TRIAL_STRUCTURE_CONDITIONS`, under `custom` key.
- For (2): Add your condition name inside `CUSTOM_TRIAL_STRUCTURE_CONDITIONS`, under the trial structure it follows.
- Then:
  1. Add an if-else inside `get_subconditions` to route it to your custom generator function.
  2. Write the function below to generate the subconditions.
