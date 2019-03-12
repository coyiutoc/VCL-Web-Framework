/**
 * Retrieves the route address for the given experiment.
 *
 * @param  range          {string}    Name of experiment
 * @param  condition_name {string}    Name of condition
 * @param  graph_type     {string}    Subject's ID
 * @param  balancing_type {string}    Subject's initials
 *
 * @return route {string}
 */
function retrieve_route(experiment, condition_name, subject_id, subject_initials) {

    var address = location.protocol + "//" + location.hostname + ":" + location.port;

    switch(experiment) {

        case 'JND':
            address += get_JND_route(condition_name);
            break;

        case 'JND Radius':
            address += get_JND_radius_route(condition_name);
            break;

        case 'Stevens':
            address += get_stevens_route(condition_name);
            break;

        case 'Estimation':
            address += get_estimation_route(condition_name);
            break;

        default:
            throw Error(experiment + " experiment is not supported.");
    }

    address += "/subject_id/" + subject_id + "/subject_initials/" + subject_initials;

    return address;
}

/**
 * Retrieves the route address for the JND condition.
 *
 * @param  condition_name {string}    Name of condition
 *
 * @return route {string}
 */
function get_JND_route(condition_name) {

    switch(condition_name) {

        case 'Scatter: Base':
            return "/experiment/jnd/graph_type/scatter/range/foundational/condition/base/balancing/latin_square";

        case 'Strip: Base':
            return "/experiment/jnd/graph_type/strip/range/foundational/condition/base/balancing/latin_square";

        case 'Ring: Strip Ring Size':
            return "/experiment/jnd/graph_type/ring/range/foundational/condition/strip_ring_size/balancing/latin_square";

        case 'Strip: Line Length Strip':
            return "/experiment/jnd/graph_type/strip/range/foundational/condition/line_length_strip/balancing/latin_square";

        case 'Scatter: Distractor Rainbow':
            return "/experiment/jnd/graph_type/scatter/range/design/condition/distractor_rainbow/balancing/latin_square";

		case 'Scatter: Multi-Phase':
			return "/experiment/jnd/graph_type/scatter/range/design_multi/condition/distractor_multi/balancing/latin_square";

		case 'Scatter: Distractor Square Red Hue':
			return "/experiment/jnd/graph_type/scatter/range/design/condition/distractor_square_red_hue/balancing/latin_square";	

		case 'Scatter: Distractor Square Red Lum':
			return "/experiment/jnd/graph_type/scatter/range/design/condition/distractor_square_red_lum/balancing/latin_square";				

		case 'Scatter: Distractor Square Red Chrom':
			return "/experiment/jnd/graph_type/scatter/range/design/condition/distractor_square_red_chrom/balancing/latin_square";		

        default:
            throw Error(condition_name + " condition is not supported for JND.");
    }
}

/**
 * Retrieves the route address for the JND Radius condition.
 *
 * @param  condition_name {string}    Name of condition
 *
 * @return route {string}
 */
function get_JND_radius_route(condition_name) {

    switch(condition_name) {

        case 'Shape: Circle, Square':
            return "/experiment/jnd_radius/graph_type/shape/range/foundational/condition/circle_square/balancing/random";

        case 'Shape: Circle, Triangle':
            return "/experiment/jnd_radius/graph_type/shape/range/foundational/condition/circle_triangle/balancing/random";

        case 'Shape: Square, Triangle':
            return "/experiment/jnd_radius/graph_type/shape/range/foundational/condition/square_triangle/balancing/random";

        case 'Shape: Rotated Square, Rotated Triangle':
            return "/experiment/jnd_radius/graph_type/shape/range/foundational/condition/rotSquare_rotTriangle/balancing/random";

        case 'Shape: Slice, Triangle':
            return "/experiment/jnd_radius/graph_type/shape/range/foundational/condition/slice-0_triangle/balancing/random";

        case 'Shape: Slice-45 Degrees, Triangle':
            return "/experiment/jnd_radius/graph_type/shape/range/foundational/condition/slice-45_triangle/balancing/random";

        case 'Shape: Slice-90 Degrees, Triangle':
            return "/experiment/jnd_radius/graph_type/shape/range/foundational/condition/slice-90_triangle/balancing/random";

        default:
            throw Error(condition_name + " condition is not supported for JND Radius.");
    }

}

/**
 * Retrieves the route address for the Stevens condition.
 *
 * @param  condition_name {string}    Name of condition
 *
 * @return route {string}
 */
function get_stevens_route(condition_name) {

    switch(condition_name) {

        case 'Scatter: Base':
            return "/experiment/stevens/graph_type/scatter/range/foundational/condition/base/balancing/latin_square";

        case 'Strip: Base':
            return "/experiment/stevens/graph_type/strip/range/foundational/condition/base/balancing/latin_square";

        case 'Strip: Line Length Strip':
            return "/experiment/stevens/graph_type/strip/range/foundational/condition/line_length_strip/balancing/latin_square";

        case 'Ring: Strip Ring Size':
            return "/experiment/stevens/graph_type/ring/range/foundational/condition/strip_ring_size/balancing/latin_square";

        default:
            throw Error(condition_name + " condition is not supported for Stevens.");
    }
}
/**
 * Retrieves the route address for the Estimation condition.
 *
 * @param  condition_name {string}    Name of condition
 *
 * @return route {string}
 */
function get_estimation_route(condition_name) {
    switch(condition_name) {
        case 'Shape: Circle, Square, Triangle':
            return "/experiment/estimation/graph_type/shapes/range/estimation/condition/shape_estimation/balancing/random";
        case 'Line Length':
            return "/experiment/estimation/graph_type/shapes/range/estimation/condition/line_length/balancing/random";
        case 'Shape: Rectangle, Square':
            return "/experiment/estimation/graph_type/shapes/range/estimation/condition/rectangle_square/balancing/random";
        case 'Shape: Triangle':
            return "/experiment/estimation/graph_type/shapes/range/estimation/condition/triangle/balancing/random";
        default:
            throw Error(condition_name + " condition is not supported for Estimation.");
    }
}
