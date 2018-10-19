import * as React from 'react';
import * as d3 from 'd3';

import { MULTIPLIER } from '../../constants';
import { prepare_coordinates } from '../../scripts/helpers/experiment_helpers';

export default class JNDTrialDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasMounted: false,
            showJndExperiment: false,
            showStevensExperiment: false
        };
    }

    /**
     * Performs the necessary D3 operations to plot distributions depending on graph type.
     */
    plot_distributions() {
        let { leftCoordinates, rightCoordinates, distributionSize, graphType, trialData, distractorCoordinates } = this.props;
        var left_dataset = prepare_coordinates(leftCoordinates, distributionSize);
        var right_dataset = prepare_coordinates(rightCoordinates, distributionSize);

        var datasets = [left_dataset, right_dataset];
        var distractors = [];
    
        if (distractorCoordinates != null)
        {
            left_dataset = prepare_coordinates(distractorCoordinates[0], distributionSize);
            right_dataset = prepare_coordinates(distractorCoordinates[1], distributionSize);
    
            distractors = [left_dataset, right_dataset];
        }

        switch (graphType) {
            case "scatter":
                this.plot_scatter(datasets, trialData, distractors);
                break;
            case "strip":
                this.plot_strip(datasets, trialData);
                break;
        }
    }

    /**
     * D3 code for appending data into the graph. 
     */
    plot_scatter_data(chart, xscale, yscale, data, point_size, point_color) {
        chart.selectAll("circle_data")
                .data(data)
                    .enter()
                    .append("circle") // Creating the circles for each entry in data set 
                    .attr("cx", function (d) { // d is a subarray of the dataset i.e coordinates [5, 20]
                        return xscale(d[0]) + 60; // +60 is for buffer (points going -x, even if they are positive)
                    })
                    .attr("cy", function (d) {
                        return yscale(d[1]);
                    })
                    .attr("r", point_size).style("fill", point_color);
    }

    /**
     * Plots distributions using scatter plots. 
     *
     * @ param  datasets   {array}
     * @ param  trial_data    {array}
     * @ param  distractors
     */
    plot_scatter(datasets, trial_data, distractors) {
        var height = window.innerHeight/1.5; 
        var width = height/2;
    
        var buffer = d3.select("#graph") // Insert into the div w/ id = "graph"
                       .append("svg") 
                          .attr("width", height) 
                          .attr("height", width)
                          .style("display", "block");
    
        // Create scales:
        // ** D3 creates a function that takes in input between [0, 100] and 
        //    outputs between [0, width].
        //    Basically, domain = input, range = ouput. 
        var xscale = d3.scaleLinear()
                       .domain([0, MULTIPLIER]) 
                       .range([0, width]);
    
        var yscale = d3.scaleLinear()
                       .domain([MULTIPLIER * -1, 0]) // !!! NOTE: this is the hack b/c we flipped the y-values 
                                                     //     to be negative --> graph is now positive correlation
                                                     //     but on 4th quadrant --> force domain to be from 
                                                     //     [-1, 0] to move it to 1st quadrant 
                       .range([height/2, 0]);
    
        // Create axes: 
        var x_axis = d3.axisBottom()
                       .scale(xscale)
                       .tickSize([0]);
    
        var y_axis = d3.axisLeft()
                       .scale(yscale)
                       .tickSize([0]);
    
        // Create/append the SVG for both graphs: 
        for (let i in datasets){
          var chart = d3.select("#graph") // Insert into the div w/ id = "graph"
                        .append("svg") 
                          .attr("width", width + 60) // Width and height of the SVG viewpoint
                          .attr("height", height)   // +40 is for buffer (points going -x)
                          .attr("style", "margin-right: " + width/2);
    
          // Creating transform SVG elements + append to SVG: 
          var yAxisElements = chart.append("g")
                                   .attr("transform", "translate(50, 10)")
                                   //.attr("transform", "translate(50, " + height/2 + ")")
                                   .call(y_axis);
    
          var xAxisTranslate = height/2 + 10;
          //var xAxisTranslate = height - 1;
          var xAxisElements = chart.append("g")
                                    .attr("transform", "translate(50, " + xAxisTranslate  +")")
                                    .call(x_axis)
               
          // TODO: Different handling for distractor - needs to be abstracted out somehow in future     
          if (distractors && distractors.length > 0)
          { 
            let dataset = datasets[i];
            let distractor = distractors[i];
    
            // Alternate plotting of distractor and main dataset points - want equal chance of one
            // getting occluded over the other
            for (let j in dataset) {
    
              let point = dataset[j];
              let dist_point = distractor[j];
    
              // Distractor point
              this.plot_scatter_data(chart, xscale, yscale, [point], trial_data.point_size, trial_data.point_color);  
    
              // Target point    
              this.plot_scatter_data(chart, xscale, yscale, [dist_point], trial_data.dist_point_size, trial_data.dist_color);
    
            }
          } else {
              this.plot_scatter_data(chart, xscale, yscale, datasets[i], trial_data.point_size, trial_data.point_color);        
          }     
    
          // Set axis color
          chart.selectAll("path")
               .attr("stroke", trial_data.axis_color);
    
          // Remove tick labels
          chart.selectAll("text").remove();     
    
        }
    
        // Set background color
        document.body.style.backgroundColor = trial_data.background_color;
    }

    /**
     * Plots distributions using strip plots. 
     *
     * @ param  datasets   {array}
     */
    plot_strip(datasets, trial_data) {

        var width = window.innerWidth * 0.7;
        var height = window.innerHeight * 0.5;

        var xscale = d3.scaleLinear()
            .domain([0, MULTIPLIER])
            .range([0, width]);

        var yscale = d3.scaleLinear()
            .domain([MULTIPLIER * -1, 0])
            .range([height / 2, 0]);

        // Create axes: 
        var x_axis = d3.axisBottom()
            .scale(xscale)
            .tickSize([0]);

        var y_axis = d3.axisLeft()
            .scale(yscale)
            .tickSize([0]);

        // Create/append the SVG for both graphs: 
        for (var data of datasets) {

            var chart = d3.select("#graph") // Insert into the div w/ id = "graph"
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            var xAxisTranslate = height / 2;
            var xAxisElements = chart.append("g")
                .attr("transform", "translate(50, " + xAxisTranslate + ")")
                .call(x_axis)

            // Populating data: 
            chart.selectAll("strip") // Technically no circles inside div yet, but will be creating it
                .data(data)
                .enter()
                .append("rect") // Creating the circles for each entry in data set 
                .attr("x", function (d) {
                    return xscale(d[0]);
                })
                .attr("transform", "translate(50, " + height / 4 + ")")
                .style("width", 2)
                .style("height", height / 2);

            // Set axis color
            chart.selectAll("path")
                .attr("stroke", trial_data.axis_color);

            // Remove tick labels
            chart.selectAll("text").remove();

        }

        // Set background color
        document.body.style.backgroundColor = trial_data.background_color;
    }

    render() {
        // poor man's componentDidMount
        let { hasMounted } = this.state;

        if (!hasMounted) {
            setTimeout(this.plot_distributions.bind(this), 500);
            this.setState({
                hasMounted: true
            });
        }

        return (
            <div align="center">
                <div>This is the JND Trial display!</div>
                <div id="graph" />
            </div>
        );
    }
}
