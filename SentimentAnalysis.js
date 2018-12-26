
var request = require('request');
var Sentiment = require('sentiment');
var fs = require('fs');
require('./StringPrototypes.js');

var SentimentAnalysis = SentimentAnalysis || {};
SentimentAnalysis.extractTextFromHTML = function(pRawHtml){
    return pRawHtml.stripStyles().stripScripts().stripTags().stripComments().decodeHTML().trimWhitespace();
};

exports.analyseWebPage = function(pURL, pHandleResult){
    var url = pURL;
    request(url, function(error, response, body){

		var text = SentimentAnalysis.extractTextFromHTML(body);
		var sent = (new Sentiment()).analyze(text);

        if( typeof pHandleResult === 'function' ){
            pHandleResult( sent, pURL );
            return;
        }
	});
};
