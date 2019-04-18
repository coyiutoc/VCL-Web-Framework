function render_conditions(){
	render_conditions_navigation();
	render_conditions_tables();
}


function render_conditions_navigation(){

	let target_li = $("[data-link = 'manual/conditions.html']");
	let li_html = "";

	for (let exp_key in EXPERIMENTS) {
		let exp = EXPERIMENTS[exp_key];

		li_html += `
			<li data-ice="manualNav" class="indent-h2" data-link="manual/conditions.html">
				<a href="manual/conditions.html#${exp.docs.display_name.replace(" ","")}" data-ice="link">${exp.docs.display_name}</a>
			</li>
		`;

	}

	target_li.after(li_html);
}

function render_conditions_tables(){
	
	for (let exp_key in EXPERIMENTS) {

		let exp = EXPERIMENTS[exp_key];

		let html = `
			<h2 id = ${exp.docs.display_name.replace(" ","")}>${exp.docs.display_name}</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Trial Type</th>
						<th>Graph Type(s)</th>
						<th>Balancing</th>
						<th>Description</th>
						<th>Researcher</th>
						<th>Developer</th>
					</tr>
				</thead>
				<tbody>
		`;

		for (let key in CONDITIONS) {

			let condition = CONDITIONS[key];
			if (condition.experiment.includes(exp_key)){
				html += `
					<tr>
						<td>${condition.display_name}</td>
						<td>${stringify_array(condition.trial_structure)}</td>
						<td>${stringify_array(condition.graph_type)}</td>
						<td>${humanize(condition.balancing)}</td>
						<td>${condition.display_info.description}</td>
						<td>${condition.display_info.researcher}</td>
						<td>${condition.display_info.developer}</td>
					</tr>
				`;
			}

		}

		html += `
				</tbody>
			</table>
		`;

		$(".github-markdown").append(html);
	}

}
