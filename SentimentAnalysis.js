
var request = require('request');
var Sentiment = require('sentiment');
var fs = require('fs');
require('./StringPrototypes.js');

var SentimentAnalysis = SentimentAnalysis || {};
SentimentAnalysis.extractTextFromHTML = function(pRawHtml){
    return pRawHtml.stripStyles().stripScripts().stripTags().stripComments().decodeHTML().trimWhitespace();
};

exports.analyseWebPage = function(pURL, pHandleResult){

	// TODO - use callback function to handle result

    var url = pURL;
    request(url, function(error, response, body){

		var text = SentimentAnalysis.extractTextFromHTML(body);
        // var sentiment = new Sentiment();
		var sent = (new Sentiment()).analyze(text);

        if( typeof pHandleResult === 'function' ){
            pHandleResult( sent, pURL );
            return;
        }

		// var data = JSON.stringify(sent, null, '\t');

		// var filedirectory = "./scrapedsentiment/"+url.extractDomainFromURL()+"/";

		// if(!fs.existsSync(filedirectory)){
		//     fs.mkdirSync(filedirectory);
		// }

		// var date = new Date();
		// var filename = date.getTime();

		// fs.writeFileSync(filedirectory+filename, data);
	});
};
