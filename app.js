
'use strict';

console.log("Running",__filename,"...");

if("2" in process.argv){
    var url = process.argv[2];
}else{
    console.log("Please pass a valid URL as argument. Exiting process ...");
    process.exit();
}

var saveSentimentToLocalFile = function(pScrapedSentiment, pURL){

    var fs = require('fs')
    var data = JSON.stringify(pScrapedSentiment, null, '\t');
    var filedirectory = "./scrapedsentiment/"+pURL.extractDomainFromURL()+"/";

    if(!fs.existsSync(filedirectory)){
        fs.mkdirSync(filedirectory);
    }

    var filename = (new Date()).getTime();
    fs.writeFileSync(filedirectory+filename, data);
};

var printSentimentToConsole = function(pScrapedSentiment, pURL){
    console.log("\nSentiment:\n---------------");
    console.log("Score:",pScrapedSentiment.score);
    console.log("Comparative:",pScrapedSentiment.comparative);
};

var SentimentAnalysis = require('./SentimentAnalysis.js');
SentimentAnalysis.analyseWebPage(url, printSentimentToConsole);
