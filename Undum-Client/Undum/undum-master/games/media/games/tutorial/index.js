var ws = new WebSocket("ws://127.0.0.1:8085/");

ws.onopen = function() {
    alert("Opened!");
    ws.send("0");
};

ws.onmessage = function (evt) {
    alert("Message: " + evt.data);
};

ws.onclose = function() {
    alert("Closed!");
};

ws.onerror = function(err) {
    alert("Error: " + err);
};

function SendMessage(message){
	alert("Sending Message");
	 ws.send(message);
}

