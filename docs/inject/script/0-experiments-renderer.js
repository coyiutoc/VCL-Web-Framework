function render_experiments(){
	
	let html = `
			<table>
				<thead>
					<tr>
						<th>Experiment</th>
						<th>Trial Structure(s)</th>
						<th>Graph Type(s)</th>
						<th>Balancing</th>
						<th>Description</th>
						<th>Developer</th>
					</tr>
				</thead>
				<tbody>
			`;

	for (let exp_key in EXPERIMENTS) {

		let exp = EXPERIMENTS[exp_key];

			html += `
				<tr>
					<td>${exp.docs.display_name}</td>
					<td>${stringify_array(exp.trial_structure)}</td>
					<td>${stringify_array(exp.graph_type)}</td>
					<td>${stringify_array(exp.balancing_type)}</td>
					<td>${exp.docs.description}</td>
					<td>${exp.docs.developer}</td>
				</tr>
			`;

		}

	html += `
			</tbody>
			</table>
			`;

	$(".github-markdown").append(html);
}
