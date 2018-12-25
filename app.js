'use strict';

// console.log("2" in process.argv);process.exit();

console.log("Running",__filename,"...");
// console.log(typeof process.argv);process.exit();
// if("2" in process.argv)
//     console.log("process.argv[2] = ",process.argv[2]);

//console.log("argv:", process.argv);
// process.exit();


if("2" in process.argv){
    var url = process.argv[2];
}else{
    console.log("Please pass a valid URL as argument. Exiting process ...");
    process.exit();
}

var saveSentimentToLocalFolder = function(pScrapedSentiment, pURL){

    var fs = require('fs')

    var url = pURL;
    var data = JSON.stringify(pScrapedSentiment, null, '\t');

    var filedirectory = "./scrapedsentiment/"+url.extractDomainFromURL()+"/";
    // filedirectory += SentimentAnalysis.extractDomainFromURL(url)+"/";

    if(!fs.existsSync(filedirectory)){
        fs.mkdirSync(filedirectory);
    }

    var date = new Date();
    var filename = date.getTime();

    fs.writeFileSync(filedirectory+filename, data);

    // console.log("inside function saveSentimentToLocalFolder");
};

var printSentimentToConsole = function(pScrapedSentiment, pURL){
    console.log("\nSentiment:\n---------------");
    console.log("Score:",pScrapedSentiment.score);
    console.log("Comparative:",pScrapedSentiment.comparative);
};

var SentimentAnalysis = require('./SentimentAnalysis.js');
// var url = "https://nyheteridag.se/pepparkaksbrodernas-nya-masterverk-evighetsmaskin-med-rullande-chokladkulor/";

SentimentAnalysis.analyseWebPage( url, printSentimentToConsole );
