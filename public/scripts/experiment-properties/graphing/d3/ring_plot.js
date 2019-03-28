/**
 * D3 code for plotting a ring plot.
 *
 * @param {object}   attributes
 */
export function create_ring_plot(attributes) {

  let target_dataset = attributes["target"]["dataset"];
  let target_properties = attributes["target"]["graph_attributes"];

  let width = window.innerWidth * 0.8;
  let height = window.innerHeight * 0.3;

  // Scale for data slightly smaller than full width of axes to account for outliers.
  var xscale_for_data = d3.scaleLinear()
                 .domain([0, 1]) 
                 .range([window.innerWidth * 0.10, window.innerWidth * 0.70]);

  var xscale = d3.scaleLinear()
                 .domain([0, 1])
                 .range([0, width]);

  var yscale = d3.scaleLinear()
                 .domain([-1, 0])
                 .range([height/2, 0]);

  // Create axes: 
  var x_axis = d3.axisBottom()
                 .scale(xscale)
                 .tickSize([0]);

  var y_axis = d3.axisLeft()
                 .scale(yscale)
                 .tickSize([0]);
    
  var chart = d3.select("#graph") // Insert into the div w/ id = "graph"
                .append("svg") 
                  .attr("width", width) 
                  .attr("height", height)
                  .attr("transform", "scale(-1,1)"); // Flip horizontally so cone is
                                                     // is going left -> right (like orig. version)  

  var xAxisTranslate = height/2;
  var xAxisElements = chart.append("g")
                            .attr("transform", "translate(0, " + xAxisTranslate  +")")
                            .call(x_axis);

  // Populating data: 
  chart.selectAll("ring") // Technically no circles inside div yet, but will be creating it
        .data(target_dataset)
          .enter()
            .append("circle") // Creating the circles for each entry in data set 
            .attr("cx", function (d) { // d is a subarray of the dataset i.e coordinates [5, 20]
              return xscale_for_data(d[0]);
            })
            .attr("cy", function (d) {
              return height/2;
            })
            .attr("r", function (d) {
              return yscale(d[1]);
            })
            .attr("stroke", target_properties["stroke_color"])
            .attr("stroke-width", target_properties["ring_thickness"])
            .attr("fill", target_properties["fill_color"]);

  // Set axis color
  chart.selectAll("path")
       .attr("stroke", target_properties["axis_color"]);

  // Remove tick labels
  chart.selectAll("text").remove();     

}