var BUFFER = 60;
var RANGE_ADJUSTMENT = 15;

/**
 * D3 code for setting up scatter plot chart area
 *
 * @param {object}   attributes
 */
export function create_scatter_plot(attributes) {

    let target_dataset = attributes["target"]["dataset"];
    let target_properties = attributes["target"]["graph_attributes"];

    let is_distractor = attributes["distractor"] ? true : false;
    let distractor_dataset = is_distractor ? attributes["distractor"]["dataset"] : null;
    let distractor_properties = is_distractor ? attributes["distractor"]["graph_attributes"] : null;

    // Size of the graph
    let height = window.innerHeight * 0.65;
    let width = height/2;

    // Create scales:
    // ** D3 creates a function that takes in input between [0, 100] and 
    //    outputs between [0, width].
    //    Basically, domain = input, range = ouput. 
    let xscale = d3.scaleLinear()
                   .domain([0, 1]) 
                   .range([0, width - RANGE_ADJUSTMENT]); 

    let yscale = d3.scaleLinear()
                   .domain([-1, 0]) // !!! NOTE: this is the hack b/c we flipped the y-values 
                                    //     to be negative --> graph is now positive correlation
                                    //     but on 4th quadrant --> force domain to be from 
                                    //     [-1, 0] to move it to 1st quadrant 
                   .range([height/2, 0 + RANGE_ADJUSTMENT]);

    // Create axes: 
    let x_axis = d3.axisBottom()
                   .scale(xscale)
                   .tickSize([0]);

    let y_axis = d3.axisLeft()
                   .scale(yscale)
                   .tickSize([0]);

    // Append SVG into graph div
    let chart = d3.select("#graph")
                  .append("svg") 
                    .attr("width", width + BUFFER)
                    .attr("height", height)
                    .attr("style", `margin-right: ${width/2}; margin-top: 25vh; margin-left: ${BUFFER}`);
                    
    // Creating transform SVG elements + append to SVG: 
    let yAxisElements = chart.append("g")
                             .attr("transform", "translate(50, 10)")
                             .call(y_axis);

    let xAxisTranslate = height/2 + 10;

    let xAxisElements = chart.append("g")
                              .attr("transform", "translate(50, " + xAxisTranslate  +")")
                              .call(x_axis)
         
    // TODO: Different handling for distractor - needs to be abstracted out somehow in future     
    if (is_distractor){ 
      
      // If dist point color is WHITE, only plot the targets 
      if (distractor_properties["point_color"] === "WHITE") {
        plot_scatter_points(chart, xscale, yscale, target_dataset, target_properties["point_size"], target_properties["point_color"], target_properties["point_shape"]);        
      } 
      else {
        // Alternate plotting of distractor and main dataset points - want equal chance of one
        // getting occluded over the other
        for (let j in target_dataset) {

          let point = target_dataset[j];
          let dist_point = distractor_dataset[j];

          // Distractor point
          plot_scatter_points(chart, xscale, yscale, [point], target_properties["point_size"], target_properties["point_color"], target_properties["point_shape"]);  

          // Target point    
          plot_scatter_points(chart, xscale, yscale, [dist_point], distractor_properties["point_size"], distractor_properties["point_color"], distractor_properties["point_shape"]);
        }
      }

    } else {
        plot_scatter_points(chart, xscale, yscale, target_dataset, target_properties["point_size"], target_properties["point_color"], target_properties["point_shape"]);        
    }     

    // Set axis color
    chart.selectAll("path")
         .attr("stroke", target_properties["axis_color"]);

    // Remove tick labels
    chart.selectAll("text").remove();     

}

/**
 * D3 code for appending data to the graph depending on point shape type.
 *
 * @param {object}   chart
 * @param {function} xscale
 * @param {function} yscale
 * @param {array}    data ([x_value, y_value])
 * @param {integer}  point_size
 * @param {string}   point_color
 * @param {string}   point_shape
 */
function plot_scatter_points(chart, xscale, yscale, data, point_size, point_color, point_shape) {

  switch(point_shape){
    case "square":
      chart.selectAll("square_data")
                 .data(data)
                  .enter()
                  .append("rect") 
                  .attr("x", function (d){
                    return xscale(d[0]) + BUFFER;
                  })
                  .attr("y", function (d){
                    return yscale(d[1]);
                  })
                  .attr("width", point_size)
                  .attr("height", point_size)
                  .style('fill', point_color);
      break;

    case "diamond":
      chart.selectAll("square_data")
                 .data(data)
                  .enter()
                  .append("rect") 
                  .attr("x", function (d){
                    return xscale(d[0]) + BUFFER;
                  })
                  .attr("y", function (d){
                    return yscale(d[1]);
                  })
                  .attr("width", point_size)
                  .attr("height", point_size)
                  .style('fill', point_color)
                  .attr('transform', function(d){
                    // Adapted from: https://stackoverflow.com/questions/44817414/rotate-svg-in-place-using-d3-js
                    var x1 = xscale(d[0]) + BUFFER + point_size/2; //the center x about which you want to rotate
                    var y1 = yscale(d[1]) + point_size/2; //the center y about which you want to rotate

                    return `rotate(45, ${x1}, ${y1})`; //rotate 180 degrees about x and y
                }); 
      break;

    case "circle":
      chart.selectAll("circle_data")
                 .data(data)
                  .enter()
                  .append("circle") // Creating the circles for each entry in data set 
                  .attr("cx", function (d) { // d is a subarray of the dataset i.e coordinates [5, 20]
                    return xscale(d[0]) + BUFFER; // +60 is for buffer (points going -x, even if they are positive)
                  })
                  .attr("cy", function (d) {
                    return yscale(d[1]);
                  })
                  .attr("r", point_size).style("fill", point_color);
      break;
  }
}
