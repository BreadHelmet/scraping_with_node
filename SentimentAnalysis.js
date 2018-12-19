'use strict';

var request = require('request');
var sentiment = require('sentiment');
var fs = require('fs');
// var $ = require('jQuery');

String.prototype.decodeHTML = function() {
    var map = {"gt":">" /* , … */};
    return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
        if ($1[0] === "#") {
            return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16)  : parseInt($1.substr(1), 10));
        } else {
            return ' ';
        }
    });
};

var SentimentAnalysis = SentimentAnalysis || {};

SentimentAnalysis.extractTextFromHTML = function(pRawHtml){
	var tidy = pRawHtml;

	// strip style
	tidy = tidy.replace(/\<style(.[^\<]*)\<\/style\>/g, '');

	// strip scripts
	tidy = tidy.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/ig, '');

	// strip tags
	tidy = tidy.replace(/<(?:.|\n)*?>/gm, '');

	// strip html comments
	tidy = tidy.replace(/<!--[\s\S]*?-->/gm, '');

	// html entities
	tidy = tidy.decodeHTML();

	// trim whitespaces
	tidy = tidy.replace(/[\n|\n\r|\r|\v|\f|\t]+/g, ' ');
	tidy = tidy.replace(/(^\s+)|\s(?=\s+)|(\s+$)/g, '');

	return tidy;
};

SentimentAnalysis.breakIntoSentences = function(pText){
	return pText.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
};

SentimentAnalysis.extractDomainFromURL = function(pURL){
	var matches = pURL.match(/(?!(http|https)(:\/\/))+([\w]+\.){1}([\w]+\.?)+/);
	return (matches.length > 0) ? matches[0] : pURL.substring(10);
};

// use callback function to handle result
exports.analyseWebPage = function(pURL){

	var url = pURL;

	request(url, function(error, response, body){

		var tidy = SentimentAnalysis.extractTextFromHTML(body);

		var r1 = sentiment(tidy);
		var data = JSON.stringify(r1, null, '\t');

		var filedirectory = "./scrapedsentiment/";
		filedirectory += SentimentAnalysis.extractDomainFromURL(url)+"/";

		if(!fs.existsSync(filedirectory)){
		    fs.mkdirSync(filedirectory);
		}

		var date = new Date();
		var filename = date.getTime();

		fs.writeFileSync(filedirectory+filename, data);
	});
};
