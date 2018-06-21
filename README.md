# VCL Correlation : JND Proof of Concept 

This is a proof of concept for the JND experiment. 

## Prerequisites
### (1) Install http-server

The experiment loads an external HTML file as means to display the D3 graphs. 

In order to support cross-origin sharing, we need to run that HTML file on localhost.

Install  Node.js' http-server by typing: 
```
npm install -g http-server
```

### (2) Install browser extension for cross-origin sharing

If using Chrome, install extension [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) extension and once installed, ENABLE it in the browser.

If using other browsers, installing a similar extension may be necessary. 

## Running the Experiment

### (1) Git clone the repository

```
git clone https://github.com/coyiutoc/VCL_Correlation_JND_POC.git
```

### (2) Start server:
Navigate into the folder, then do:

```
http-server -c-1
```

You should see something like:

```
Starting up http-server, serving ./ 
Available on:
  http://127.0.0.1:8080
  http://192.168.1.64:8080
```

If for some reason your port is not 8080 (you might be running another server etc.) go into `jnd_experiment.html` and change the variable `const localhost` to the port that shows up when you start up the server. 


### (3) Open jnd_experiment.html in browser
Make sure **cross-origin-sharing extension is enabled** in this window, otherwise the graphs will not appear. 

Otherwise, you should see the experiment successfully load. 