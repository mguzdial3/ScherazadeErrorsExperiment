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
    start: new undum.SimpleSituation(
        "<h1>Starting Out with Undum</h1>\
        <img src='media/games/tutorial/woodcut1.png' class='float_right'>\
        <p>Welcome to the Undum tutorial. Undum is a tool for writing\
         hypertext interactive fiction. It has some unique features\
        and a visual design that encourages narrative games.</p>\
        \
        <p>Hypertext interactive fiction is the digital equivalent of the\
        Choose Your Own Adventure (CYOA) books that were popular in the\
        1980s. The story is told in chunks, and you select from a range\
        of options to move it forward. Unlike the book form, however, the\
        digital form gives you far more flexibility to tell rich stories\
        and introduce more interesting game elements.</p>\
        \
        <p class='transient'>For now, lets move on with the tutorial.\
				<a href='last' onclick=\"addSituationsArray();\" >Click this link</a> to move on.\
				<a href='todo' id='nextLink'></a>\
				</p>\
        <ul class='options'>\
            <li><a href=\"javascript:GetSelectedItem()\">option one</a></li>\
            <li>\
		        <FORM name=mf>\
		            <b>Rate this option</b>\
		            <input type=\"radio\" name=\"or1\" value= 5>5(Best)\
		            <input type=\"radio\" name=\"or1\" value= 4>4\
		            <input type=\"radio\" name=\"or1\" value= 3>3\
		            <input type=\"radio\" name=\"or1\" value= 2>2\
		            <input type=\"radio\" name=\"or1\" value= 1>1(Worst)\
		        </FORM>\
		        </li>" 
   		 +
            "<li><a href=\"javascript:GetSelectedItem()\">option two</a></li>\
            <li>\
		        <FORM name=mf2>\
		            <b>Rate this option</b>\
		            <input type=\"radio\" name=\"or2\" value= 5>5(excellent)\
		            <input type=\"radio\" name=\"or2\" value= 4>4\
		            <input type=\"radio\" name=\"or2\" value= 3>3\
		            <input type=\"radio\" name=\"or2\" value= 2>2\
		            <input type=\"radio\" name=\"or2\" value= 1>1(unacceptable)\
		        </FORM>\
		        </li>\
            </ul>"        
    ),   


    last: new undum.SimpleSituation(
        "<h1>Where to Go Now</h1>\
        <p>So that's it. We've covered all of Undum. This situation is the\
        end, because it has no further links. The 'The End' message is\
        just in the HTML output of this situation, it isn't anything special\
        to Undum</p>\
        \
        <p>I've added an\
        inspiration quality to your character list. Its time for you to\
        crack open the game file and write your own story.</p>\
        <h1><a href=start>The End</a></h1>",
        {
            /*enter: function(character, system, from) {
                system.setQuality("inspiration", 1);
                system.setCharacterText(
                    "<p>You feel all inspired, why not have a go?</p>"
                );
            },*/
            exit: function(character, system, to) {
            	addSituationsArray();
            	$("#content").empty();
            	//doTransitionTo(last);
            	//undum.startGame();
            }
        }
    )
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
    skill: new undum.IntegerQuality(
        "Skill", {priority:"0001", group:'stats'}
    ),
    stamina: new undum.NumericQuality(
        "Stamina", {priority:"0002", group:'stats'}
    ),
    luck: new undum.FudgeAdjectivesQuality( // Fudge as in the FUDGE RPG
        "<span title='Skill, Stamina and Luck are reverently borrowed from the Fighting Fantasy series of gamebooks. The words representing Luck are from the FUDGE RPG. This tooltip is illustrating that you can use any HTML in the label for a quality (in this case a span containing a title attribute).'>Luck</span>",
        {priority:"0003", group:'stats'}
    ),

    inspiration: new undum.NonZeroIntegerQuality(
        "Inspiration", {priority:"0001", group:'progress'}
    ),
    novice: new undum.OnOffQuality(
        "Novice", {priority:"0002", group:'progress', onDisplay:"&#10003;"}
    ),
	pageRating: new undum.NumericQuality(
		"pageRating", {priority:"0001", group:'stats'}
	),
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

function addSituationsArray(){
	//alert($("#rate_option").html());
	
	undum.game.situations.todo = new undum.SimpleSituation(
        "<p>Two things can happen in a situation. The character either\
        <a href='last'>leaves</a> the situation and enters another one, or\
        they carry out some <a href='./do-something'>action</a>. Actions may\
        perform some processing, they may display some results, but\
        ultimately they put the character back into the same situation\
        again.</p>"
    );
    
}

var GetSelectedItem = function() {
	addSituationsArray();
	var sel = getSelectedRadio("or1"); 
	//alert("Selected: " + sel);
	if(typeof sel != 'undefined'){
		sendAJAXMsg("Selected="+sel);
		var id = "#nextLink";
		$(id).click();
	}
	else{
		alert("Selected: " + sel);
	}
	 //var oEvent = document.createEvent( "MouseEvents" );
   //oEvent.initMouseEvent("click", true, true,window, 1, 1, 1, 1, 1, false, false, false, false, 0, elem);
   //$("#nextLink").dispatchEvent(oEvent);
	return void(0);
}

var getSelectedRadio = function(radioName){
	
	var r = $("input[name='" + radioName + "']:checked").val()
	//alert(r);
	return r;
}

function sendAJAXMsg(msg)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	alert(xmlhttp.responseText);
	    }
	  }
	  //alert("Start");
	xmlhttp.open("POST","test.jsp",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(msg);
}