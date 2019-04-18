# Developing New Conditions

## For Researchers

If you are planning to add a new condition that uses the base experiments already supported, please provide the following information:

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
  - **How are each of the variables being changed? List all equations/computations needed if changing on trial-by-trial basis.**

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

Under `public/config/conditions-config`, add a new key and javascript object at the bottom. The object should look like this:

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

### (2) Add constants

Add the constants needed to run each subcondition into the right data file. All data files are in `public/scripts/experiment-properties/data/constants`.
Add a JS object into the file with the same experiment base name. You want to add into the array for CONDITIONS, not BASE. E.g. for JND, there is
an array for JND_BASE, which has all the base attributes on each subcondition of a given trial structure. All condition data, which either adds or
overrides any parameters in JND_BASE, is inside JND_CONDITIONS.

**Each entry in the array represents ONE subcondition. So you must define all
attributes that are being changed for each subcondition.**

**You can OVERRIDE any of the attributes found in the base subconditions. E.g. you can redefine "point_size" in your subcondition if you are changing it
on a subcondition-basis.**

Object should look something like this:

```
name_of_new_condition:
[
	{constant1: ___, constant2: ____},

	{constant1: ___, constant2: ____},

	{constant1: ___, constant2: ____},

	{constant1: ___, constant2: ____},

	.....
]
```

Using example from above, we are just changing `point_size`, so we need to define each of the sizes on every subcondition.
Note that the subconditions for a JND Design already has `point_size` (look at `JND_BASE["design"]`). By re-defining the `point_size`
attribute here, you are **OVERRIDING** the `point_size` variable in the base.

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

 ### TODO: Instruction panels

 ### (4) Update docs.

 The docs dynamically gets all the condition data specified in the config files. However, it needs to be compiled to be re-updated.

 Run this in the command line:

 `./node_modules/.bin/esdoc`

 And check that your condition exists in the Conditions tab.
