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
        "<h1>Story Generation Experiment</h1>\
        <p>We are conducting an experiment on computational storytelling.\
        The goal of the work is to understand how people rate stories for the\
        purpose of building AI systems that is able to automatically generate fictional stories. \
				</p>\
				<p>In the experiment, you will read 6 scientific fiction stories collected \
				from <a href='http://en.wikipedia.org/wiki/Choose_Your_Own_Adventure' target='_blank' class='sticky'>choose-your-own-adventure series of books</a>.\
				Each story contains six paragraphs,\
				and will be presented paragraph by paragraph. After reading every paragraph, please perform the following actions:\
				<ol style='font-size: 14pt'> \
					<li>Rate the <strong>story so far</strong> on a 1-5 scale based on your own preference (1 the worst, 5 the best). You should rate the entire \
					part of the story you have read so far, instead of rating just the last \
					paragraph. </li>\
					<li>Rate the options on the scale of 1-5 based on your own preference.</li>\
					<li>Click one of the options, indicating which one you would like to take. The story will be unfolded based on your selection.</li>\
				</ol> </p>\
				\
				<p><i>You will encounter the same \
				paragraphs multiple times, you may want to select different options so that \
				you will end up with different stories. You might not receive your Amazon Mechanical Turk reward if you go to the same ending multiple times.</i></p> \
				<p>Please carefully read the stories and options. Then carefully rate them based on your preference. \
				Your true preference ratings for these stories and options will be highly appreciated. We need your ratings to build a better interactive storytelling game. \
				Please do not leave the same or similar ratings for all the stories and options. \
				You might not receive the Amazon Mechanical Turk reward if your ratings are all the same. \
				</p>\
				<p>After each story, a multiple-choice quiz question will show up. Please select the correct one \
				based on the content of the last story or the selections you just made. If you fail too many quiz questions, you might not receive the Amazon Mechanical Turk reward.</p> \
				<p>At the end of all the stories, a key code will appear. \
				Please copy the key code back to the Amazon Mechanical Turk. </p> \
				<p><a href='plotpoint1' id='Linkplotpoint1'></a>\
				</p>\
				<p>If you participate in the experiment by clicking the CONTINUE THE INSTRUCTIONS link below, it means that you agree the <a href='CONSENT FORM.pdf' target='_blank' class='sticky'>CONSENT FORM</a>.</p>\
				<p>\
        <a href=\"javascript:getNextParagraph()\" >CONTINUE THE INSTRUCTIONS.</a></p>",
        {
            exit: function(character, system, to) {
            	$("#content").empty();
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
  playerResponse.userId = Math.floor(Math.random()*10001);
//	playerResponse.optionRatings = new Array();
//	playerResponse.optionRatings[0] = 0;
	playerResponse.choice = 0;
	playerResponse.plotRating = 0;
	//setInterval(function(){alert('Hello')},3000);
//	alert(playerResponse.userId);
};


//---------------------------------------------------------------------------
/* This function read a single file and print the information about
 * that file. 
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
}*/




var getSelectedRadio = function(radioName){
	
	var r = $("input[name='" + radioName + "']:checked").val()
	//alert(radioName + ", " + r);
	return r;
}




function getNextParagraph(){
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
	    	var rec = (xmlhttp.responseText);
	    	var serverResponse = JSON.parse(rec);
	    	plot = serverResponse["plot"];
	    	options = serverResponse["options"];
	    	ratePlot = serverResponse["ratePlot"];
	    	rateOptions = serverResponse["rateOptions"];
	    	oldPlotPref = serverResponse["oldPlotPref"];
	    	oldOptionsPref = serverResponse["oldOptionsPref"];
	    	clear = serverResponse["clear"];
	    	last = serverResponse["last"];
	    	timeoutEnabled = serverResponse["timeoutEnabled"];
	    	timeout = serverResponse["timeout"];
	    	//alert(plot);
	    	insertNextPlotPoint();
	    	setOptionRating();
			playerResponse.playerResponseID = Math.floor(Math.random()*1001);
	    }
	}
	  
	xmlhttp.open("POST","processData.jsp",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var t = JSON.stringify(playerResponse);
	//alert(t);
	xmlhttp.send("Data=" + t);
	
}


//Player response
var playerResponse = {
// A unique ID	
	"userId": 0, 
// Current choice for the options	
	"choice": 0,
// Current plot rating	
	"plotRating": 0,
// Current option rating array
	optionRatings: [0],
// Response ID
	"playerResponseID": 0
	
};

//Server Response
var ratePlot;
var rateOptions;
var plot;
var options;
var oldPlotPref;
var oldOptionsPref;
var clear;
var last;
var timeoutEnabled;
var timeout;

//plot name will be plotName + plot number
var plotName = "plotpoint";
var plotNum = 1;
//Current plot point name
function getPlotName(){
	return plotName+plotNum;
}
function increasePlotName(){
	plotNum += 1;
}
//current link id
function getLinkName(){
	return "Link"+getPlotName();
}
//next plot point name
function getNextPlotName(){
	var pp = plotNum + 1;
	
	return plotName+pp;
}
//next link id
function getNextLinkName(){
	return "Link"+getNextPlotName(); 
}
//next story rating radio button id
function getNextStoryRatingRBName(){
	return "StoryRating"+getNextPlotName();
}
//current story rating radio button id
function getStoryRatingRBName(){
	return "StoryRating"+getPlotName();
}
//next option rating radio button id (i th option)
function getNextOptionRatingRBName(i){
	return "OptionRating"+getNextPlotName()+i;
}
//current option rating radio button id (i th option)
function getOptionRatingRBName(i){
	return "OptionRating"+getPlotName()+i;
}

function insertNextPlotPoint(){
		var pt = formatPlotPoint();
		//alert(pt);
		if(clear==true){
			undum.game.situations[getPlotName()] = new undum.SimpleSituation(pt,
			  {
            exit: function(character, system, to) {
            	$("#content").empty();
            }
        });
		}
		else{
			//alert("Clear is not true");
			undum.game.situations[getPlotName()] = new undum.SimpleSituation(pt);
		}
		var cid = "#"+getLinkName();

		//alert(cid);
		$(cid).click();		
		increasePlotName();
}

var rateStoryHTML = function(){
	return "<ul class='options'>\
            <li>\
		        <FORM name=mf>\
		        <b>Please rate the story so far:  </b>\
		            <input type=\"radio\" name=\""+getNextStoryRatingRBName()+"\" value= 5>5(Best)\
		            <input type=\"radio\" name=\""+getNextStoryRatingRBName()+"\" value= 4>4\
		            <input type=\"radio\" name=\""+getNextStoryRatingRBName()+"\" value= 3>3\
		            <input type=\"radio\" name=\""+getNextStoryRatingRBName()+"\" value= 2>2\
		            <input type=\"radio\" name=\""+getNextStoryRatingRBName()+"\" value= 1>1(Worst)\
		        </FORM>\
		        </li>\
            </ul>";
}
            
var rateOptionHTML1 = function(){
		return "<li><FORM name=mf>"
		      }
		      
var rateOptionHTML2 = function(i){
		return     "<input type=\"radio\" name=\""+getNextOptionRatingRBName(i)+"\" value= 5>5(Best)\
		            <input type=\"radio\" name=\""+getNextOptionRatingRBName(i)+"\" value= 4>4\
		            <input type=\"radio\" name=\""+getNextOptionRatingRBName(i)+"\" value= 3>3\
		            <input type=\"radio\" name=\""+getNextOptionRatingRBName(i)+"\" value= 2>2\
		            <input type=\"radio\" name=\""+getNextOptionRatingRBName(i)+"\" value= 1>1(Worst)\
		        </FORM>\
		        </li>";
}

function formatPlotPoint(){	
	var fplot = "<p>"+plot+"<a href='"+getNextPlotName()+"' id='"+getNextLinkName()+"'></a></p>";
	if(!last){
		if(ratePlot){
			fplot = fplot + rateStoryHTML();
		}
		if(rateOptions && options.length > 0){
			fplot = fplot+"<ul class='options'><li><b>Please rate the following option(s) and select one of them to continue:</b></li>";
			for(var i = 0; i < options.length; i++){
				fplot = fplot + rateOptionHTML1() + "<a href=\"javascript:selectOption("+i+")\">"+options[i]+"</a>";
				if(options[i].length > 50){
					fplot = fplot + "<br>";
				}
				else{
					fplot = fplot + "  ";
				}
				//alert(options[i].length);
				fplot = fplot + rateOptionHTML2(i);
				
			}
			fplot = fplot + "</ul>";			
		}
		else if(options.length > 0){
			fplot = fplot+"<ul class='options'><li><b>Please select one of the option(s) to continue:</b></li>";
			for(var i = 0; i < options.length; i++){
				fplot = fplot + "<li><a href=\"javascript:selectOption("+i+")\">"+options[i]+"</a></li>";
			}
			fplot = fplot + "</ul>";
		}
	}
	return fplot;
}

function selectOption(choice){
	
	if((getStoryRating())==0){
		alert("Please rate the story before continuing!");
		return;
	}
	if(getOptionRating()==0){
		alert("Please rate all the options before continuing!");
		return;
	}	
	playerResponse.choice = choice;
	//alert("Story rating: "+playerResponse.plotRating+", OptionRatings: "+playerResponse.optionRatings + ", choice: " + playerResponse.choice);
	getNextParagraph();
}

function getStoryRating(){
	if(ratePlot){
		var selected = getSelectedRadio(getStoryRatingRBName());
		//alert(getStoryRatingRBName() + ", " + selected);
		if(typeof selected != 'undefined'){
			playerResponse.plotRating = selected;
			
			return 1;
		}
		else{
			return 0;
		}
	}
	return 1;
}

function getOptionRating(){
	if(rateOptions){
		playerResponse.optionRatings = new Array();
		for(var i = 0; i < options.length; i++){
			var selected = getSelectedRadio(getOptionRatingRBName(i));
			if(typeof selected != 'undefined'){
				playerResponse.optionRatings[i] = selected;
				
			}
			else{
				return 0;
			}
		}
	}
	else{
		playerResponse.optionRatings = new Array();
		for(var i = 0; i < options.length; i++){
			playerResponse.optionRatings[i] = 3;
		}
	}
	return 1;
}

function setOptionRating(){
	if(rateOptions){
		
		for(var i = 0; i < oldOptionsPref.length; i++){
			
			if(oldOptionsPref[i] >= 1){
				//alert(oldOptionsPref[i]);				
				//alert(getOptionRatingRBName(i));
				var $radios = $("input:radio[name="+getOptionRatingRBName(i)+"]");
		    if($radios.is(':checked') == false) {
		        $radios.filter("[value="+oldOptionsPref[i]+"]").attr('checked', true);
		    }
			}
		}
	}	
	if(ratePlot){
			if(oldPlotPref >= 1){				
				var $radios = $("input:radio[name="+getStoryRatingRBName()+"]");
		    if($radios.is(':checked') == false) {
		        $radios.filter("[value="+oldPlotPref+"]").attr('checked', true);
		    }
			}
	}
}