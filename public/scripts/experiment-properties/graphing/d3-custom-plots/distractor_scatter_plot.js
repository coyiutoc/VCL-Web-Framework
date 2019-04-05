import {plot_scatter_points} from "/scripts/experiment-properties/graphing/d3-base-plots/scatter_plot.js";
export {create_distractor_scatter_plot};

var BUFFER = 60;
var RANGE_ADJUSTMENT = 15;

/**
 * D3 code for setting up scatter plot chart area with distractor dataset (so two-populations per graph)
 *
 * @param {object}   attributes
 */
function create_distractor_scatter_plot(attributes) {

    let target_dataset = attributes["target"]["dataset"];
    let target_properties = attributes["target"]["graph_attributes"];

    let distractor_dataset = attributes["distractor"]["dataset"];
    let distractor_properties = attributes["distractor"]["graph_attributes"];

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

    // If dist point color is WHITE, only plot the targets 
    if (distractor_properties["point_color"] === "WHITE") {
      plot_scatter_points(chart, xscale, yscale, target_dataset, target_properties["point_size"], target_properties["point_color"], target_properties["point_shape"]);        
    } 
    else {

      let larger_data;
      let smaller_data;

      // Handle if the number of points between distractor & target are unequal
      if (attributes["target"]["dataset"].length > attributes["distractor"]["dataset"].length) {
        larger_data = attributes["target"];
        smaller_data = attributes["distractor"];
      } else {
        larger_data = attributes["distractor"];
        smaller_data = attributes["target"];
      }

      // Alternate plotting of distractor and main dataset points - want equal chance of one
      // getting occluded over the other
      for (let j in larger_data["dataset"]) {

        if ( j < smaller_data["dataset"].length){
          let small_point = smaller_data["dataset"][j];
          plot_scatter_points(chart, xscale, yscale, [small_point], smaller_data["graph_attributes"]["point_size"], smaller_data["graph_attributes"]["point_color"], smaller_data["graph_attributes"]["point_shape"]);
        }

        let large_point = larger_data["dataset"][j];
        plot_scatter_points(chart, xscale, yscale, [large_point], larger_data["graph_attributes"]["point_size"], larger_data["graph_attributes"]["point_color"], larger_data["graph_attributes"]["point_shape"]);  
       
      }
    }

    // Set axis color
    chart.selectAll("path")
         .attr("stroke", target_properties["axis_color"]);

    // Remove tick labels
    chart.selectAll("text").remove();     

}
