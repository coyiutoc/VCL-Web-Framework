export {JND_RADIUS_BASE, JND_RADIUS_CONDITIONS};

const JND_RADIUS_BASE = {

  foundational:
    [
    {base_radius: 2, initial_difference: 0.586, converge_from_above: true, text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', stroke_color: 'none', fill_color: 'BLUE'},

    {base_radius: 3, initial_difference: 0.879, converge_from_above: true, text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', stroke_color: 'none', fill_color: 'BLUE'},

    {base_radius: 4, initial_difference: 1.172, converge_from_above: true, text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', stroke_color: 'none', fill_color: 'BLUE'},

    {base_radius: 5, initial_difference: 1.464, converge_from_above: true, text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', stroke_color: 'none', fill_color: 'BLUE'},

    {base_radius: 6, initial_difference: 1.757, converge_from_above: true, text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', stroke_color: 'none', fill_color: 'BLUE'}
    ] 
}

const JND_RADIUS_CONDITIONS = {

  circle_square:
  	[
    {shapes: ["circle", "square"], stroke_color: "BLUE"},

    {shapes: ["circle", "square"], stroke_color: "BLUE"},

    {shapes: ["circle", "square"], stroke_color: "BLUE"},

    {shapes: ["circle", "square"], stroke_color: "BLUE"},

    {shapes: ["circle", "square"], stroke_color: "BLUE"}
  	],

  circle_triangle:
  	[
  	{shapes: ["circle", "triangle"], stroke_color: "BLUE"},

    {shapes: ["circle", "triangle"], stroke_color: "BLUE"},

    {shapes: ["circle", "triangle"], stroke_color: "BLUE"},

    {shapes: ["circle", "triangle"], stroke_color: "BLUE"},

    {shapes: ["circle", "triangle"], stroke_color: "BLUE"}
  	],

  square_triangle:
    [
    {shapes: ["square", "triangle"], stroke_color: "BLUE"},

    {shapes: ["square", "triangle"], stroke_color: "BLUE"},

    {shapes: ["square", "triangle"], stroke_color: "BLUE"},

    {shapes: ["square", "triangle"], stroke_color: "BLUE"},

    {shapes: ["square", "triangle"], stroke_color: "BLUE"}
    ], 

  rotSquare_rotTriangle:
    [
    {shapes: ["rotSquare", "rotTriangle"], stroke_color: "BLUE"},

    {shapes: ["rotSquare", "rotTriangle"], stroke_color: "BLUE"},

    {shapes: ["rotSquare", "rotTriangle"], stroke_color: "BLUE"},

    {shapes: ["rotSquare", "rotTriangle"], stroke_color: "BLUE"},

    {shapes: ["rotSquare", "rotTriangle"], stroke_color: "BLUE"}
    ],

  slice0_triangle:
    [
    {shapes: ["slice", "triangle"], slice_rotation: 0},

    {shapes: ["slice", "triangle"], slice_rotation: 0},

    {shapes: ["slice", "triangle"], slice_rotation: 0},

    {shapes: ["slice", "triangle"], slice_rotation: 0},

    {shapes: ["slice", "triangle"], slice_rotation: 0}
    ],

  slice45_triangle:
    [
    {shapes: ["slice", "triangle"], slice_rotation: 45},

    {shapes: ["slice", "triangle"], slice_rotation: 45},

    {shapes: ["slice", "triangle"], slice_rotation: 45},

    {shapes: ["slice", "triangle"], slice_rotation: 45},

    {shapes: ["slice", "triangle"], slice_rotation: 45}
    ],

  slice90_triangle:
    [
    {shapes: ["slice", "triangle"], slice_rotation: 90},

    {shapes: ["slice", "triangle"], slice_rotation: 90},

    {shapes: ["slice", "triangle"], slice_rotation: 90},

    {shapes: ["slice", "triangle"], slice_rotation: 90},

    {shapes: ["slice", "triangle"], slice_rotation: 90}
    ]
}
