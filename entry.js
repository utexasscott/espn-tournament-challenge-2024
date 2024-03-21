$(document).ready(function() {
    const teamAcronyms = {
        "CONN": "UConn",
        "STET": "Stetson",
        "FAU": "Florida Atlantic",
        "NU": "Northwestern",
        "SDSU": "San Diego State",
        "UAB": "UAB",
        "YALE": "Yale",
        "AUB": "Auburn",
        "BYU": "BYU",
        "DUQ": "Duquesne",
        "ILL": "Illinois",
        "MHS": "Morehead State",
        "WSU": "Washington State",
        "DRKE": "Drake",
        "ISU": "Iowa State",
        "SDST": "S Dakota St",
        "HOU": "Houston",
        "LW": "Longwood",
        "TAM": "Texas A&M",
        "NEB": "Nebraska",
        "WIS": "Wisconsin",
        "JMU": "James Madison",
        "DUKE": "Duke",
        "VMT": "Vermont",
        "TTU": "Texas Tech",
        "NCSU": "North Carolina State",
        "UK": "Kentucky",
        "OAK": "Oakland",
        "COLO": "Colorado",
        "MARQ": "Marquette",
        "WKU": "Western Kentucky",
        "UNC": "North Carolina",
        "WAG": "Wagner",
        "MSU": "Michigan St",
        "SMC": "Saint Mary's",
        "ALA": "Alabama",
        "COFC": "Charleston",
        "CLEM": "Clemson",
        "UNM": "New Mexico",
        "BAY": "Baylor",
        "COL": "Colgate",
        "DAY": "Dayton",
        "NEV": "Nevada",
        "ARIZ": "Arizona",
        "LBSU": "Long Beach St",
        "PUR": "Purdue",
        "TCU": "TCU",
        "GONZ": "Gonzaga",
        "MCN": "McNeese",
        "KU": "Kansas",
        "SAM": "Samford",
        "SC": "South Carolina",
        "ORE": "Oregon",
        "CREI": "Creighton",
        "AKR": "Akron",
        "TEX": "Texas",
        "CSU": "Colorado St",
        "TENN": "Tennessee",
        "FLA": "Florida"
    };

    const teamSeeds = {};
      
    // wait 3 seconds and then run the code
    setTimeout(function(){
        // set team seeds
        $('.BracketOutcome-label').each(function() {
            var teamName = $(this).text();
            var seed = $(this).parent().find('.BracketOutcome-metadata').text();
            teamSeeds[teamName] = seed;
            // log it
            console.log(teamName + ' ' + seed);
        });
        // change the text of the element with the class BracketPropositionHeaderDesktop-label
        $('.BracketProposition-matchupSection').each(function() {
            if ($(this).text().includes("over")) {
                // Get the text from the pickText and pickSubText elements
                var teamAcronym1 = $(this).find('.BracketPropositionHeaderDesktop-pickText').text().trim();
                var teamAcronym2 = $(this).find('.BracketPropositionHeaderDesktop-pickSubText').text().trim().split(' ')[1];

                // Get the placeholder elements
                var placeholders = $(this).find('.BracketOutcomeBlank-placeholder');
                
                // Place the text into the placeholders
                if (placeholders.length >= 2) {
                    // get team name from acronyms. if not found, use the acronym
                    var team1 = teamAcronyms[teamAcronym1] || teamAcronym1;
                    var team2 = teamAcronyms[teamAcronym2] || teamAcronym2;
                    var team1Seed = teamSeeds[team1] || '';
                    var team2Seed = teamSeeds[team2] || '';
                    placeholders[0].textContent = team1;
                    $(placeholders[0]).before("<div class='BracketOutcome-metadata'>" + team1Seed + "</div>");
                    placeholders[1].textContent = team2;
                    $(placeholders[1]).before("<div class='BracketOutcome-metadata'>" + team2Seed + "</div>");
                }
                else if (placeholders.length === 1) {
                    // find the correct team name
                    var correctTeamName = $(this).find('.BracketOutcome-label').text().trim();
                    var incorrectPath = $(this).find('.PickIncorrect-crossMark');
                    if (incorrectPath.length > 0) {
                        var team = teamAcronyms[teamAcronym2] || teamAcronym2;
                    } else {
                        var team = teamAcronyms[teamAcronym1] || teamAcronym1;
                        if (team == correctTeamName) {
                            team = teamAcronyms[teamAcronym2] || teamAcronym2;
                        }
                    }
                    var teamSeed = teamSeeds[team] || '';
                    placeholders[0].textContent = team;
                    $(placeholders[0]).before("<div class='BracketOutcome-metadata'>" + teamSeed + "</div>");
                }
            }
            var summarySpan = $(this).find('.BracketPropositionHeaderDesktop-summary');
            if (summarySpan.length > 0) {
                
                // Set the variable "pickedTeamAcronym" where "MSST" is found
                let pickedTeamAcronym = $(this).find('.BracketPropositionHeaderDesktop-pickText').text().trim();
                let pickedTeamName = teamAcronyms[pickedTeamAcronym] || pickedTeamAcronym;
            
                // Determine which team has the higher score and save that team name to "winningTeamName"
                let outcomes = $(this).find('.BracketOutcomeList-outcome');
                let winningTeamName = '';
                let highestScore = 0;
                let lowestScore = 0;
            
                outcomes.each(function() {
                    let score = parseInt($(this).find('.BracketOutcome-score').text(), 10);
                    let teamName = $(this).find('.BracketOutcome-label').text();
                
                    if (score > highestScore) {
                        highestScore = score;
                        winningTeamName = teamName;
                    }
                });
                if (lowestScore == highestScore) {
                    $(this).parent().addClass('improved-activeTie');
                }
                if (winningTeamName == pickedTeamName) {
                    $(this).parent().addClass('improved-activeWinning');
                } else {
                    $(this).parent().addClass('improved-activeLosing');
                }
            }
            
            var correctPath = $(this).find('.PickCorrect-checkMark');
            if (correctPath.length > 0) {
                $(this).parent().addClass('improved-won');
            }
            var incorrectPath = $(this).find('.PickIncorrect-crossMark');
            if (incorrectPath.length > 0) {
                $(this).parent().addClass('improved-lost');
            }
        });
    }, 3000);

});
