'use strict';

console.log("Running",__filename,"...");

var saveSentimentToLocalFolder = function(pScrapedSentiment, pURL){
    // TODO -

    var url = pURL;
    var data = JSON.stringify(pScrapedSentiment, null, '\t');

    var filedirectory = "./scrapedsentiment/";
    filedirectory += SentimentAnalysis.extractDomainFromURL(url)+"/";

    if(!fs.existsSync(filedirectory)){
        fs.mkdirSync(filedirectory);
    }

    var date = new Date();
    var filename = date.getTime();

    fs.writeFileSync(filedirectory+filename, data);

    // console.log("inside function saveSentimentToLocalFolder");
};

var SentimentAnalysis = require('./SentimentAnalysis.js');
var url = "https://quillette.com/2018/12/18/confessions-of-a-soulless-troglodyte-how-my-brooklyn-literary-friendships-fell-apart-in-the-age-of-trump/";
SentimentAnalysis.analyseWebPage( url, saveSentimentToLocalFolder );
