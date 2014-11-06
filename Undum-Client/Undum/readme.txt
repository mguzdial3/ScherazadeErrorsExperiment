/*
 *
 * Author: Ruian Duan
 * Date: Jan/14/2013
 *
 * /

Following is the main files and the description.

1. /tcpclient.js
communicates with the server via tcp. shows the plot point from the IS engine to the server and reports the user input back to the server. Need to cooperate with MyUndum.js to display the story.

2. /undum-master/games/MyUndum.html
the web page for undum. could help hide information(in the ui_library part) for further usage.

3. /undum-master/games/media/games/tutorial/MyUndum.js
dynamically use the message from tcpclient.js, show the story and the plot to the user, collect information from the user.

4. /undum-master/games/media/js/undum.js
user-defined undum library for this project.

The tcpclient.js and MyUndum.js are still in progress. Further efforts should be towards get them work.