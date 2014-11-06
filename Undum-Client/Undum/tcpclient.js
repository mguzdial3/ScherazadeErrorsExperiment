
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;


var PlotPoint = {
	userId: 0,
	plot: null,
	options: [],
	oldPlotPref: 0,
	oldOptionsppref: [],
	last: false,
	clear: false,
	timeoutEnabled: false,
	timeout: 0,
	
	// set up parameters
	ratePlot: false,
	rateOptions: false,
	maxPreference: 0,
	minPreference: 0
};

var UserInput = {
	userId: 0,
	choice: 0,
	plotRating: 0,
	optionRatings: []
};

situations = [];

//request startup parameter
var setStartup = function(myplot) {
	PlotPoint.ratePlot = myplot.ratePlot;
	PlotPoint.rateOptions = myplot.rateOptions;
	PlotPoint.maxPreference = myplot.maxPreference;
	PlotPoint.minPreference = myplot.minPreference;

	UserInput.choice = -1;
}

var setRequestPlot = function(myplot) {
	UserInput.userId = myplot.userId;
	UserInput.choice = -1;
}

var setResponse = function(myplot) {
	UserInput.userId = myplot.userId;
	UserInput.choice = myplot.choice;
	UserInput.plotRating = myplot.plotRating;
	UserInput.optionRating = myplot.optionRating;
}


var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);	    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write('Hello, ready to start!');
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket

client.on('data', function(data) {
	console.log('DATA: ' + data);	
	var myplot = JSON.parse(data);
	
	// startup
	if(myplot.plot==null) {
		setStartup(myplot);
		var uinput = JSON.stringify(UserInput);
		client.write(uinput);
	}
	// the last plot point
	else if(myplot.last) {
		PlotPoint.last = myplot.last;
		
		setResponse(myplot);
		var uinput = JSON.stringify(UserInput);
		client.write(uinput);
		
		//Close the client socket completely
		client.destroy();
	}
	else if(myplot.userId > 0) {
		setResponse(myplot);
		var uinput = JSON.stringify(UserInput);
		client.write(uinput);
	}
	else {
		console.log(" Illegal data! ");
	}
});


// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});	
