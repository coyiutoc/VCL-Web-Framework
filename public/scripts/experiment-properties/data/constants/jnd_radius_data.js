export {JND_RADIUS_BASE, JND_RADIUS_CONDITIONS};

const JND_RADIUS_BASE = {

  foundational:
    [
    {base_radius: 2, initial_difference: 0.586, converge_from_above: true, text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', outline_color: 'BLACK', fill_color: 'BLUE'},

    {base_radius: 3, initial_difference: 0.879, converge_from_above: true, text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', outline_color: 'BLACK', fill_color: 'BLUE'},

    {base_radius: 4, initial_difference: 1.172, converge_from_above: true, text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', outline_color: 'BLACK', fill_color: 'BLUE'},

    {base_radius: 5, initial_difference: 1.464, converge_from_above: true, text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', outline_color: 'BLACK', fill_color: 'BLUE'},

    {base_radius: 6, initial_difference: 1.757, converge_from_above: true, text_color: 'BLACK', feedback_background_color: 'WHITE', background_color: 'WHITE', outline_color: 'BLACK', fill_color: 'BLUE'}
    ] 
}

const JND_RADIUS_CONDITIONS = {

  circle_square:
  	[
  	{shape_1: "circle", shape_2: "square"},

  	{shape_1: "circle", shape_2: "square"},

  	{shape_1: "circle", shape_2: "square"},

  	{shape_1: "circle", shape_2: "square"},

  	{shape_1: "circle", shape_2: "square"}
  	],

  circle_triangle:
  	[
  	{shape_1: "circle", shape_2: "triangle"},

  	{shape_1: "circle", shape_2: "triangle"},

  	{shape_1: "circle", shape_2: "triangle"},

  	{shape_1: "circle", shape_2: "triangle"},

  	{shape_1: "circle", shape_2: "triangle"}
  	],

  square_triangle:
    [
    {shape_1: "square", shape_2: "triangle"},

    {shape_1: "square", shape_2: "triangle"},

    {shape_1: "square", shape_2: "triangle"},

    {shape_1: "square", shape_2: "triangle"},

    {shape_1: "square", shape_2: "triangle"}
    ], 

  rotSquare_rotTriangle:
    [
    {shape_1: "rotSquare", shape_2: "rotTriangle"},

    {shape_1: "rotSquare", shape_2: "rotTriangle"},

    {shape_1: "rotSquare", shape_2: "rotTriangle"},

    {shape_1: "rotSquare", shape_2: "rotTriangle"},

    {shape_1: "rotSquare", shape_2: "rotTriangle"}
    ],

  slice0_triangle:
    [
    {shape_1: "slice", shape_2: "triangle", slice_rotation: 0},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 0},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 0},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 0},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 0}
    ],

  slice45_triangle:
    [
    {shape_1: "slice", shape_2: "triangle", slice_rotation: 45},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 45},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 45},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 45},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 45}
    ],

  slice90_triangle:
    [
    {shape_1: "slice", shape_2: "triangle", slice_rotation: 90},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 90},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 90},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 90},

    {shape_1: "slice", shape_2: "triangle", slice_rotation: 90},
    ]
}
