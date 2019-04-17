const INPUT_TYPES = {
	string: {
		display_name: "String", 
		color: "BLUE"
	},
	boolean: {
		display_name: "Boolean",
		color: "GREEN"
	},
	number: {
		display_name: "Number",
		color: "RED"
	}
};

var GRAPH_TYPES = {

	scatter: {

		docs: {
			display_name: "Scatter",
			description: "Conventional scatter plot where using 1st quadrant of x-y coordinate system."
		},

		attributes: {
			axis_color: {
				default: "BLACK",
				trial_data_key: "axis_color",
				docs: {
					desc: "Changes color of the axes. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},

			point_color: {
				default: "BLACK",
				trial_data_key: "point_color",
				docs: {
					desc: "Changes color of the points. Takes in color name (e.g. 'RED' or HEX value.)",
					input_type: INPUT_TYPES.string
				}
			},

			point_shape: {
				default: "circle",
				trial_data_key: "point_shape",
				docs: {
					desc: "Changes shape of the point. Takes in string name of shape.",
					input_type: INPUT_TYPES.string,
					valid_inputs: ["square", "diamond", "circle"]
				}
			},

			point_size: {
				default: 6,
				trial_data_key: "point_size",
				docs: {
					desc: "Changes size of the point. Takes in an integer value.",
					input_type: INPUT_TYPES.number
				}
			}
		}
	},

	strip: {

		docs: {
			display_name: "Strip",
			description: "Strip plot displaying strips along a horizontal axis. For a coordinate (x,y), x determines horizontal translation. Y may" + 
						 " or may not determine strip height, depending on whether attribute fixed_strip_height is true."
		},

		attributes: {
			axis_color: {
				default: "BLACK",
				trial_data_key: "axis_color",
				docs: {
					desc: "Changes color of the axes. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},

			fill_color: {
				default: "BLACK",
				trial_data_key: "fill_color",
				docs: {
					desc: "Changes the fill color of the strip. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},

			fixed_strip_height: {
				default: true,
				trial_data_key: "fixed_strip_height",
				docs: {
					desc: "If true, makes all strip heights equal. If false, uses the y-coordinate as the height." + 
						  "(So height of strips vary).",
					input_type: INPUT_TYPES.boolean
				}
			},

			strip_width: {
				default: 1,
				trial_data_key: "strip_width",
				docs: {
					desc: "Width of the strip in pixels.",
					input_type: INPUT_TYPES.number
				}
			},
		}

	},

	ring: {

		docs: {
			display_name: "Ring",
			description: "Ring plot displaying rings (large circles) on a horizontal axis. For a coordinate (x,y), x determines the horizontal translation of " +
			             " the ring whose origin lies on the axis. Y determines the radius of the ring."
		},

		attributes: {
			axis_color: {
				default: "BLACK",
				trial_data_key: "axis_color",
				docs: {
					desc: "Changes color of the axes. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},

			fill_color: {
				default: "none",
				trial_data_key: "fill_color",
				docs: {
					desc: "Changes the fill color of the ring. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},

			ring_thickness: {
				default: 1,
				trial_data_key: "ring_thickness",
				docs: {
					desc: "Changes ring thickness/stroke width in pixels.",
					input_type: INPUT_TYPES.number
				}
			},

			stroke_color: {
				default: "BLACK",
				trial_data_key: "stroke_color",
				docs: {
					desc: "Changes the stroke color of the ring. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
		}
	},

	shapes: {

		docs: {
			display_name: "Shapes",
			description: "Displays a single shape, of type determined by attribute shape_type."
		},

		attributes: {
			fill_color: {
				default: "BLACK",
				trial_data_key: "fill_color",
				docs: {
					desc: "Changes the fill color of the shape. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},

			shape_type: {
				default: "circle",
				trial_data_key: "shapes",
				docs: {
					desc: "Changes shape. Takes in string name of shape.",
					input_type: INPUT_TYPES.string,
					valid_inputs: ["slice", "square", "rotSquare", "triangle", "rotTriangle"]
				}
			},

			slice_rotation: {
				default: 0,
				trial_data_key: "slice_rotation",
				docs: {
					desc: "Changes rotation ONLY if shape_type = 'slice'.",
					input_type: INPUT_TYPES.number
				}
			},

			slice_rotation: {
				default: 0,
				trial_data_key: "slice_rotation",
				docs: {
					desc: "Changes rotation ONLY if shape_type = 'slice'.",
					input_type: INPUT_TYPES.number
				}
			},

			stroke_color: {
				default: "none",
				trial_data_key: "stroke_color",
				docs: {
					desc: "Changes the stroke color of the shape. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: INPUT_TYPES.string
				}
			},
		}
	}

};
