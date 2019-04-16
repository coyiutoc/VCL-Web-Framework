var EXPERIMENTS = {

	jnd : {
		trial_structure: ["foundational", "design", "custom"],
		graph_type: ["scatter", "strip", "ring"],
		balancing_type: ["random", "latin_square"],
		docs: {
			display_name: "JND",
			description: "The JND experiment essentially presents users with 2 plots, one with a higher correlation than the other. " + 
						 "The user then must choose the graph with the higher correlation by pressing the 'z' or 'm' keys to select " + 
						 "the left or right graphs respectively.",
			spec: "./docs/manual/jnd.md"
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
			spec: "./docs/manual/jnd_radius.md"
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
			spec: "./docs/manual/stevens.md"
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
			spec: "./docs/manual/estimation.md"
		}
	}
};
