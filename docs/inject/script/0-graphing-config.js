const G_INPUT_TYPES = {
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

var GRAPH_TYPES = {

	scatter: {

		docs: {
			display_name: "Scatter",
			description: "Conventional scatter plot where using 1st quadrant of x-y coordinate system."
		},

		attributes: {
			axis_color: {
				default: "BLACK",
				docs: {
					desc: "Changes color of the axes. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: G_INPUT_TYPES.string
				}
			},

			point_color: {
				default: "BLACK",
				docs: {
					desc: "Changes color of the points. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: G_INPUT_TYPES.string
				}
			},

			point_shape: {
				default: "circle",
				valid_inputs: ["square", "diamond", "circle"],
				docs: {
					desc: "Changes shape of the point. Takes in string name of shape.",
					input_type: G_INPUT_TYPES.string
				}
			},

			point_size: {
				default: 6,
				docs: {
					desc: "Changes size of the point. Takes in an integer value.",
					input_type: G_INPUT_TYPES.number
				}
			},
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
				docs: {
					desc: "Changes color of the horiztonal axis. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: G_INPUT_TYPES.string
				}
			},

			fill_color: {
				default: "BLACK",
				docs: {
					desc: "Changes the fill color of the strip. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: G_INPUT_TYPES.string
				}
			},

			fixed_strip_height: {
				default: true,
				docs: {
					desc: "If true, makes all strip heights equal. If false, uses the y-coordinate as the height." + 
						  "(So height of strips vary).",
					input_type: G_INPUT_TYPES.boolean
				}
			},

			strip_width: {
				default: 1,
				docs: {
					desc: "Width of the strip in pixels.",
					input_type: G_INPUT_TYPES.number
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
				docs: {
					desc: "Changes color of the horizontal axis. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: G_INPUT_TYPES.string
				}
			},

			fill_color: {
				default: "none",
				docs: {
					desc: "Changes the fill color of the ring. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: G_INPUT_TYPES.string
				}
			},

			ring_thickness: {
				default: 1,
				docs: {
					desc: "Changes ring thickness/stroke width in pixels.",
					input_type: G_INPUT_TYPES.number
				}
			},

			stroke_color: {
				default: "BLACK",
				docs: {
					desc: "Changes the stroke color of the ring. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: G_INPUT_TYPES.string
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
				docs: {
					desc: "Changes the fill color of the shape. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: G_INPUT_TYPES.string
				}
			},

			shapes: {
				default: "circle",
				valid_inputs: ["circle", "slice", "square", "rotSquare", "triangle", "rotTriangle"],
				docs: {
					desc: "ARRAY containing two strings, each indicating shape type. E.g. ['circle', 'square'].",
					input_type: G_INPUT_TYPES.string
				}
			},

			slice_rotation: {
				default: 0,
				docs: {
					desc: "Changes rotation ONLY if ones of the shapes specified is = 'slice'.",
					input_type: G_INPUT_TYPES.number
				}
			},

			stroke_color: {
				default: "none",
				docs: {
					desc: "Changes the stroke color of the shape. Takes in color name (e.g. 'RED') or HEX value.",
					input_type: G_INPUT_TYPES.string
				}
			},
		}
	}

};
