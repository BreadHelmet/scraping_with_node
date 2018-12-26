
var request = require('request');
var Sentiment = require('sentiment');
var fs = require('fs');
require('./StringPrototypes.js');

var SentimentAnalysis = SentimentAnalysis || {};
SentimentAnalysis.extractTextFromHTML = function(pRawHtml){
    return pRawHtml.stripStyles().stripScripts().stripTags().stripComments().decodeHTML().trimWhitespace();
};

exports.analyseWebPage = function(pURL, pHandleResult){
    request(pURL, function(error, response, body){

		var text = typeof body !== 'undefined'? SentimentAnalysis.extractTextFromHTML(body) : '';
		var sent = (new Sentiment()).analyze(text);

        if( typeof pHandleResult === 'function' ){
            pHandleResult( sent, pURL );
            return;
        }
	});
};
