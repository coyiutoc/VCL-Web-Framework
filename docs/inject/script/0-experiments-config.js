const INPUT_TYPES = {
	string: {
		display_name: "String", 
		bootstrap_label: "default"
	},
	boolean: {
		display_name: "Boolean",
		bootstrap_label: "success"
	},
	number: {
		display_name: "Number",
		bootstrap_label: "danger"
	}
};

var EXPERIMENTS = {

	jnd : {
		trial_structure: ["foundational", "design", "custom", "foo"],
		graph_type: ["scatter", "strip", "ring"],
		balancing_type: ["random", "latin_square", "foo_balancing"],
		docs: {
			display_name: "JND",
			description: "The JND experiment essentially presents users with 2 plots, one with a higher correlation than the other. " + 
						 "The user then must choose the graph with the higher correlation by pressing the 'z' or 'm' keys to select " + 
						 "the left or right graphs respectively.",
			spec: "./docs/manual/jnd.md",
			developer: "Caitlin Coyiuto"
		},
		attributes: {
			distribution_type: {
				valid_inputs: ["gaussian"],
				required: true,
				docs: {
					desc: "Determines how the distribution is computed.",
					input_type: INPUT_TYPES.string
				}
			},			
			base_correlation: {
				required: true,
				docs: {
					desc: "Correlation (R) value of the base distribution.",
					input_type: INPUT_TYPES.number
				}
			},
			error: {
				required: true,
				docs: {
					desc: "Value used in computing the distribution.",
					input_type: INPUT_TYPES.number
				}
			},
			max_step_size: {
				required: true,
				docs: {
					desc: "One of the values used to calculate the next adjusted correlation value based on user's input.",
					input_type: INPUT_TYPES.number
				}
			},
			converge_from_above: {
				required: true,
				docs: {
					desc: "Determines whether the distribution's correlation that the user adjusts is higher (true) or lower (false) than the base distribution's correlation.",
					input_type: INPUT_TYPES.boolean
				}
			},
			initial_difference: {
				required: true,
				docs: {
					desc: "One of the values used to calculate the next adjusted correlation value based on user's input.",
					input_type: INPUT_TYPES.number
				}
			},
			num_points: {
				required: true,
				docs: {
					desc: "How many points are in the distribution.",
					input_type: INPUT_TYPES.number
				}
			},
			mean: {
				required: true,
				docs: {
					desc: "Value used in computing the distribution.",
					input_type: INPUT_TYPES.number
				}
			},
			SD: {
				required: true,
				docs: {
					desc: "Value used in computing the distribution.",
					input_type: INPUT_TYPES.number
				}
			},
			num_SD: {
				required: true,
				docs: {
					desc: "Value used in computing the distribution.",
					input_type: INPUT_TYPES.number
				}
			},
			text_color: {
				required: true,
				docs: {
					desc: "Changes color of the text in the experiment. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
			feedback_background_color: {
				required: true,
				docs: {
					desc: "Changes background color of feedback displays. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
			background_color: {
				required: true,
				docs: {
					desc: "Changes background color of trial displays. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
			dist_base: {
				required: false,
				docs: {
					desc: "Correlation (R) value of the distractor distribution. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.number
				}
			},
			dist_error: {
				required: false,
				docs: {
					desc: "Value used in computing the distractor distribution. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.number
				}
			},
			dist_num_points: {
				required: false,
				docs: {
					desc: "How many points are in the distractor distribution. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.number
				}
			},
			dist_color: {
				required: false,
				docs: {
					desc: "Color of the points of the distractor distribution. Takes in color name (e.g. 'RED') or HEX value. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.string
				}
			},
			dist_shape: {
				required: false,
				docs: {
					desc: "Shape of the points of the distractor distribution. Supports shapes defined in attribute point_shape (in graphical attributes). <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.string
				}
			},
			dist_point_size: {
				required: false,
				docs: {
					desc: "Size of the distractor point in pixels. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.number
				}
			},
			target_color: {
				required: false,
				docs: {
					desc: "Color of the points of the target distribution. Takes in color name (e.g. 'RED') or HEX value. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.string
				}
			},
			target_shape: {
				required: false,
				docs: {
					desc: "Shape of the points of the target distribution. Supports shapes defined in attribute point_shape (in graphical attributes). <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.string
				}
			},
			dimension: {
				required: false,
				docs: {
					desc: "Indicates color axis of the condition. 'chro' = chromaticity, 'lum' = luminance, 'hue' = hue. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.string
				}
			},
		}
	},

	jnd_radius : {
		trial_structure: ["foundational"],
		graph_type: ["shapes"],
		balancing_type: ["random"],
		docs: {
			display_name: "JND Radius",
			description: "The JND experiment essentially presents users with 2 different shapes, one with a bigger area than the other. " + 
						 "The user then must choose the graph with the greater area by pressing the 'z' or 'm' keys to select the left " + 
						 "or right graphs respectively.",
			spec: "./docs/manual/jnd_radius.md",
			developer: "Caitlin Coyiuto"
		},
		attributes: {
			base_radius: {
				required: true,
				docs: {
					desc: "The radius of the base shape in cm.",
					input_type: INPUT_TYPES.number
				}
			},
			initial_difference: {
				required: true,
				docs: {
					desc: "One of the values used to calculate the next adjusted radius value based on user's input.",
					input_type: INPUT_TYPES.number
				}
			},
			converge_from_above: {
				required: true,
				docs: {
					desc: "Determines whether the shape radius that the user adjusts is higher (true) or lower (false) than the base shape radius.",
					input_type: INPUT_TYPES.boolean
				}
			},
			text_color: {
				required: true,
				docs: {
					desc: "Changes color of the text in the experiment. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
			feedback_background_color: {
				required: true,
				docs: {
					desc: "Changes background color of feedback displays. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
			background_color: {
				required: true,
				docs: {
					desc: "Changes background color of trial displays. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
		}
	},

	stevens : {
		trial_structure: ["foundational", "design", "custom"],
		graph_type: ["scatter", "strip", "ring"],
		balancing_type: ["random", "latin_square"],
		docs: {
			display_name: "Stevens",
			description: "The Stevens experiment presents users with 3 plots. The task involves having to adjust the correlation of the middle " + 
						 "plot by pressing the 'z' or 'm' keys to increase or decrease the correlation respectively. The goal is to adjust the " + 
						 "middle plot so that its correlation is a midpoint between the 2 other plots.",
			spec: "./docs/manual/stevens.md",
			developer: "Caitlin Coyiuto"
		},
		attributes: {
			distribution_type: {
				valid_inputs: ["gaussian"],
				required: true,
				docs: {
					desc: "Determines how the distribution is computed.",
					input_type: INPUT_TYPES.string
				}
			},
			round_type: {
				valid_inputs: ["test", "consistency"],
				required: true,
				docs: {
					desc: "The type of trial.",
					input_type: INPUT_TYPES.string
				}
			},
			trials_per_round: {
				required: true,
				docs: {
					desc: "How many trials are run for a given subcondition. (E.g. how many times a person presses spacebar for a given subcondition.)",
					input_type: INPUT_TYPES.number
				}
			},
			high_ref: {
				required: true,
				docs: {
					desc: "The correlation of the plot with the greater correlation.",
					input_type: INPUT_TYPES.number
				}
			},
			low_ref: {
				required: true,
				docs: {
					desc: "The correlation of the plot with the lower correlation.",
					input_type: INPUT_TYPES.number
				}
			},
			error: {
				required: true,
				docs: {
					desc: "Value used in computing the distribution.",
					input_type: INPUT_TYPES.number
				}
			},
			num_points: {
				required: true,
				docs: {
					desc: "How many points are in the distribution.",
					input_type: INPUT_TYPES.number
				}
			},
			mean: {
				required: true,
				docs: {
					desc: "Value used in computing the distribution.",
					input_type: INPUT_TYPES.number
				}
			},
			SD: {
				required: true,
				docs: {
					desc: "Value used in computing the distribution.",
					input_type: INPUT_TYPES.number
				}
			},
			num_SD: {
				required: true,
				docs: {
					desc: "Value used in computing the distribution.",
					input_type: INPUT_TYPES.number
				}
			},
			regen_rate: {
				required: true,
				docs: {
					desc: "How long the graphs are presentation before regenerated in ms.",
					input_type: INPUT_TYPES.number
				}
			},
			text_color: {
				required: true,
				docs: {
					desc: "Changes color of the text in the experiment. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
			background_color: {
				required: true,
				docs: {
					desc: "Changes background color of trial displays. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
			dist_base: {
				required: false,
				docs: {
					desc: "Correlation (R) value of the distractor distribution. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.number
				}
			},
			dist_error: {
				required: false,
				docs: {
					desc: "Value used in computing the distractor distribution. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.number
				}
			},
			dist_num_points: {
				required: false,
				docs: {
					desc: "How many points are in the distractor distribution. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.number
				}
			},
			dist_color: {
				required: false,
				docs: {
					desc: "Color of the points of the distractor distribution. Takes in color name (e.g. 'RED') or HEX value. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.string
				}
			},
			dist_shape: {
				required: false,
				docs: {
					desc: "Shape of the points of the distractor distribution. Supports shapes defined in attribute point_shape (in graphical properties). <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.string
				}
			},
			dist_point_size: {
				required: false,
				docs: {
					desc: "Size of the distractor point in pixels. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.number
				}
			},
			target_color: {
				required: false,
				docs: {
					desc: "Color of the points of the target distribution. Takes in color name (e.g. 'RED') or HEX value. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.string
				}
			},
			target_shape: {
				required: false,
				docs: {
					desc: "Shape of the points of the target distribution. Supports shapes defined in attribute point_shape (in graphical properties). <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.string
				}
			},
			dimension: {
				required: false,
				docs: {
					desc: "Indicates color axis of the condition. 'chro' = chromaticity, 'lum' = luminance, 'hue' = hue. <b>ONLY applies for conditions starting with 'distractor_'.</b>",
					input_type: INPUT_TYPES.string
				}
			},
		}
	},

	estimation: {
		trial_structure: ["estimation"],
		graph_type: ["shapes"],
		balancing_type: ["random"],
		docs: {
			display_name: "Estimation",
			description: "The Estimation experiment presents users with 2 shapes side-by-side. The task involves having to adjust the size of the " + 
						 "modifiable shape so that it is the same size as the reference shape.",
			spec: "./docs/manual/estimation.md",
			developer: "Zoe Zhao"
		},
		attributes: {
			max_step_size: {
				required: true,
				docs: {
					desc: "One of the values used to calculate the next modifiable shape's size based on user's input.",
					input_type: INPUT_TYPES.number
				}
			},
			mod_fill: {
				required: true,
				docs: {
					desc: "Fill color of the modifiable shape. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
			mod_max_size: {
				required: true,
				docs: {
					desc: "Maximum size of the modifiable shape in cm.",
					input_type: INPUT_TYPES.number
				}
			},
			mod_min_size: {
				required: true,
				docs: {
					desc: "Minimum size of the modifiable shape in cm.",
					input_type: INPUT_TYPES.number
				}
			},
			mod_outline: {
				required: true,
				docs: {
					desc: "Outline color of the modifiable shape. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
			mod_rotate_by: {
				required: true,
				docs: {
					desc: "Rotation of the modifiable shape in degrees.",
					input_type: INPUT_TYPES.number
				}
			},
			mod_shape: {
				required: true,
				valid_inputs: ["circle", "triangle", "square", "line", "rectangle"],
				docs: {
					desc: "Shape type of the modifiable shape. Can be 'circle', 'triangle', 'square', 'line', or 'triangle'.",
					input_type: INPUT_TYPES.string
				}
			},
			ref_fill: {
				required: true,
				docs: {
					desc: "Fill color of the reference shape. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
			ref_outline: {
				required: true,
				docs: {
					desc: "Outline color of the reference shape. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
			ref_shape: {
				required: true,
				valid_inputs: ["circle", "triangle", "square", "line", "rectangle"],
				docs: {
					desc: "Shape type of the reference shape. Can be 'circle', 'triangle', 'square', 'line', or 'triangle'.",
					input_type: INPUT_TYPES.string
				}
			},
			ref_size: {
				required: true,
				docs: {
					desc: "Size of the reference shape in cm.",
					input_type: INPUT_TYPES.number
				}
			},
		}
	}
};
