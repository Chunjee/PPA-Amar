//Extend Chart with a plugin for center text as an option
Chart.pluginService.register({
    afterUpdate: function (chart) {
        if (chart.config.options.elements.center) {
            var helpers = Chart.helpers;
            var centerConfig = chart.config.options.elements.center;
            var globalConfig = Chart.defaults.global;
            var ctx = chart.chart.ctx;
            var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
            var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);
            if (centerConfig.fontSize)
                var fontSize = centerConfig.fontSize;
            else {
                ctx.save();
                var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
                var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
                var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);
                do {
                    ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
                    var textWidth = ctx.measureText(maxText).width;
                    // check if it fits, is within configured limits and that we are not simply toggling back and forth
                    if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                        fontSize += 1;
                    else {
                        // reverse last step
                        fontSize -= 1;
                        break;
                    }
                } while (true);
                ctx.restore();
            }
            // save properties
            chart.center = {
                font: helpers.fontString(fontSize, fontStyle, fontFamily),
                fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
            };
        }
    },
    afterDraw: function (chart) {
        if (chart.center) {
            var centerConfig = chart.config.options.elements.center;
            var ctx = chart.chart.ctx;
            ctx.save();
            ctx.font = chart.center.font;
            ctx.fillStyle = chart.center.fillStyle;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            ctx.fillText(centerConfig.text, centerX, centerY);
            ctx.restore();
        }
    },
});
//Global variables -_-"
var myVar; //Stores timers
var AllData; //Stores all json sets from separate page
var allguilds; //all guilds
var builtdata = [];
var chartdata = {
    labels: ["Woodcutting", "Tailoring", "Speed", "Smithing", "Mining", "Magic", "Gathering", "Fishing", "Cooking", "Combat", "Carpentry", "Alchemy"]
};
var combatreduce = 3;
var colorarray = [[220, 220, 220], [151, 187, 205], [247, 70, 74], [70, 191, 189], [253, 180, 92], [148, 159, 117], [148, 177, 0], [77, 83, 96], [255, 180, 99], [99, 255, 112], [255, 99, 130], [193, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 99, 130], [125, 255, 99], [255, 180, 99], [255, 180, 99], [99, 255, 112], [255, 99, 216], [193, 99, 255], [75, 192, 192], [99, 99, 255], [333, 333, 333], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255], [255, 180, 99], [99, 255, 112], [255, 99, 130], [255, 99, 216], [193, 99, 255], [99, 99, 255]];
//[255,180,99],[99,255,112],[255,99,130],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,99,130],[125,255,99],[255,180,99],[255,180,99],[99,255,112],[255,99,216],[193,99,255],[75,192,192],[99,99,255],[333,333,333],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255],[255,180,99],[99,255,112],[255,99,130],[255,99,216],[193,99,255],[99,99,255]
var canvas = document.getElementById('myChart'), ctx = canvas.getContext('2d');
// Create main with no data
var LiveChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Woodcutting", "Tailoring", "Speed", "Smithing", "Mining", "Magic", "Gathering", "Fishing", "Cooking", "Combat", "Carpentry", "Alchemy"],
        datasets: []
    },
    options: {
        tooltips: {
            mode: "label"
        },
        hover: {
            mode: "single"
        }
    }
});
//Add .replaceAll to string prototype - AVOID in the future
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
//Create Progress Pie Chart(s)
var progressChart = document.getElementById('progressChart1'), progressctx = progressChart.getContext('2d');
var progressChart = new Chart(progressctx, {
    type: 'doughnut',
    data: {
        labels: [
            "Done",
            "Not Done"
        ],
        datasets: [
            {
                data: [99, 1],
                backgroundColor: [
                    "#36A2EB",
                    "#FF6384"
                ],
                hoverBackgroundColor: [
                    "#137bc1",
                    "#ff1748"
                ]
            }
        ]
    },
    options: {
        legend: {
            display: false
        },
        elements: {
            center: {
                maxText: '100%',
                text: '99%'
            }
        }
    }
});
var progressChart2 = document.getElementById('progressChart2'), progressctx = progressChart2.getContext('2d');
var progressChart2 = new Chart(progressctx, {
    type: 'doughnut',
    data: {
        labels: [
            "Done",
            "Not Done"
        ],
        datasets: [
            {
                data: [10, 90],
                backgroundColor: [
                    "#36A2EB",
                    "#FF6384"
                ],
                hoverBackgroundColor: [
                    "#137bc1",
                    "#ff1748"
                ]
            }
        ]
    },
    options: {
        legend: {
            display: false
        },
        elements: {
            center: {
                maxText: '100%',
                text: '10%'
            }
        }
    }
});
/* CHARACTER CHART DISABLED
var CharacterChart = document.getElementById('character-Chart'),
characterctx = CharacterChart.getContext('2d');
var CharacterChart = new Chart(characterctx, {
    type: 'bar',
    data: {
        labels: ["Gains"],
        datasets: []
        }
});
*/
//Go! button functionality
$("#GO").on("click", function () {
    //stop any timer in progress
    clearInterval(myVar);
    //grab users input
    var delimiter = "|";
    var userInput = $("#UserInput").val() + delimiter;
    //var chartStyle = $("#chartStyle").val();
    //LiveChart.config.type = chartStyle;
    //console.log(LiveChart.config);
    combatreduce = $("#combatreduce").val();
    console.log("User entered: " + userInput);
    //Split up user input into an array
    var userinput_array = fn_SplitString(userInput, delimiter);
    //if one of the user inputs is "all"
    if (userinput_array.indexOf("all") != -1) {
        //clear all user input and replace with every guild
        userinput_array = [];
        for (var i = allguilds.length - 1; i >= 0; i--) {
            userinput_array.push(allguilds[i].name);
        }
    }
    if (userinput_array.indexOf("top20") != -1) {
        //clear all user input and replace with every guild
        userinput_array = [];
        for (var i = allguilds.length - 1; i > 30; i--) {
            userinput_array.push(allguilds[i].name);
        }
    }
    //
    if (userInput == "top 40|") {
        for (var i = allguilds.length - 1; i >= 20; i--) {
            userinput_array.push(allguilds[i].name);
        }
    }
    //clear existing chart data and populate with data that matches user's input
    chartdata.datasets = [];
    for (var i = userinput_array.length - 1; i >= 0; i--) {
        //created new datasets with user input   
        chartdata.datasets.push(fn_BuildOneChartDataSet(builtdata, userinput_array[i]));
    }
    //remove any invalid datasets, usually caused by invalid or mispelled user input
    chartdata.datasets = $.grep(chartdata.datasets, function (n) { return n == 0 || n; });
    LiveChart.config.data = chartdata;
    //update the chart with new data
    LiveChart.update();
});
//Character-Button
/* //DISABLED
$("#CharacterButton").on( "click", function() {
    //stop any timer in progress
    clearInterval(myVar);

    //grab users input
    var delimiter = "|"
    var userInput = $("#characterInput").val() + delimiter;
    console.log("User entered: " + userInput);
    
    //Split up user input into an array
    var userinput_array = fn_SplitString(userInput , delimiter);
    
    
    var myRegEx = /\(/g;
    if (myRegEx.test(userinput_array[0])) {
        console.log("user interested in guild name");
        //clear all user input and replace with every guild
        userinput_array = fn_GetAllGuildMembers(AllData,userinput_array[0]);
    }
    console.log(userinput_array);

    
    var sortablecharacterset = [];
        //build the sortable list of each player
        for (var i = userinput_array.length - 1; i >= 0; i--) {
            var player = userinput_array[i];
            var gains = fn_GetCharacterStats(AllData,player);
            sortablecharacterset.push({name: player, gains: gains});
        }
        //sort the list and flip it
        sortablecharacterset = _.sortBy(sortablecharacterset, "gains").reverse();

        //build the datasets
        var allcharadata = [];
        for (var i = sortablecharacterset.length - 1; i >= 0; i--) {
            //push new dataset onto the array
            allcharadata.push({
                label: sortablecharacterset[i].name,
                backgroundColor: fn_MakeRGB(colorarray[i]) + "0.2)",
                borderColor: fn_MakeRGB(colorarray[i]) + "1)",
                borderWidth: 3,
                hoverBackgroundColor: fn_MakeRGB(colorarray[i]) + "0.6)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: fn_MakeRGB(colorarray[i]) + "1)",
                data: [sortablecharacterset[i].gains],
                pointRadius: 4,
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                pointHoverBorderWidth: 4,
                pointHitRadius: 6
            })
        };


    //clear existing chart data and populate with data that matches user's input
    CharacterChart.config.data.datasets = allcharadata
    CharacterChart.update();
});




function fn_GetCharacterStats(para_InputJSON,para_username) {
//retrieve data out of json sets
    var character_shortlist = [];
    var character_array = [];
    var total = 0;

    for (var i = para_InputJSON.length - 1; i >= 0; i--) {
        //parse the current json
        var HighScoreSet = JSON.parse(para_InputJSON[i]);

        //for each row item
        for (var x = HighScoreSet.result.extractorData.data["0"].group.length - 1; x >= 0; x--) {

            //grab the character's name
            var playername = HighScoreSet.result.extractorData.data["0"].group[x].player["0"].text
            //is the user interested in this character? skip unless yes
            if (para_username != playername) {
                continue;
            }
            //console.log("Found data about " + playername);
            //grab the gains and parse
            var gains = HighScoreSet.result.extractorData.data["0"].group[x].gains["0"].text;
            gains = gains.replaceAll(',','');
            gains = parseFloat(gains);
            var total = gains + total;
        }
    }
    return total;
}



function dumb_GetCharacterStats(para_InputJSON,para_userarray,para_option) {
//retrieve data out of json sets
    var character_shortlist = [];
    var character_array = [];

    for (var i = para_InputJSON.length - 1; i >= 0; i--) {
        //parse the current json
        var HighScoreSet = JSON.parse(para_InputJSON[i]);

        //for each row item
        for (var x = HighScoreSet.result.extractorData.data["0"].group.length - 1; x >= 0; x--) {

            //grab the character's name
            var playername = HighScoreSet.result.extractorData.data["0"].group[x].player["0"].text
            //is the user interested in this character? skip unless yes
            if (para_userarray.indexOf(playername) == -1) {
                continue;
            }
            console.log("Found data about " + playername);
            //grab the gains and parse
            var gains = HighScoreSet.result.extractorData.data["0"].group[x].gains["0"].text;
            gains = gains.replaceAll(',','');
            gains = parseFloat(gains);

            //determine if already in array
            var index = character_shortlist.indexOf(playername);
            if (index == -1) { //not in the array, add
                character_array.push({name: playername, total: gains});
                character_shortlist.push(playername);
            } else {
                var current = parseFloat(character_array[index].total);
                gains = gains + current;
                character_array[index].total = gains;
            }
        }
        console.log(character_array);
    }
    //console.log(character_array);
    var returnobj = [];
    if (para_option == "combinedstats") {
        for (var x = character_array.length - 1; x >= 0; x--) {
            returnobj.push(character_array[x].total);
        }
    }
    if (para_option == "para_option") {
        for (var x = character_array.length - 1; x >= 0; x--) {
            returnobj.push(character_array[x].name);
        }
    }
    return returnobj;
}

function fn_GetAllGuildMembers(para_InputJSON,para_GuildName) {
    var members_shortlist = [];
    var members_array = [];
    var Guild;
    //loop each set of data (alchemy, cooking, etc)
    for (var i = para_InputJSON.length - 1; i >= 0; i--) {
        //put the current json set of into an object
        var HighScoreSet = JSON.parse(para_InputJSON[i]);
        //console.log(HighScoreSet);

        //for each row item
        for (var x = HighScoreSet.result.extractorData.data["0"].group.length - 1; x >= 0; x--) {

            //grab guild name
            if (HighScoreSet.result.extractorData.data["0"].group[x].Guild) {
                Guild = HighScoreSet.result.extractorData.data["0"].group[x].Guild["0"].text;
            } else {
                Guild = "Guildless";
            }
            //skip if guild is not the same as the one we are interested in
            if (Guild != para_GuildName) {
                continue;
            }

            //grab the character's name
            var playername = HighScoreSet.result.extractorData.data["0"].group[x].player["0"].text

            //determine if already in array
            var index = members_shortlist.indexOf(playername);
            if (index == -1) { //not in the array, add
                //guild_array.push({name: Guild, total: gains});
                members_shortlist.push(playername);
            }
        }
    }
    return members_shortlist;
};
*/
//MAIN
function Fn_Main(para_ExternalData) {
    //split the file into each JSON section. separated by /newline
    AllData = fn_SplitString(para_ExternalData, "\n");
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
    //get allguilds array from function and sort
    allguilds = fn_FindAllGuilds(AllData);
    allguilds = _.sortBy(allguilds, "total");
    //slice a portion of guilds to be used in the initial page load
    initial_allguilds = allguilds.slice(allguilds.length - 8, allguilds.length);
    console.log("Total Guilds Detected: " + allguilds.length);
    for (var i = allguilds.length - 1; i >= 0; i--) {
        builtdata.push(fn_BuildData(allguilds[i].name, AllData));
    }
    ;
    //set timer and run once instantly
    fn_AddEachGuild();
    myVar = setInterval(function () { fn_AddEachGuild(); }, 2200);
}
; //End of fn_Main
function fn_AddEachGuild() {
    if (!chartdata.datasets) {
        console.log("made into an array");
        chartdata.datasets = [];
    }
    while (initial_allguilds.length >= 7) {
        //drop guild data off till there are only 6 remaining
        initial_allguilds.shift();
    }
    var alf = initial_allguilds.shift();
    chartdata.datasets.unshift(fn_BuildOneChartDataSet(builtdata, alf.name));
    LiveChart.config.data = chartdata;
    LiveChart.update();
    //don't do this anymore after [x]
    if (initial_allguilds.length <= 0) {
        console.log("timer stopped");
        clearInterval(myVar);
    }
}
//http://jsfiddle.net/rferreiraperez/pevy7vsz/5/
function fn_buildalldata(para_InputJSON) {
    ///NEW - Build array of each character object
    var returnArray = [];
    var shortlist_characters = [];
    //loop each set of data (alchemy, cooking, etc)
    for (var i = para_InputJSON.length - 1; i >= 0; i--) {
        //put the current json set of into an object
        var HighScoreSet = JSON.parse(para_InputJSON[i]);
        //for each row item
        for (var x = HighScoreSet.result.extractorData.data["0"].group.length - 1; x >= 0; x--) {
            var gains = HighScoreSet.result.extractorData.data["0"].group[x].gains["0"].text;
            gains = gains.replaceAll(',', '');
            gains = parseFloat(gains);
            //send time to <h3> so user can read it. Only do this once
            if (!sentdate) {
                sentdate = true;
                var d = new Date(HighScoreSet.result.timestamp);
                d = d.toLocaleString();
                d = fn_SplitString(d, ",");
                $("#date").replaceWith("<span>" + d[0] + "</span>");
            }
            //grab guild name
            if (HighScoreSet.result.extractorData.data["0"].group[x].Guild) {
                Guild = HighScoreSet.result.extractorData.data["0"].group[x].Guild["0"].text;
            }
            else {
                Guild = "Guildless";
            }
            //determine if already in array
            var index = guild_shortlist.indexOf(Guild);
            if (index == -1) {
                guild_array.push({ name: Guild, total: gains });
                guild_shortlist.push(Guild);
            }
            else {
                var current = parseFloat(guild_array[index].total);
                gains = gains + current;
                guild_array[index].total = gains;
            }
        }
    }
    return guild_array;
}
;
function fn_FindAllGuilds(para_InputJSON) {
    ///Find each guild and how much total exp they have on the highscore pages
    var guild_shortlist = [];
    var guild_array = [];
    var Guild;
    var sentdate = false;
    //loop each set of data (alchemy, cooking, etc)
    for (var i = para_InputJSON.length - 1; i >= 0; i--) {
        //put the current json set of into an object
        var HighScoreSet = JSON.parse(para_InputJSON[i]);
        //for each row item
        for (var x = HighScoreSet.result.extractorData.data["0"].group.length - 1; x >= 0; x--) {
            var gains = HighScoreSet.result.extractorData.data["0"].group[x].gains["0"].text;
            gains = gains.replaceAll(',', '');
            gains = parseFloat(gains);
            //send time to <h3> so user can read it. Only do this once
            if (!sentdate) {
                sentdate = true;
                var d = new Date(HighScoreSet.result.timestamp);
                d = d.toLocaleString();
                d = fn_SplitString(d, ",");
                $("#date").replaceWith("<span>" + d[0] + "</span>");
            }
            //grab guild name
            if (HighScoreSet.result.extractorData.data["0"].group[x].Guild) {
                Guild = HighScoreSet.result.extractorData.data["0"].group[x].Guild["0"].text;
            }
            else {
                Guild = "Guildless";
            }
            //determine if already in array
            var index = guild_shortlist.indexOf(Guild);
            if (index == -1) {
                guild_array.push({ name: Guild, total: gains });
                guild_shortlist.push(Guild);
            }
            else {
                var current = parseFloat(guild_array[index].total);
                gains = gains + current;
                guild_array[index].total = gains;
            }
        }
    }
    return guild_array;
}
;
function fn_BuildData(para_GuildName, para_InputJSON) {
    //vars we need
    var Skills_Obj = {};
    Skills_Obj.Map = para_GuildName;
    Skills_Obj.Array = [];
    // for each skill
    for (var i = para_InputJSON.length - 1; i >= 0; i--) {
        //always 0 out the combined
        var combined = 0;
        //put each set of json into 
        var HighScoreSet = JSON.parse(para_InputJSON[i]);
        //for each row item
        for (var x = HighScoreSet.result.extractorData.data["0"].group.length - 1; x >= 0; x--) {
            if (!HighScoreSet.result.extractorData.data["0"].group[x].Guild) {
                continue;
            }
            if (para_GuildName == HighScoreSet.result.extractorData.data["0"].group[x].Guild["0"].text) {
                var gains = HighScoreSet.result.extractorData.data["0"].group[x].gains["0"].text;
                gains = gains.replaceAll(',', '');
                gains = parseFloat(gains);
                combined = combined + gains;
            }
        }
        //console.log(HighScoreSet);
        Skills_Obj.Array.push(combined);
    }
    return Skills_Obj;
}
;
function fn_BuildDataWeighted(para_GuildName, para_InputJSON) {
    //vars we need
    var Skills_Obj = {};
    Skills_Obj.Map = para_GuildName;
    Skills_Obj.Array = [];
    var guild = "";
    // for each skill
    for (var i = para_InputJSON.length - 1; i >= 0; i--) {
        //always 0 out the combined and total
        var combined = 0;
        var total_Skill = 0;
        //put each set of json into 
        var HighScoreSet = JSON.parse(para_InputJSON[i]);
        //for each row item
        for (var x = HighScoreSet.result.extractorData.data["0"].group.length - 1; x >= 0; x--) {
            if (!HighScoreSet.result.extractorData.data["0"].group[x].Guild) {
                guild = "(Guildless)";
            }
            else {
                guild = HighScoreSet.result.extractorData.data["0"].group[x].Guild["0"].text;
            }
            var gains = HighScoreSet.result.extractorData.data["0"].group[x].gains["0"].text;
            //remove comas and parse to a float
            gains = parseFloat(gains.replaceAll(',', ''));
            total_Skill = total_Skill + gains;
            //Only log this if part of the currently selected guild
            if (para_GuildName == guild) {
                combined = combined + gains;
                var weighted = combined / total_Skill;
            }
        }
        console.log("weighted: " + weighted + "    from " + combined + "/" + total_Skill + " for: " + guild);
        Skills_Obj.Array.push(weighted);
    }
    return Skills_Obj;
}
;
function fn_BuildOneChartDataSet(para_InputJSON, para_GuildName) {
    //build one set of chart data for the suplied guildname
    var dataset;
    var boarderdash = 0;
    for (var x = para_InputJSON.length - 1; x >= 0; x--) {
        if (para_InputJSON[x].Map != para_GuildName) {
            continue;
        }
        //Cut combat down to user specified size
        var InputCopy = para_InputJSON[x].Array.slice();
        InputCopy[9] = Math.floor(InputCopy[9] / combatreduce);
        dataset = {
            label: para_InputJSON[x].Map,
            lineTension: 0.2,
            backgroundColor: fn_MakeRGB(colorarray[x], para_InputJSON[x].Map) + "0.2)",
            borderColor: fn_MakeRGB(colorarray[x], para_InputJSON[x].Map) + "1)",
            pointBackgroundColor: fn_MakeRGB(colorarray[x], para_InputJSON[x].Map) + "1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: fn_MakeRGB(colorarray[x], para_InputJSON[x].Map) + "1)",
            data: InputCopy,
            pointRadius: 4,
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 3,
            pointHitRadius: 10
        };
    }
    return dataset;
}
;
