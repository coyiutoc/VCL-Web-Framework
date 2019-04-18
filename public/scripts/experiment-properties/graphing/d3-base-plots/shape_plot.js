export {create_shape_plot};

/**
 * D3 code for setting up shape plot chart area
 *
 * @param {object}   attributes
 */
function create_shape_plot(attributes) {

  let radius = attributes["curr_radius"];
  let max_radius = attributes["max_radius"];
  let min_radius = attributes["min_radius"];
  let properties = attributes["graph_attributes"];

  let diff = max_radius - min_radius;

  // SVG dimensions
  let height = max_radius*2; 
  let width = max_radius*2;

  // Margin calculations
  let width_diff = (1/4)*window.innerWidth - max_radius;

  let margin_top;

  // Firefox check (doesn't handle JsPsych formatting well)
  if (typeof InstallTrigger !== 'undefined') {
    let margin_top = window.innerHeight/2 - max_radius;
  } else {
    let margin_top = 0;
  }

  var chart = d3.select("#graph") 
                 .append("svg") 
                  .attr("width", width) 
                  .attr("height", height)
                  .attr("style", `margin-right: ${width_diff}; margin-left: ${width_diff}; margin-top: ${margin_top}`);

  // var GRAPH_TYPES comes from /config/graphing-config.js
  if (!GRAPH_TYPES["shapes"]["attributes"]["shapes"]["valid_inputs"].includes(properties["shapes"])){
    throw Error(" " + shape_type + " is not a valid shape for graph type shapes.");
  }

  // Plot depending on shape specified
  switch (properties["shapes"]){
    
    case "slice":
      let degrees = properties["slice_rotation"];
      plot_slice(chart, radius, degrees, max_radius, diff, properties);
      break;

    case "square":
      plot_square(chart, radius, max_radius, diff, properties);
      break;

    case "rotSquare":
      plot_rotated_square(chart, radius, max_radius, diff, properties);
      break;

    case "triangle":
      plot_triangle(chart, radius, max_radius, diff, properties);
      break;

    case "rotTriangle":
      plot_rotated_triangle(chart, radius, max_radius, diff, properties);
      break;

    default:
      plot_circle(chart, radius, max_radius, diff, properties);
      break;
  }

}

/**
 * D3 code for plotting a circle.
 *
 * @param  chart      {svg object}
 *         radius     {double} 
 *         max_radius {double}     Largest radius of the given trial
 *         diff       {double}     Difference between max and min radius of given trial        
 */ 
function plot_circle(chart, radius, max_radius, diff, properties) {

  let translation = radius;

  // If radius is the smaller one, need to adjust translation
  if (radius !== max_radius) {
    translation += diff;
  }

  // Move the origin to center of SVG
  let g = chart.append("g")
               .attr("transform", "translate(" + translation + "," + translation + ")");

  // Generate the pie
  let pie = d3.pie();

  // Generate the arcs
  let arc = d3.arc()
              .innerRadius(0)
              .outerRadius(radius/2);

  // Represents the % that each slice takes up - so this is a pie with 4 "parts".
  let data = [25, 25, 25, 25];
  
  // Generate groups
  let arcs = g.selectAll("arc")
              .data(pie(data))
              .enter()
              .append("g")
              .attr("class", "arc")

  // Draw arc paths
  arcs.append("path")
      .attr("fill", function(d, i) {
        return properties["fill_color"];
      })
      .attr("stroke", function(d, i) {
        return properties["stroke_color"];
      })
      .attr("d", arc);
}

/**
 * D3 code for plotting a slice (1/4 of circle).
 *      
 * @param  chart      {svg object}
 *         radius     {double} 
 *         rotation   {int}        Degrees of rotation in the counterclockwise direction.        
 *         max_radius {double}     Largest radius of the given trial
 *         diff       {double}     Difference between max and min radius of given trial  
 *         properties {object}     Graph attributes extracted from constants
 */ 
function plot_slice(chart, radius, rotation, max_radius, diff, properties) {

  let translation = 0;

  // If radius is the smaller one, need to adjust translation
  if (radius !== max_radius) {
    translation = 0.5*diff;
  }

  // Move the origin to center of SVG
  let g = chart.append("g")
               .attr("transform", function() {
                 if (rotation === 0) {
                   return "translate(" + (max_radius/2 + translation) + "," + (1.5*radius + translation) + ")";
                 } 
                 else if (rotation === 90) {
                   return "translate(" + (max_radius*1.5 + translation) + "," + (1.5*radius + translation) + ")";
                 }
                 // This is assuming the object is centered
                 else {
                   return "translate(" + (max_radius + translation) + "," + (1.5*radius + translation) + ")";
                 }
               });

  // Generate the pie
  let pie = d3.pie();

  // Generate the arcs
  let arc = d3.arc()
              .innerRadius(0)
              .outerRadius(radius);

  // Represents the % that each slice takes up - so this is a pie with 4 "parts".
  let data = [25, 25, 25, 25];
  
  // Generate groups
  let arcs = g.selectAll("arc")
              .data(pie(data))
              .enter()
              .append("g")
              .attr("class", "arc")

  arcs.append("path")
      .attr("fill", function(d, i) {
          if (i === 0) {
              return properties["fill_color"];
          } else {
              return "#ffffff";
          }    
      })
      .attr("stroke", function(d, i) {
        return properties["stroke_color"];
      })
      .attr("d", arc)
      .attr("transform", "rotate(" + (-1)*rotation + ")");
}

/**
 * D3 code for plotting a square.
 *
 * @param  chart      {svg object}
 *         radius     {double} 
 *         max_radius {double}     Largest radius of the given trial
 *         diff       {double}     Difference between max and min radius of given trial  
 *         properties {object}     Graph attributes extracted from constants       
 */ 
function plot_square(chart, radius, max_radius, diff, properties) {

  let translation = 0.5*max_radius;

  // If radius is the smaller one, need to adjust translation
  if (radius !== max_radius) {
    translation = 0.5*max_radius + 0.5*diff;
  }

  let g = chart.append("g");

  let rect = g.append("rect")
                 .attr("x", 0)
                 .attr("y", 0)
                 .attr("width", radius)
                 .attr("height", radius)
                 .attr("fill", properties["fill_color"])
                 .attr("stroke", properties["stroke_color"])
                 .attr("transform", "translate(" + translation + "," + translation + ")");
}

/**
 * D3 code for plotting a rotated square AKA diamond.
 *
 * @param  chart      {svg object}
 *         radius     {double} 
 *         max_radius {double}     Largest radius of the given trial
 *         diff       {double}     Difference between max and min radius of given trial   
 *         properties {object}     Graph attributes extracted from constants     
 */ 
function plot_rotated_square(chart, radius, max_radius, diff, properties) {

  let xtranslation = radius;
  let ytranslation = 0.25*radius;

  // If radius is the smaller one, need to adjust translation
  if (radius !== max_radius) {
    xtranslation += 0.5*diff;
    ytranslation += diff;
  }

  let g = chart.append("g");
            
  let rect = g.append("rect")
                 .attr("x", 0)
                 .attr("y", 0)
                 .attr("width", radius)
                 .attr("height", radius)
                 .attr("fill", properties["fill_color"])
                 .attr("stroke", properties["stroke_color"])
                 .attr("transform", "translate(" + xtranslation + "," + ytranslation + ") rotate(45)");
}

/**
 * D3 code for plotting a triangle.
 *
 * @param  chart      {svg object}
 *         radius     {double} 
 *         max_radius {double}     Largest radius of the given trial
 *         diff       {double}     Difference between max and min radius of given trial   
 *         properties {object}     Graph attributes extracted from constants     
 */ 
function plot_triangle(chart, radius, max_radius, diff, properties) {

  let translation = 0;

  // If radius is the smaller one, need to shift by the 0.5*diff
  if (radius !== max_radius) {
    translation = diff;
  }

  let poly = [{"x":(0.5*radius + translation), "y":(0.5*radius + translation)},
              {"x":(0.5*radius + translation), "y":(1.5*radius + translation)},
              {"x":(1.5*radius + translation), "y":(1.5*radius + translation)}];

  chart.selectAll("polygon")
       .data([poly])
       .enter().append("polygon")
       .attr("points",function(d) { 
          return d.map(function(d) { return [d.x, d.y].join(","); }).join(" ");})
       .attr("fill", properties["fill_color"])
       .attr("stroke", properties["stroke_color"]);
}

/**
 * D3 code for plotting a rotated triangle.
 *
 * @param  chart      {svg object}
 *         radius     {double} 
 *         max_radius {double}     Largest radius of the given trial
 *         diff       {double}     Difference between max and min radius of given trial 
 *         properties {object}     Graph attributes extracted from constants       
 */ 
function plot_rotated_triangle(chart, radius, max_radius, diff, properties) {

  let translation = 0;

  // If radius is the smaller one, need to shift by the 0.5*diff
  if (radius !== max_radius) {
    translation = diff;
  }

  let poly = [{"x":(1.5*radius + translation), "y":(0.5*radius + translation)},
              {"x":(0.5*radius + translation), "y":(radius + translation)},
              {"x":(1.5*radius + translation), "y":(1.5*radius + translation)}];

  chart.selectAll("polygon")
       .data([poly])
       .enter().append("polygon")
       .attr("points",function(d) { 
          return d.map(function(d) { return [d.x, d.y].join(","); }).join(" ");})
       .attr("fill", properties["fill_color"])
       .attr("stroke", properties["stroke_color"]);      
}
