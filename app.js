// --- LOADING MODULES
var express = require('express');
var body_parser = require('body-parser');

// --- INSTANTIATE THE APP
var app = express();

// Configure body-parser for express
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

// --- STATIC MIDDLEWARE 
app.use(express.static(__dirname + '/public'));
app.use('/jspsych', express.static(__dirname + "/jspsych"));

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// --- ROUTING
// Home page
app.get('/', function(request, response) {
    response.render('index.html');
});

// Experiment Routing
app.get('/experiment/:experiment/graph_type/:graph_type/range/:range/condition/:condition', function(request, response) {
	
	console.log(request.params);

	let keys = {
		range: request.params.range,
		condition: request.params.condition, 
		graph_type: request.params.graph_type
	}
    debugger;
	if (request.params.experiment === "jnd") {
    	response.render('jnd/jnd_experiment.html', keys);
    } else if (request.params.experiment === "stevens") {
    	response.render('stevens/stevens_experiment.html', keys);
    } else if (request.params.experiment === "jnd_radius") {
    	response.render('jnd/jnd_radius_experiment.html', keys);
    }	
});


// JND Trial Display
app.get('/jnd_trial', function(request, response) {
    response.render('jnd/jnd_trial_display.html');
});

// Stevens Trial Display
app.get('/stevens_trial', function(request, response) {
    response.render('stevens/stevens_trial_display.html');
});

// --- START THE SERVER 
var server = app.listen(8080, function(){
    console.log("Listening on port %d", server.address().port);
});
