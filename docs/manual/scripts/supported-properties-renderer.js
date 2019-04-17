function render_supported_properties(){
	render_experiments_short();
	render_trial_structure();
	render_balancing();
	render_graphing();
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

function render_graphing(){

	$("#graphical-properties").after(`<div id='graphical-properties-tables'></div>`);

	for (let g_key in GRAPH_TYPES) {

		let graph_obj = GRAPH_TYPES[g_key];
		let html = `<h3>${graph_obj.docs.display_name}</h3>`;

		html += `
			<table>
				<thead>
					<tr>
						<th>Attribute Name</th>
						<th>Trial Data Key</th>
						<th>Input Type</th>
						<th>Valid Inputs</th>
						<th>Default Value</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
			`;

		for (let key in GRAPH_TYPES[g_key]["attributes"]) {

			let attribute = GRAPH_TYPES[g_key]["attributes"][key];

			let valid_inputs = attribute.valid_inputs ? stringify_array(attribute.valid_inputs) : "---";

			html += `
				<tr>
					<td>${key}</td>
					<td>${attribute.trial_data_key}</td>
					<td>${attribute.docs.input_type.display_name}</td>
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