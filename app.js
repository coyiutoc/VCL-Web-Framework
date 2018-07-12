// --- LOADING MODULES
var express = require('express');

// --- INSTANTIATE THE APP
var app = express();

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
