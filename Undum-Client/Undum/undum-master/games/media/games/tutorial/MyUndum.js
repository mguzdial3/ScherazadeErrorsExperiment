// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "349baf43-9ade-49a8-86d0-24e3de3ce072";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";


/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    progress: new undum.SimpleSituation(
        "<p class='transient'> You will now play through an interactive story. During the story you will see descriptions\
        in black, with your choices of what to do next below in red. The other characters in the story\
        can take actions, and automatically will when you cannot take actions of your own.\
        <br><a href='./boost-stamina-action'>Begin The\
        Story</a>\
        </p>",
        {
            actions: {
                // I'm going indirect here - the link carries out an
                // action, which then uses doLink to directly change
                // the situation.  This isn't the recommended way (I
                // could have just changed situation in the link), but
                // it illustrates the use of doLink.
                "boost-stamina-action": function(character, system, action) {

                    handleClick(system, -2); //This just gets the current description + option to start
                }
            },
            exit: function() {}
				/*function(character, system, to) {
                system.animateQuality(
                    'stamina', character.qualities.stamina+1
                );
            }*/
        }
    )
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "progress";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
    
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    stats: new undum.QualityGroup(null, {priority:"0001"}),
    progress: new undum.QualityGroup('Progress', {priority:"0002"})
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
	/*system.setCurRate($("#rate_cur_page").html());
	var submit = $("#submit").click(GetSelectedItem);
    /*character.qualities.skill = 12;
    character.qualities.stamina = 12;
    character.qualities.luck = 0;
    character.qualities.novice = 1;
    character.qualities.inspiration = 0;
    system.setCharacterText("<p>Now choose your own adventure!</p>");
    */
};


//---------------------------------------------------------------------------
/* This function read a single file and print the information about
 * that file. */
var readSingleFile = function(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) {
    	var r = new FileReader();
    	r.onload = function(e) { 
    		var contents = e.target.result;
    		alert( "Got the file.n" 
    		+"name: " + f.name + "n"
    		+"type: " + f.type + "n"
    		+"size: " + f.size + " bytesn"
    		+ "starts with: " + contents.substr(1, contents.indexOf("n"))
    		);  
    	};
	r.readAsText(f);
	} else { 
		alert("Failed to load file");
	}
}

//---------------------------------------------------------------------------
/* This function get the selected item from radio button
 * For current page and for the options */
var GetSelectedItem = function() {
	
	alert("submit button clicked");
	
	// get the page rating
	cur_page_chosen = "";
	len = document.f1.rating.length;
	alert("length is " + len);

	for (i = 0; i <len; i++) {
		if (document.f1.rating[i].checked) {
			cur_page_chosen = document.f1.rating[i].value;
		}
	}

	if (cur_page_chosen == "") {
		alert("Please rate the current the page");
	}
	else {
		alert("what the fucking thing is going on?!");
	}
	
	// get the option rating
	option_chosen = "";
	len = document.f2.rating.length;
	for (i = 0; i<len; i++) {
		if (document.f2.rating[i].checked) {
			option_chosen = document.f2.rating[i].value;
		}
	}
	
	if(option_chosen == "") {
		alert("Please rate the options");
	}
	
	msg = [cur_page_chosen, option_chosen];
}
var plotName = 'plotpoint';
var plotNum = 1;
var ws = new WebSocket("ws://127.0.0.1:8097/");
var currSystem;
var intervalVar;
var finished = false;

var tableArray = ["","",""];
var textInputs = [];

var part_one = "Storyyyyy";
var part_two = "Tableeee";
var part_three = "Listeeeee";
var part_four = "Surveyyyy";

var hasStartedSecond = false;

function getPlotName(){
    return plotName+plotNum;
}
function getNextPlotName(){
    return plotName+(plotNum+1);
}

function handleClick(system, choice){
    currSystem = system;
  	SendStoryMessage(""+choice);
	return false;
  }


ws.onopen = function() {
};

ws.onmessage = function (evt) {


    var str = ""+evt.data

    if(str.indexOf(part_one)!=-1){
        str = str.substring(part_one.length);

        HandleStorySeverMessage(str);
    }
    else if(str.indexOf(part_three)!=-1){
        str = str.substring(part_three.length);

        HandleSeverAllLinesMessage(str);
        //window.scrollTo(0, 1000);
        $('html, body').animate({
            scrollTop: $("#content").offset().top
        }, 1000);
    }


    
};

ws.onclose = function() {
    alert("Disconnected from server. Please reload!");
};

ws.onerror = function(err) {
    alert("Error: " + err);
};

function HandleStorySeverMessage(str){
    var res = str.split("*");

    var desc = "<p>"

    desc+=res[0]+"</p>"

    if(res[res.length-1].indexOf("HARDSTOP") > -1){
        finished = true;
        desc+="<button onclick=\"SwitchToErrorInput1()\">Next Section</button>";
        
    }

    if(!finished){
        for(i=1; i<res.length; i++){
            desc+="<p class='transient'><a href='./pick"+(i-1)+"'>"+res[i]+"</a></p>";
        
        }
    }

    undum.game.situations[getPlotName()] =new undum.SimpleSituation(
        desc,
        {
            actions: {
                "pick0": function(character, system, action) {

                    handleClick(system, 0);
                },
                "pick1": function(character, system, action) {

                    handleClick(system, 1);
                },
                "pick2": function(character, system, action) {

                    handleClick(system, 2);
                },
                "pick3": function(character, system, action) {

                    handleClick(system, 3);
                },
                "pick4": function(character, system, action) {

                    handleClick(system, 4);
                },
                "pick5": function(character, system, action) {

                    handleClick(system, 5);
                },
                "pick6": function(character, system, action) {

                    handleClick(system, 6);
                },
                "pick7": function(character, system, action) {

                    handleClick(system, 7);
                },
                "pick8": function(character, system, action) {

                    handleClick(system, 8);
                },
                "pick9": function(character, system, action) {

                    handleClick(system, 9);
                },
                "pick10": function(character, system, action) {

                    handleClick(system, 10);
                },

            },
            exit: function() {}
                /*function(character, system, to) {
                system.animateQuality(
                    'stamina', character.qualities.stamina+1
                );
            }*/
        }
    )
    currSystem.doLink(getPlotName());
    plotNum+=1;
    if(!finished){
        if(res.length>2){ //If there are player actions
           clearTimeout(intervalVar)
            intervalVar = setTimeout(function () {SetNPCAction()}, 5000);
        }
        else{
           intervalVar = setTimeout(function () {SetNPCAction()}, 1000);
        }
    }
}

function HandleSeverAllLinesMessage(str){
    var res = str.split("*");

    var num = 0;
    for(i=0; i<res.length; i++){
        if(res[i].length>0 && i!=(res.length-1)){
            
            

            if(res[i].charAt(0)=='-'){
                var lineId ="allLines"+num;
                $("#content").append("<input type=\"checkbox\" id=\""+lineId+"\"+> "+"&nbsp"+"&nbsp"+res[i]+"<br>");
                num+=1;
            }
            else{
                
               $("#content").append("<br>"+res[i]+"<br>"); 
               
            }
        }
    }

    if(!hasStartedSecond){  
         $("#content").append("<div><p>Clicking the button below will end this sectiona nd begin the next story section with an entirely new story.</p></div>");
        $("#content").append("<div><button onclick=\"StartAgain()\">Next Story</button></div>");
    }
    else{
         $("#content").append("<div><button onclick=\"EndArea()\">Next Section</button></div>");
    }

    
}

function SendStoryMessage(message){
    var str = (part_one+message);
    ws.send(str);
    clearTimeout(intervalVar)
}

function SetNPCAction(){
    var str = (part_one+(-1));
    ws.send(str);
}

function SwitchToErrorInput2(){

     
    if(!hasStartedSecond && CheckRadioButtonLine("questionOne")
        && CheckRadioButtonLine("questionTwo")
        && CheckRadioButtonLine("questionThree")
        && CheckRadioButtonLine("questionFour")
        && CheckRadioButtonLine("questionFive")
        && CheckRadioButtonLine("questionSix")
        && CheckRadioButtonLine("questionSeven")){
       CreateTable();   
        $('html, body').animate({
            scrollTop: $("#content").offset().top
        }, 1000);
    }
    else if(hasStartedSecond && CheckRadioButtonLine("questionOne")
        && CheckRadioButtonLine("questionTwo")
        && CheckRadioButtonLine("questionThree")
        && CheckRadioButtonLine("questionFour")
        && CheckRadioButtonLine("questionFive")
        && CheckRadioButtonLine("questionSix")
        && CheckRadioButtonLine("questionSeven")
        && CheckRadioButtonLine("questionEight")
        && CheckRadioButtonLine("questionNine")
        && CheckRadioButtonLine("questionTen")
        && CheckRadioButtonLine("questionEleven")
        ){
        CreateTable();  
        $('html, body').animate({
            scrollTop: $("#content").offset().top
        }, 1000);   
    }
    else{
       alert("Please give a response to each statement"); 
    }


    
}

function CreateTable(){
       $("#content").empty();
            $("#content").append( "<p id=\"p1\">Please list all the options you remember that were contradictions or didn't make sense in your playthrough, with one line per wrong option::</p>" );
            $("#content").append( "<div></div><table border=\"0\" style=\"width:400\">" );    

            for(i=0; i<tableArray.length; i++){
                var str = ("myTable"+i);
                if((tableArray.length-1)!=i){
                    $("#content").append( "<tr><td><p>Option:</p><input type=\"text\" id=\""+str+"\" name=\"lname"+i+"\" size = \"100\" value=\""+tableArray[i]+"\" ></td></tr>" );
                }
                else{
                     $("#content").append( "<tr><td><p>Option:</p><input type=\"text\" id=\""+str+"\" name=\"lname"+i+"\" size = \"100\" value=\""+tableArray[i]+"\" onclick=\"AddTable()\"></td></tr>" );
                }
            }
            $("#content").append( "</table></div>" );
            $("#content").append("<button onclick=\"AddTable()\">Add Box</button>");
            $("#content").append("<div><button onclick=\"SwitchToErrorInput3()\">Next Section</button></div>");
            
            if(hasStartedSecond){
                SetProgressText("7");
            }
            else{
                SetProgressText("3");
            }
}

function AddTable(){
    document.getElementById("p1").innerHTML ="Worked";

    for(i=0; i<tableArray.length; i++){
        var str = ("myTable"+i);
        var doc =  document.getElementById(str);
        tableArray[i] =doc.value;
    }

    tableArray[ tableArray.length] = "";

    CreateTable();
    
}

function SwitchToErrorInput3(){
    var allWorks = false;
    var anyAstericks = false;
    for(i=0; i<tableArray.length; i++){
        var str = ("myTable"+i);
        var doc =  document.getElementById(str);
        tableArray[i] =doc.value;

        if(tableArray[i].length!=0 && !allWorks){
            allWorks = true;
        }

        if(tableArray[i].indexOf("*")!=-1){
            anyAstericks=true;
        }
    }

    if(allWorks){
        if(hasStartedSecond){
            SetProgressText("8");
        }
        else{
            SetProgressText("4");
        }
        
        $('html,body').scrollTop(0);
        $("#content").empty();
        $("#content").append( "<p id=\"p2\">Please check the box next to any line that presented a contradition or didn't make sense in the story.</p><div></div>" );
        //Send the data
        var strToSend = "";

        for(i=0; i<tableArray.length; i++){
            strToSend+=tableArray[i]+"*";
        }

        ws.send(part_two+strToSend);

        //Request for table filler
        ws.send((part_three+"get"));

    }
    else{
        if(!allWorks){
            alert("Please specify an error or type Not Any in a box");

        }
        else if(anyAstericks){
            alert("Please do not use the symbol * in your responses");
        }
    }
    
}

function StartAgain(){
        SetProgressText("5");
        hasStartedSecond = true;
        $("#content").empty();
        finished=false;
        currSystem.doLink("progress");
    
    
}
 
function CheckRadioButtonLine(str){
    var thisOneWorked = false;
    for(i=1; i<7; i++){
        var myId = (str+i);
        if(document.getElementById(myId).checked){
            thisOneWorked = true;
        }
    }
    return thisOneWorked;
}

function EndArea(){
 
    SetProgressTextTotal("End");
    $("#content").empty();
    $("#content").append( "<p id=\"p3\">You have finished the experiment, please return back to Amazon Mechanical Turk.</p>" );
}

function SetProgressText(str){
     document.getElementById("progressNum").innerHTML = "Part "+str+" of 8";
}

function SetProgressTextTotal(str){
     document.getElementById("progressNum").innerHTML = str;
}

function GetRadialButtons(questionValue){
    var str = "";
    str+="<th><input type=\"radio\" name=\""+questionValue+"\" id=\""+questionValue+"1"+"\" value=\"StronglyDisagree\"></th><th><input type=\"radio\" name=\""+questionValue+"\" id=\""+questionValue+"2"+"\" value=\"Disagree\"></th><th><input type=\"radio\" name=\""+questionValue+"\" id=\""+questionValue+"3"+"\" value=\"SlightlyDisagree\"></th><th><input type=\"radio\" name=\""+questionValue+"\" id=\""+questionValue+"4"+"\" value=\"SlightlyAgree\"></th><th><input type=\"radio\" name=\""+questionValue+"\" id=\""+questionValue+"5"+"\" value=\"Agree\"></th><th><input type=\"radio\" name=\""+questionValue+"\" id=\""+questionValue+"6"+"\" value=\"StronglyAgree\"></th>";
    return str;
}

function SwitchToErrorInput1(){
    $('html, body').animate({
            scrollTop: $("#content").offset().top
        }, 1000);
    if(hasStartedSecond){
        SetProgressText("6");
    }
    else{
        SetProgressText("2");
    }
    tableArray = ["","",""];
    $("#content").empty();
    $("#content").append( "<p id=\"p3\">Please indicate the degree to which you agree with the following statements. </p><div>" );

    //Survey section beginning of table
    $("#content").append( "<div><table border=\"1\" style=\"width:100%\">" ); 

    //header thing
    $("#content").append( "<tr><th>Statement</th><th>Strongly Disagree</th><th>Disagree</th><th>Slightly Agree</th><th>Slightly Disagree</th><th>Agree</td><th>Strongly Agree</th></tr>" );
    
    //Questions
    $("#content").append( "<tr><td>I understood the story of the interactive narrative.</td>"+GetRadialButtons("questionOne")+"</tr><hr>" );
    $("#content").append( "<tr><td>The story largely made sense.</td>"+GetRadialButtons("questionTwo")+"</tr><hr>" );
    $("#content").append( "<tr><td>I enjoyed the story of the interactive narrative.</td>"+GetRadialButtons("questionThree")+"</tr><hr>" );
    $("#content").append( "<tr><td>I couldn't determine what type of story this was.</td>"+GetRadialButtons("questionFour")+"</tr><hr>" );
    if(hasStartedSecond){
        $("#content").append( "<tr><td>Please mark Disagree for this question.</td>"+GetRadialButtons("questionFive")+"</tr><hr>" );
    }
    else{
        $("#content").append( "<tr><td>Please mark Agree for this question.</td>"+GetRadialButtons("questionFive")+"</tr><hr>" );
    }

    $("#content").append( "<tr><td>I didn’t understand what was happening in the story.</td>"+GetRadialButtons("questionSix")+"</tr><hr>" );
    $("#content").append( "<tr><td>I felt I could take an active role in the story.</td>"+GetRadialButtons("questionSeven")+"</tr><hr>" );

    if(hasStartedSecond){
        $("#content").append( "<tr><td>I regularly read fiction.</td>"+GetRadialButtons("questionEight")+"</tr><hr>" );
        $("#content").append( "<tr><td>I regularly play video games.</td>"+GetRadialButtons("questionNine")+"</tr><hr>" );
        $("#content").append( "<tr><td>I am familiar with choose your own adventure books.</td>"+GetRadialButtons("questionTen")+"</tr><hr>" );
        $("#content").append( "<tr><td>I am familar with interactive fiction or text adventure games (such as Zork).</td>"+GetRadialButtons("questionEleven")+"</tr><hr>" );
    }

    //End of table
    $("#content").append( "</table></div>" );

    $("#content").append("<button onclick=\"SwitchToErrorInput2()\">Next Section</button>");
   
}
