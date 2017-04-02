// var alf = new character();
// ('currentlybuilding' in character) == true
var Character = (function () {
    function Character(name, guild) {
        this.currentlybuilding = false;
        this._total = 0;
        this._alchemy = 0; //teal
        this._carpentry = 0; //beige
        this._combat = 0; //dark red
        this._cooking = 0; //yellow
        this._fishing = 0; //blue
        this._gathering = 0; //light green
        this._magic = 0; //purple
        this._mining = 0; //gray
        this._smithing = 0; //black
        this._speed = 0; //red
        this._tailoring = 0; //orange
        this._woodcutting = 0; //brown
        Character.numberofCharacters++;
        this._displayName = name;
        this._name = name.toLowerCase();
        this._displayGuild = guild;
        this._guild = guild.toLowerCase();
    }
    Character.howManyCharacters = function () {
        return Character.numberofCharacters;
    };
    Character.prototype.FindTotal = function () {
        this._total += this._alchemy;
        this._total += this._carpentry;
        this._total += this._combat;
        this._total += this._cooking;
        this._total += this._fishing;
        this._total += this._gathering;
        this._total += this._magic;
        this._total += this._mining;
        this._total += this._smithing;
        this._total += this._speed;
        this._total += this._tailoring;
        this._total += this._woodcutting;
    };
    return Character;
}());
Character.numberofCharacters = 0;
var AllChart;
var the_charactersobject;
var labels = [];
var dataSets = [];
var alchemyArray = [];
var carpentryArray = [];
var combatArray = [];
var cookingArray = [];
var fishingArray = [];
var gatheringArray = [];
var magicArray = [];
var miningArray = [];
var smithingArray = [];
var speedArray = [];
var tailoringArray = [];
var woodcuttingArray = [];
// -------------- { MAIN } ----------------- //
$(document).ready((function () {
    "use strict";
    //Register buttons with functionality
    $("#allButton").on("click", fn_AllChart);
    //request json data from separate page
    var req = {
        url: "./data.json",
        beforeSend: function (xhr) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
    };
    console.log(req);
    $.ajax(req)
        .done(function (data) {
        //Send Data to Main
        console.log("main started");
        Fn_Main(data); //Old Main
        Fn_TSMain(data);
        //Build AllChart with default input
        fn_AllChart();
    });
}));
// -------------- { TOP FUNCTIONS } ----------------- //
//Accepts JSON data and sends it to all relevent functions
var Fn_TSMain = function (para_data) {
    //split the file into each JSON section. separated by /newline
    AllData = fn_SplitString(para_data, "\n");
    console.log("Lines in datafile : " + AllData.length);
    //iterate over each highscore page
    for (var i = AllData.length - 1; i >= 0; i--) {
        //trim any datasets that are too short to be real json
        var json = "" + AllData[i];
        if (json.length < 12) {
            AllData.pop(); //THIS ONLY WORKS BECAUSE BLANK LINE IS ALWAYS LAST.
            console.log("Data trimmed to " + AllData.length + " sets of json. (hint: should be 12)");
            continue; //skip blank lines
        }
    }
    //var the_guilds:string[] = fn_ParseAllGuildNames(AllData);
    var the_characters = fn_ParseAllCharacterNames(AllData);
    the_charactersobject = fn_ParseAllCharacters(AllData);
    //loop each character and total their skills into the ._total attribute
    for (var _i = 0, the_charactersobject_1 = the_charactersobject; _i < the_charactersobject_1.length; _i++) {
        var character = the_charactersobject_1[_i];
        character.FindTotal();
    }
    //Sort characters from smallest to largest
    the_charactersobject = _.sortBy(the_charactersobject, "_total");
};
//Accepts user input for ALLCHART
var fn_AllChart = function () {
    //grab users input
    var delimiter = "|";
    var userInput = $("#allInput").val() + delimiter;
    console.log("User entered: " + userInput);
    //lowercase user input for less friction
    userInput = userInput.toLowerCase();
    //Split up user input into an array
    var userinput_array = fn_SplitString(userInput, delimiter);
    var thisSet = [];
    labels = [];
    //GUILD handling //var myRegEx = /\(/g;
    if (fn_InStr(userInput, "(")) {
        for (var _i = 0, userinput_array_1 = userinput_array; _i < userinput_array_1.length; _i++) {
            var guild = userinput_array_1[_i];
            for (var _a = 0, the_charactersobject_2 = the_charactersobject; _a < the_charactersobject_2.length; _a++) {
                var character = the_charactersobject_2[_a];
                if (guild.indexOf(character._guild) !== -1) {
                    labels.push(character._displayName);
                    thisSet.push(character);
                }
            }
        }
    }
    else {
        for (var _b = 0, userinput_array_2 = userinput_array; _b < userinput_array_2.length; _b++) {
            var value = userinput_array_2[_b];
            for (var _c = 0, the_charactersobject_3 = the_charactersobject; _c < the_charactersobject_3.length; _c++) {
                var character = the_charactersobject_3[_c];
                if (value.indexOf(character._name) !== -1) {
                    labels.push(character._displayName);
                    thisSet.push(character);
                }
            }
        }
    }
    //build each set of data
    alchemyArray = [], carpentryArray = [], combatArray = [], cookingArray = [], fishingArray = [], gatheringArray = [];
    magicArray = [], miningArray = [], smithingArray = [], speedArray = [], tailoringArray = [], woodcuttingArray = [];
    for (var _d = 0, thisSet_1 = thisSet; _d < thisSet_1.length; _d++) {
        var character = thisSet_1[_d];
        alchemyArray.push(character._alchemy);
        carpentryArray.push(character._carpentry);
        combatArray.push(character._combat);
        cookingArray.push(character._cooking);
        fishingArray.push(character._fishing);
        gatheringArray.push(character._gathering);
        magicArray.push(character._magic);
        miningArray.push(character._mining);
        smithingArray.push(character._smithing);
        speedArray.push(character._speed);
        tailoringArray.push(character._tailoring);
        woodcuttingArray.push(character._woodcutting);
        //add all data to the combined dataSets
        dataSets.push(alchemyArray, carpentryArray, combatArray, cookingArray);
    }
    //set chart data
    var ctx = document.getElementById("all-Chart");
    var data = {
        labels: labels,
        datasets: [{
                label: "Magic",
                backgroundColor: "rgb(125, 47, 198)",
                borderColor: "rgb(125, 47, 198)",
                data: magicArray
            }, {
                label: "Alchemy",
                backgroundColor: "rgb(47, 198, 183)",
                borderColor: "rgb(47, 198, 183)",
                data: alchemyArray
            }, {
                label: "Carpentry",
                backgroundColor: "rgb(198, 165, 47)",
                borderColor: "rgb(198, 165, 47)",
                data: carpentryArray
            }, {
                label: "Combat",
                backgroundColor: "rgb(99, 0, 0)",
                borderColor: "rgb(99, 0, 0)",
                data: combatArray
            }, {
                label: "Cooking",
                backgroundColor: "rgb(195, 198, 47)",
                borderColor: "rgb(195, 198, 47)",
                data: cookingArray
            }, {
                label: "Fishing",
                backgroundColor: "rgb(47, 117, 198)",
                borderColor: "rgb(47, 117, 198)",
                data: fishingArray
            }, {
                label: "Gathering",
                backgroundColor: "rgb(162, 198, 47)",
                borderColor: "rgb(162, 198, 47)",
                data: gatheringArray
            }, {
                label: "Mining",
                backgroundColor: "rgb(109, 109, 109)",
                borderColor: "rgb(109, 109, 109)",
                data: miningArray
            }, {
                label: "Smithing",
                backgroundColor: "rgb(40, 40, 40)",
                borderColor: "rgb(40, 40, 40)",
                data: smithingArray
            }, {
                label: "Speed",
                backgroundColor: "rgb(198, 47, 67)",
                borderColor: "rgb(198, 47, 67)",
                data: speedArray
            }, {
                label: "Tailoring",
                backgroundColor: "rgb(198, 117, 47)",
                borderColor: "rgb(198, 117, 47)",
                data: tailoringArray
            }, {
                label: "Woodcutting",
                backgroundColor: "rgb(102, 56, 16)",
                borderColor: "rgb(102, 56, 16)",
                data: woodcuttingArray
            }
        ]
    };
    console.log(typeof (AllChart));
    //update chart data if already created
    if (typeof (AllChart) == "object") {
        console.log("ALF!!!");
        AllChart.config.data = data;
        AllChart.update();
    }
    else {
        AllChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    xAxes: [{ stacked: true, ticks: { autoSkip: false } }],
                    yAxes: [{ stacked: true }]
                }
            }
        });
    }
    //console.log(typeof(AllChart.config.data.datasets));
};
// -------------- { functions } -----------------
//Parses all characters out of data input and creates new character objects
var fn_ParseAllCharacters = function (para_InputJSON) {
    var returnArray = []; //???
    var shortlist_characters = [];
    //loop each set of data (alchemy, cooking, etc)
    for (var i = para_InputJSON.length - 1; i >= 0; i--) {
        //put the current json set of into an object
        var HighScoreSet = JSON.parse(para_InputJSON[i]);
        //console.log(HighScoreSet.url);
        //for each row item
        for (var x = HighScoreSet.result.extractorData.data["0"].group.length - 1; x >= 0; x--) {
            var gains = HighScoreSet.result.extractorData.data["0"].group[x].gains["0"].text;
            gains = gains.replaceAll(',', '');
            gains = parseFloat(gains);
            //grab the character's name
            var playername = HighScoreSet.result.extractorData.data["0"].group[x].player["0"].text;
            //grab guild name
            if (HighScoreSet.result.extractorData.data["0"].group[x].Guild) {
                var Guild = HighScoreSet.result.extractorData.data["0"].group[x].Guild["0"].text;
            }
            else {
                var Guild = "Guildless";
            }
            //index the current character
            var searchableplayername = playername.toLowerCase();
            var selectedchar = shortlist_characters.indexOf(searchableplayername);
            if (selectedchar == -1) {
                var newchar = new Character(playername, Guild);
                shortlist_characters.push(searchableplayername);
                returnArray.push(newchar);
                var selectedchar = shortlist_characters.indexOf(searchableplayername);
            }
            for (var _i = 0, returnArray_1 = returnArray; _i < returnArray_1.length; _i++) {
                var character = returnArray_1[_i];
                //grab the skill name
                var regex = /highscores\/(.+)\//g;
                var expression = regex.exec(HighScoreSet.url);
                switch (expression[1]) {
                    case "alchemy":
                        returnArray[selectedchar]._alchemy = gains;
                        break;
                    case "carpentry":
                        returnArray[selectedchar]._carpentry = gains;
                        break;
                    case "combat":
                        returnArray[selectedchar]._combat = gains;
                        break;
                    case "cooking":
                        returnArray[selectedchar]._cooking = gains;
                        break;
                    case "fishing":
                        returnArray[selectedchar]._fishing = gains;
                        break;
                    case "gathering":
                        returnArray[selectedchar]._gathering = gains;
                        break;
                    case "magic":
                        returnArray[selectedchar]._magic = gains;
                        break;
                    case "mining":
                        returnArray[selectedchar]._mining = gains;
                        break;
                    case "smithing":
                        returnArray[selectedchar]._smithing = gains;
                        break;
                    case "speed":
                        returnArray[selectedchar]._speed = gains;
                        break;
                    case "tailoring":
                        returnArray[selectedchar]._tailoring = gains;
                        break;
                    case "woodcutting":
                        returnArray[selectedchar]._woodcutting = gains;
                        break;
                }
            }
        }
    }
    //console.log(returnArray);
    return returnArray;
};
//Makes shortlist of all guilds in data input
var fn_ParseAllGuildNames = function (para_InputJSON) {
    var guild_shortlist = [];
    var Guild;
    for (var i = para_InputJSON.length - 1; i >= 0; i--) {
        //put the current json set of into an object
        var HighScoreSet = JSON.parse(para_InputJSON[i]);
        //for each row item
        for (var x = HighScoreSet.result.extractorData.data["0"].group.length - 1; x >= 0; x--) {
            //grab guild name
            if (HighScoreSet.result.extractorData.data["0"].group[x].Guild) {
                Guild = HighScoreSet.result.extractorData.data["0"].group[x].Guild["0"].text;
            }
            else {
                Guild = "Guildless";
            }
            //add to array if not already present
            if (guild_shortlist.indexOf(Guild) == -1) {
                guild_shortlist.push(Guild);
            }
            else {
                //do nothing
            }
        }
    }
    return guild_shortlist;
};
//Makes shortlist of all characters in data input
var fn_ParseAllCharacterNames = function (para_InputJSON) {
    //retrieve data out of json sets
    var character_shortlist = [];
    for (var i = para_InputJSON.length - 1; i >= 0; i--) {
        //parse the current json
        var HighScoreSet = JSON.parse(para_InputJSON[i]);
        //for each row item
        for (var x = HighScoreSet.result.extractorData.data["0"].group.length - 1; x >= 0; x--) {
            //grab the character's name
            var playername = HighScoreSet.result.extractorData.data["0"].group[x].player["0"].text;
            //add to array if not already present
            if (character_shortlist.indexOf(playername) == -1) {
                character_shortlist.push();
            }
        }
    }
    return character_shortlist;
};
//Select a RGB color for input
var fn_MakeRGB = function (para_Input, para_Guild) {
    if (para_Guild === void 0) { para_Guild = "alf"; }
    var Goon_Guilds = ["(EGGS)", "(NaCl)", "(cone?)", "(Pepsi.)", "(****)", "(:coal:)", "(MULTIS)", "(YAMS)", "(goose)", "(~worms~)", "(cone)", "(GOONS)"];
    if (Goon_Guilds.indexOf(para_Guild) != -1) {
        return "rgba(0,0,0,";
    }
    return "rgba(" + para_Input[0] + "," + para_Input[1] + "," + para_Input[2] + ",";
};
//inString function
var fn_InStr = function (para_String, para_needle) {
    var Output = para_String.indexOf(para_needle);
    if (Output === -1) {
        return false;
    }
    else {
        return true;
    }
};
//Split a string to an array
var fn_SplitString = function (para_input, para_delimiter) {
    para_input = "" + para_input;
    var returnval = para_input.split(para_delimiter);
    return returnval;
};
//Capitalize first character of input string. Better than messing with the string prototype
function fn_CapitalizeFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
