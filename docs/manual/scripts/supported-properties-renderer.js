function render_supported_properties(){
	render_experiments_short();
	render_trial_structure();
	render_balancing();
	render_graph_types();
	render_exp_attributes();
	render_graph_attributes();
}

function render_experiments_short(){
	
	let html = `
			<table>
				<thead>
					<tr>
						<th>Base</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
			`;

	for (let exp_key in EXPERIMENTS) {

		let exp = EXPERIMENTS[exp_key];

			html += `
				<tr>
					<td>${exp.docs.display_name}</td>
					<td>${exp.docs.description}</td>
				</tr>
			`;

		}

	html += `
			</tbody>
			</table>
			`;

	$("#base-experiment").after(html);
}

function render_trial_structure(){
	
	let html = `
			<table>
				<thead>
					<tr>
						<th>Trial Structure</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
			`;

	for (let key in TRIAL_STRUCTURES) {

		let struct = TRIAL_STRUCTURES[key];

			html += `
				<tr>
					<td>${struct.docs.display_name}</td>
					<td>${struct.docs.description}</td>
				</tr>
			`;

		}

	html += `
			</tbody>
			</table>
			`;

	$("#trial-structure").after(html);
}

function render_balancing(){
	
	let html = `
			<table>
				<thead>
					<tr>
						<th>Balancing Type</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
			`;

	for (let key in BALANCING_TYPES) {

		let balancing = BALANCING_TYPES[key];

			html += `
				<tr>
					<td>${balancing.docs.display_name}</td>
					<td>${balancing.docs.description}</td>
				</tr>
			`;

		}

	html += `
			</tbody>
			</table>
			`;

	$("#balancing").after(html);
}

function render_graph_types(){

	let html = `
			<table>
				<thead>
					<tr>
						<th>Graph Type</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
			`;

	for (let key in GRAPH_TYPES) {

		let graph = GRAPH_TYPES[key];

			html += `
				<tr>
					<td>${graph.docs.display_name}</td>
					<td>${graph.docs.description}</td>
				</tr>
			`;

		}

	html += `
			</tbody>
			</table>
			`;

	$("#graph-types").after(html);
}

function render_exp_attributes(){

	$("#experimental-attributes").after(`<div id='experimental-properties-tables'></div>`);

	for (let e_key in EXPERIMENTS) {

		let exp_obj = EXPERIMENTS[e_key];
		let html = `<h4>${exp_obj.docs.display_name}</h4>`;

		html += `
			<table>
				<thead>
					<tr>
						<th>Required for Experiment?</th>
						<th>Attribute Name</th>
						<th>Input Type</th>
						<th>Supported Inputs</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
			`;

		for (let key in EXPERIMENTS[e_key]["attributes"]) {

			let attribute = EXPERIMENTS[e_key]["attributes"][key];

			let valid_inputs = attribute.valid_inputs ? stringify_array(attribute.valid_inputs) : "N/A";
			
			html += `
				<tr>
					<td><span class="label ${attribute.required}""> ${attribute.required} </span></td>
					<td>${key}</td>
					<td><span class="label ${attribute.docs.input_type.bootstrap_label}">${attribute.docs.input_type.display_name}</span></td>
					<td>${valid_inputs}</td>
					<td>${attribute.docs.desc}</td>
				</tr>
			`;

		}

		html += `
			</tbody>
			</table>
			`;

		$("#experimental-properties-tables").append(html);
	}
}

function render_graph_attributes(){

	$("#graphical-attributes").after(`<div id='graphical-properties-tables'></div>`);

	for (let g_key in GRAPH_TYPES) {

		let graph_obj = GRAPH_TYPES[g_key];
		let html = `<h4>${graph_obj.docs.display_name}</h4>`;

		html += `
			<table>
				<thead>
					<tr>
						<th>Attribute Name</th>
						<th>Input Type</th>
						<th>Supported Inputs</th>
						<th>Default Value</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
			`;

		for (let key in GRAPH_TYPES[g_key]["attributes"]) {

			let attribute = GRAPH_TYPES[g_key]["attributes"][key];

			let valid_inputs = attribute.valid_inputs ? stringify_array(attribute.valid_inputs) : "N/A";

			html += `
				<tr>
					<td>${key}</td>
					<td><span class="label ${attribute.docs.input_type.bootstrap_label}">${attribute.docs.input_type.display_name}</span></td>
					<td>${valid_inputs}</td>
					<td>${attribute.default}</td>
					<td>${attribute.docs.desc}</td>
				</tr>
			`;

		}

		html += `
			</tbody>
			</table>
			`;

		$("#graphical-properties-tables").append(html);
	}
}
