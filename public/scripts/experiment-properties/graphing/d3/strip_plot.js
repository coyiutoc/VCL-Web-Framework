/**
 * D3 code for plotting a strip plot.
 *
 * @param {object}   attributes
 */
export function create_strip_plot(attributes) {

	let target_dataset = attributes["target"]["dataset"];
    let target_properties = attributes["target"]["graph_attributes"];

    let width = window.innerWidth * 0.8;
    let height = window.innerHeight * 0.3;
    
    // Scale for data slightly smaller than full width of axes to account for outliers.
    let xscale_for_data = d3.scaleLinear()
                   .domain([0, 1]) 
                   .range([window.innerWidth * 0.05, window.innerWidth * 0.75]);

    let xscale = d3.scaleLinear()
                   .domain([0, 1]) 
                   .range([0, width]);

    let yscale = d3.scaleLinear()
                   .domain([-1, 0])
                   .range([height/2, 0]);

    // Create axes: 
    let x_axis = d3.axisBottom()
                   .scale(xscale)
                   .tickSize([0]);

    let y_axis = d3.axisLeft()
                   .scale(yscale)
                   .tickSize([0]);

	let chart = d3.select("#graph") // Insert into the div w/ id = "graph"
	            .append("svg") 
	              .attr("width", width) 
	              .attr("height", height)
	              .attr("transform", "scale(-1,1)"); // Flip horizontally so cone is
	                                                 // is going left -> right (like orig. version)  

	let xAxisTranslate = height/2;
	let xAxisElements = chart.append("g")
	                        .attr("transform", "translate(0, " + xAxisTranslate  +")")
	                        .call(x_axis)

	// Populating data: 
	chart.selectAll("strip")
	     .data(target_dataset)
	      .enter()
	      .append("rect")
	      .attr("x", function (d) {
	        return xscale_for_data(d[0]);
	      })
	      .attr("transform", function (d) {

	        if (target_properties["fixed_strip_height"]) {
	          return "translate(0, " + height/4 + ")";
	        } else {
	          let ytranslation = height/2 - (yscale(d[1]) * 0.5);
	          return "translate(0, " + ytranslation + ")";
	        }

	      })
	      .style("width", function () {
	          return target_properties["strip_width"];
	      })
	      .style("height", function (d) {

	        if (target_properties["fixed_strip_height"]) {
	          return height/2;
	        } else {
	          return yscale(d[1]);
	      	}

	      })
	      .attr("fill", target_properties["fill_color"]);

	// Set axis color
	chart.selectAll("path")
	   .attr("stroke", target_properties["axis_color"]);

	// Remove tick labels
	chart.selectAll("text").remove();     

}