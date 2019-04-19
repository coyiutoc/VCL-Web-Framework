# Developing New Conditions

## For Researchers

If you are planning to add a new condition that uses the base experiments already supported, please provide the following information.

To see what identifiers are supported, refer to the page [here](/VCL-Web-Framework/manual/developing_new_conditions.html/supported_properties.html#subcondition-attributes).

- **Condition Name**
- **High-Level Description of Condition**
- **Identifiers**
  - **Base Experiment**
  - **Trial Structure**
  - **Balancing**
  - **Graph Type**
- **Subconditions**
  - **How many subconditions?**
  - **What is changing on each subcondition? List all variables.**
  - **How are each of the variables being changed? List all equations/computations needed if changing on a trial-by-trial basis.**

### Example

Let us say you want to make a new condition for a JND Design experiment that changes point size on each grouping of the Design trial structure. This is what your information would look like:

- **Condition Name**: small_point_sizes
- **High-Level Description of Condition**: Standard JND scatter plot condition, except point sizes vary between 5 - 13 pixels for each 0.3, 0.6, 0.9 base correlation grouping.
- **Identifiers**
  - **Base Experiment**: JND
  - **Trial Structure**: Design
  - **Balancing**: Latin Square
  - **Graph Type**: Scatter
- **Subconditions**
  - **How many subconditions?**: 15
  - **What is changing on each subcondition? List all variables.**: Point size
  - **How are each of the variables being changed on each subcondition? List all equations/computations needed if changing on trial-by-trial basis.**: The design trial structure has 5 groupings of the base_correlation = 0.3, 0.6, 0.9, making 15 total subconditions. For each group, point size is different.
     - Group 1 point size = 5 px
     - Group 2 point size = 7 px
     - Group 3 point size = 9 px
     - Group 4 point size = 11 px
     - Group 5 point size = 13 px

## For Developers

### (1) Add to config

Under `public/config/conditions-config`, add a new key and javascript object at the bottom. The object should something like below.

Refer [here](/VCL-Web-Framework/manual/developing_new_conditions.html/supported_properties.html#identifiers) for what is supported on each identifier (experiment, graph type, trial structure, balancing).

```
name_of_new_condition: {
	experiment: [],
	graph_type: [],
	trial_structure: [],
	balancing: "",
	display_name: "New condition name",
	display_info: {
		description: "",
		researcher: "",
		developer: ""
	}
}	
```
Check that when you load the UI, your condition is visible with the identifiers specified.

Note that `experiment`, `graph_type` and `trial_structure` can take multiple strings (in an array). So you can have the SAME condition name,
with the same kind of subcondition-level manipulation, but different underlying base experiment, different graph type, or different trial structure. Good examples of these are the base experiments that run across JND and Stevens, and are supported on both scatter and strip graph types. 

If we use the example from above, the JS object looks like this:
```
small_point_sizes: {
	experiment: ["jnd"],
	graph_type: ["scatter"],
	trial_structure: ["design"],
	balancing: "latin_square",
	display_name: "Small Point Sizes",
	display_info: {
		description: "Standard JND scatter plot condition, except point sizes vary between" +  
					 "5 - 13 pixels for each 0.3, 0.6, 0.9 base correlation grouping.",
		researcher: "Caitlin Coyiuto",
		developer: "Caitlin Coyiuto"
	}
}
```

### (2) Add subconditions

Add the attributes needed to run each subcondition into the right data file. All data files are in `public/scripts/experiment-properties/data/constants`. All attributes that are supported can be found here [here](/VCLLab/VCL_POC/docs/manual/supported_properties.html#subcondition-attributes).

How the subconditions work is that for a given trial structure, the application **MERGES** all attributes defined in the `BASE` object with all attributes defined in the `CONDITIONS` object. From the example, `small_point_sizes` is a JND condition using a design trial structure. So the app generates the subconditions for `small_point_sizes` by merging the attributes from `JND_BASE["design"]` and `JND_CONDITIONS["small_point_sizes"]`.

If the trial structure is already supported, you would only need to add all subconditions in a `key: []` structure to the `CONDITIONS` object.
- Add a JS object into the file with the same experiment base name. You want to add the new key-value pair into the object for `CONDITIONS`.
- Note that **each entry in the array represents ONE subcondition. So you must define all
attributes that are being changed on a subcondition-basis.**
  - The number of entries in the array **must match** the number of entries in the trial structure array. (E.g. if the design trial structure has 15 subconditions/rows, then the new array under `CONDITIONS` must also have 15 rows).
- You can **OVERRIDE** any of the attributes found in the base subconditions. E.g. you can redefine "point_size" in your subcondition if you are changing it on a subcondition-basis.
- An example of a new object holding all subconditions should look something like this:


```
name_of_new_condition:
[
	{attribute1: ___, attribute2: ____}, //first subcondition

	{attribute1: ___, attribute2: ____}, //second subcondition

	{attribute1: ___, attribute2: ____}, //third...

	{attribute1: ___, attribute2: ____},

	.....                                //Number of rows = number of rows or subconditions in trial structure
]
```

Using the example from above, we are just changing `point_size`, so we need to define each of the sizes on every subcondition.
Note that the subconditions for a JND Design already has `point_size` (look at `JND_BASE["design"]`). By re-defining the `point_size`
attribute here, you are **OVERRIDING** the `point_size` variable in the base. Also note that the number of rows below are equal to the number of rows in `JND_BASE["design"]`.

```
small_point_sizes:
    [
    {point_size: 5},

    {point_size: 5},

    {point_size: 5},

    {point_size: 7},

    {point_size: 7},

    {point_size: 7},

    {point_size: 9},

    {point_size: 9},

    {point_size: 9},

    {point_size: 11},

    {point_size: 11},

    {point_size: 11},

    {point_size: 13},

    {point_size: 13},

    {point_size: 13},
    ]
 ```

Again, depending on your trial structure, the application will merge the constants you define in `CONDITIONS` with any that are defined in the `BASE` to get all attributes for the subconditions. So for this example, all the subconditions for `small_point_sizes` is whatever is listed in the `JND_BASE["design"]`, plus whatever is defined in the `CONDITIONS` variable. 

```
[
    {distribution_type: "gaussian", base_correlation: 0.3, error: 0.0001, max_step_size: 0.01, 
    converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, 
    num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', 
    feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 5}, // <-- point_size is now   
                                                                                   // overriden (usually for JND 
                                                                                   // design, point_size = 6)

    {distribution_type: "gaussian", base_correlation: 0.6, error: 0.0001, max_step_size: 0.01, 
    converge_from_above: true, initial_difference: 0.1, num_points: 100, mean: 0.5, SD: 0.2, 
    num_SD: 2.5, point_color: 'BLACK', axis_color: 'BLACK', text_color: 'BLACK', 
    feedback_background_color: 'WHITE', background_color: 'WHITE', point_size: 5},
    .....
]
```

 ### (3) Update instructions

 To update the instructions that are displayed to the participant, you will have to add additional code to the
 timeline object. Navigate to the `_timeline.js` associated with the condition's experiment. Under 'INSTRUCTION TRIAL BLOCKS', under the case for the condition's graph type, add an instruction block. 

 For this example, we would go to `/experiments/jnd/jnd_timeline.js`, and add another if statement under
 case "scatter". 

 ### (4) Update docs

 The docs dynamically gets all the condition data specified in the config files. However, it needs to be compiled to be re-updated.

 Run this in the command line:

 `./node_modules/.bin/esdoc`

 And check that your condition exists in the [Conditions tab](/VCLLab/VCL_POC/docs/manual/conditions.html).
