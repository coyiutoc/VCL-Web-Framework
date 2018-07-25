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

// app.disable('view cache');

// --- ROUTING
// Home page
app.get('/', function(request, response) {
    response.render('index.html');
});

// POST on Practice Enabling
app.get('/user', function(req, res){
    // response = {
    //     first_name : req.body.first_name,
    //     last_name : req.body.last_name,
    //     gender: req.body.gender
    //  };
    
    //this line is optional and will print the response on the command prompt
    //It's useful so that we know what infomration is being transferred 
    //using the server
    console.log(req);
    
    //convert the response in JSON format
    //res.end(JSON.stringify(response));
});

// JND Experiment
app.get('/jnd', function(request, response) {
    response.render('jnd/jnd_experiment.html');
});

// JND Trial Display
app.get('/jnd_trial', function(request, response) {
    response.render('jnd/jnd_trial_display.html');
});

// Stevens Experiment
app.get('/stevens', function(request, response) {
    response.render('stevens/stevens_experiment.html');
});

// Stevens Trial Display
app.get('/stevens_trial', function(request, response) {
    response.render('stevens/stevens_trial_display.html');
});

// Stevens Trial Display

// --- START THE SERVER 
var server = app.listen(8080, function(){
    console.log("Listening on port %d", server.address().port);
});
