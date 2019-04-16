var EXPERIMENTS = {

	jnd : {
		trial_structure: ["foundational", "design", "custom"],
		graph_type: ["scatter", "strip", "ring"],
		balancing_type: ["random", "latin_square"],
		docs: {
			display_name: "JND",
			spec: "./docs/manual/jnd.md"
		}
	},

	jnd_radius : {
		trial_structure: ["foundational"],
		graph_type: ["shapes"],
		balancing_type: ["random"],
		docs: {
			display_name: "JND Radius",
			spec: "./docs/manual/jnd_radius.md"
		}
	},

	stevens : {
		trial_structure: ["foundational", "design", "custom"],
		graph_type: ["scatter", "strip", "ring"],
		balancing_type: ["latin_square"],
		docs: {
			display_name: "Stevens",
			spec: "./docs/manual/stevens.md"
		}
	},

	estimation: {
		trial_structure: ["estimation"],
		graph_type: ["shapes"],
		balancing_type: ["random"],
		docs: {
			display_name: "Estimation",
			spec: "./docs/manual/estimation.md"
		}
	}
};
