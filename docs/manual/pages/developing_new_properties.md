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
When adding the attributes, make sure you add **all attributes that the experiment needs to run**. Look at the attributes required for each experiment [here](/VCL_POC/docs/manual/supported_properties.html#experimental-attributes).
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

### Graphical Attributes

### Graph Types

## Adding Experiments

## Overriding

### Base Plots

### Trial Structures