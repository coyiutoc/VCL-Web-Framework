var CONDITIONS = {

	base: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter", "strip"],
		trial_structure: "foundational",
		balancing: "latin_square",
		display_name: "Base",
		display_info: {
			description: "The standard foundational base condition with no additional manipulation on how the gaussian distributions are displayed or generated.",
			researcher: "Everyone",
			developer: "Caitlin Coyiuto"
		}
	},

	strip_ring_size: {
		experiment: ["jnd", "stevens"],
		graph_type: ["ring"],
		trial_structure: ["foundational"],
		balancing: "latin_square",
		display_name: "Strip Ring Size",
		display_info: {
			description: "Ring visualizations where for a given distribution, the x coordinate is the horizontal translation and the y coordinate is the ring radius.",
			researcher: "Main Correlation Team",
			developer: "Caitlin Coyiuto"
		}
	},

	line_length_strip: {
		experiment: ["jnd", "stevens"],
		graph_type: ["strip"],
		trial_structure: ["foundational"],
		balancing: "latin_square",
		display_name: "Line Length Strip",
		display_info: {
			description: "Strip visualizations where for a given distribution, the x coordinate is the horizontal translation and the y coordinate is the strip height.",
			researcher: "Main Correlation Team",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_rainbow: {
		experiment: ["jnd"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Rainbow",
		display_info: {
			description: "2-distributions presented on each graph, one the target and one the distractor population. " + 
						 "Target and distractor population colors will vary. Distractor population correlation always set to 0.3.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_multi: {
		experiment: ["jnd"],
		graph_type: ["scatter"],
		trial_structure: ["custom"],
		balancing: "latin_square",
		display_name: "Multi-Phase (Task 1)",
		display_info: {
			description: "Task one of 'Multi-Phase' experiments. 2-distributions presented on each graph, one the target and on the distractor population. " +
						 "Target and distractor population colors will vary. Distractor population correlation always set to 0.2. Draws from the first 12 " +
						 "subconditions of Design for base values.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_red_hue: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Red Hue",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_red_hue: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Diamond Square Red Hue",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_red_lum: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Red Lum",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_red_lum: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Diamond Square Red Lum",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_red_chrom: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Red Chrom",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_red_chrom: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Diamond Square Red Chrom",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_yellow_hue: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Yellow Hue",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_yellow_hue: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Diamond Square Yellow Hue",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_yellow_lum: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Yellow Lum",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_yellow_lum: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Diamond Square Yellow Lum",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_yellow_chrom: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Yellow Chrom",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_yellow_chrom: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Diamond Square Yellow Chrom",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_blue_hue: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Blue Hue",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_blue_hue: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: ["latin_square"],
		display_name: "Distractor Diamond Square Blue Hue",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_blue_lum: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Blue Lum",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_blue_lum: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Diamond Square Blue Lum",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_blue_chrom: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Blue Chrom",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_blue_chrom: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Diamond Square Blue Chrom",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_green_hue: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Green Hue",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_green_hue: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Diamond Square Green Hue",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_green_lum: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Green Lum Hue",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_green_lum: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Diamond Square Green Lum Hue",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_square_green_chrom: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Square Green Chrom",
		display_info: {
			description: "Part of the series of Distractor Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (square shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_diamond_square_green_chrom: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["design"],
		balancing: "latin_square",
		display_name: "Distractor Diamond Square Green Chrom",
		display_info: {
			description: "Part of the series of Distractor Diamond-Square experiments across Red/Blue/Green/Yellow colors and for axes Hue, " +
			    		 "Chromaticity and Luminance axes. 2-distributions presented on each graph, one the target (square shaped) and one " +
			    		 "the distractor (diamond shaped). Distractor population correlation always set to 0.2.",
			researcher: "Madison Elliott",
			developer: "Caitlin Coyiuto"
		}
	},

	circle_square: {
		experiment: ["jnd_radius"],
		graph_type: ["shapes"],
		trial_structure: ["foundational"],
		balancing: "random",
		display_name: "Circle, Square",
		display_info: {
			description: "Manipulation on the size of various shape combinations. Responses are based on the user's ability to " +
						 "disciminate shape with the greater area.",
			researcher: "Tina Qi",
			developer: "Caitlin Coyiuto"
		}
	},

	circle_triangle: {
		experiment: ["jnd_radius"],
		graph_type: ["shapes"],
		trial_structure: ["foundational"],
		balancing: "random",
		display_name: "Circle, Triangle",
		display_info: {
			description: "Manipulation on the size of various shape combinations. Responses are based on the user's ability to " +
						 "disciminate shape with the greater area.",
			researcher: "Tina Qi",
			developer: "Caitlin Coyiuto"
		}
	},

	square_triangle: {
		experiment: ["jnd_radius"],
		graph_type: ["shapes"],
		trial_structure: ["foundational"],
		balancing: "random",
		display_name: "Square, Triangle",
		display_info: {
			description: "Manipulation on the size of various shape combinations. Responses are based on the user's ability to " +
						 "disciminate shape with the greater area.",
			researcher: "Tina Qi",
			developer: "Caitlin Coyiuto"
		}
	},

	rotSquare_rotTriangle: {
		experiment: ["jnd_radius"],
		graph_type: ["shapes"],
		trial_structure: ["foundational"],
		balancing: "random",
		display_name: "Rotated Square, Rotated Triangle",
		display_info: {
			description: "Manipulation on the size of various shape combinations. Responses are based on the user's ability to " +
						 "disciminate shape with the greater area.",
			researcher: "Tina Qi",
			developer: "Caitlin Coyiuto"
		}
	},

	slice0_triangle: {
		experiment: ["jnd_radius"],
		graph_type: ["shapes"],
		trial_structure: ["foundational"],
		balancing: "random",
		display_name: "Slice 0-Degrees, Triangle",
		display_info: {
			description: "Manipulation on the size of various shape combinations. Responses are based on the user's ability to " +
						 "disciminate shape with the greater area.",
			researcher: "Tina Qi",
			developer: "Caitlin Coyiuto"
		}
	},

	slice45_triangle: {
		experiment: ["jnd_radius"],
		graph_type: ["shapes"],
		trial_structure: ["foundational"],
		balancing: "random",
		display_name: "Slice 45-Degrees, Triangle",
		display_info: {
			description: "Manipulation on the size of various shape combinations. Responses are based on the user's ability to " +
						 "disciminate shape with the greater area.",
			researcher: "Tina Qi",
			developer: "Caitlin Coyiuto"
		}
	},

	slice90_triangle: {
		experiment: ["jnd_radius"],
		graph_type: ["shapes"],
		trial_structure: ["foundational"],
		balancing: "random",
		display_name: "Slice 90-Degrees, Triangle",
		display_info: {
			description: "Manipulation on the size of various shape combinations. Responses are based on the user's ability to " +
						 "disciminate shape with the greater area.",
			researcher: "Tina Qi",
			developer: "Caitlin Coyiuto"
		}
	},

	shape_estimation: {
		experiment: ["estimation"],
		graph_type: ["shapes"],
		trial_structure: ["estimation"],
		balancing: "random",
		display_name: "Circle, Square, Triangle"
	},

	line_length: {
		experiment: ["estimation"],
		graph_type: ["shapes"],
		trial_structure: ["estimation"],
		balancing: "random",
		display_name: "Line Length"
	},

	rectangle_square: {
		experiment: ["estimation"],
		graph_type: ["shapes"],
		trial_structure: ["estimation"],
		balancing: "random",
		display_name: "Rectangle, Square"
	},

	triangle: {
		experiment: ["estimation"],
		graph_type: ["shapes"],
		trial_structure: ["estimation"],
		balancing: "random",
		display_name: "Triangle"
	},

	rectangle_rotated_square_solid: {
		experiment: ["estimation"],
		graph_type: ["shapes"],
		trial_structure: ["estimation"],
		balancing: "random",
		display_name: "Rectangle Rotated Square Solid"
	},

    rectangle_rotated_square_outline: {
		experiment: ["estimation"],
		graph_type: ["shapes"],
		trial_structure: ["estimation"],
		balancing: "random",
		display_name: "Rectangle Rotated Square Outline"
	},

	square: {
		experiment: ["estimation"],
		graph_type: ["shapes"],
		trial_structure: ["estimation"],
		balancing: "random",
		display_name: "Square"
	},

	line_rotated: {
		experiment: ["estimation"],
		graph_type: ["shapes"],
		trial_structure: ["estimation"],
		balancing: "random",
		display_name: "Line Rotated"
	},

	line_curve: {
		experiment: ["estimation"],
		graph_type: ["shapes"],
		trial_structure: ["estimation"],
		balancing: "random",
		display_name: "Line, Curve"
	},

	triangle_fan: {
		experiment: ["estimation"],
		graph_type: ["shapes"],
		trial_structure: ["estimation"],
		balancing: "random",
		display_name: "Triangle, Fan"
	},

	distractor_blue_shades: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["custom"],
		balancing: "latin_square",
		display_name: "Distractor Blue Shades",
		display_info: {
			description: "Part of series of Distractor Shade experiments for Blue/Red/Yellow. 2-distributions are presented on each graph, one the target and one the distractor population. " + 
						 "Target is always #699938 (green) and distractor population colors will vary across a Blue, Red or Green for a given condition. " + 
						 "Distractor population correlation always set to 0.3. Draws on the first 12 subconditions of Design for base values.",
			researcher: "Tina Qi",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_red_shades: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["custom"],
		balancing: "latin_square",
		display_name: "Distractor Red Shades",
		display_info: {
			description: "Part of series of Distractor Shade experiments for Blue/Red/Yellow. 2-distributions are presented on each graph, one the target and one the distractor population. " + 
						 "Target is always #699938 (green) and distractor population colors will vary across a Blue, Red or Green for a given condition. " + 
						 "Distractor population correlation always set to 0.3. Draws on the first 12 subconditions of Design for base values.",
			researcher: "Tina Qi",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_yellow_shades: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["custom"],
		balancing: "latin_square",
		display_name: "Distractor Yellow Shades",
		display_info: {
			description: "Part of series of Distractor Shade experiments for Blue/Red/Yellow. 2-distributions are presented on each graph, one the target and one the distractor population. " + 
						 "Target is always #699938 (green) and distractor population colors will vary across a Blue, Red or Green for a given condition. " + 
						 "Distractor population correlation always set to 0.3. Draws on the first 12 subconditions of Design for base values.",
			researcher: "Tina Qi",
			developer: "Caitlin Coyiuto"
		}
	},

	distractor_control_shades: {
		experiment: ["jnd", "stevens"],
		graph_type: ["scatter"],
		trial_structure: ["custom"],
		balancing: "latin_square",
		display_name: "Distractor Control Shades",
		display_info: {
			description: "Part of series of Distractor Shade experiments for Blue/Red/Yellow. No distractor population for these presentations, only " + 
						 "the target population with color #699938 (green). Draws on the first 12 subconditions of Design for base values.",
			researcher: "Tina Qi",
			developer: "Caitlin Coyiuto"
		}
	},

};
