
var request = require('request');
var sentiment = require('sentiment');
var fs = require('fs');

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

// is this realy needed when strip tags is implemented?
String.prototype.stripStyles = function(){
    return this.replace(/\<style(.[^\<]*)\<\/style\>/g, '');
};

String.prototype.stripScripts = function(){
    return this.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/ig, '');
};

String.prototype.stripTags = function(){
    return this.replace(/<(?:.|\n)*?>/gm, '');
};

String.prototype.stripComments = function(){
    return this.replace(/<!--[\s\S]*?-->/gm, '');
};

String.prototype.trimWhitespace = function(){
    return this.replace(/[\n|\n\r|\r|\v|\f|\t]+/g, ' ').replace(/(^\s+)|\s(?=\s+)|(\s+$)/g, '');
};

var SentimentAnalysis = SentimentAnalysis || {};

SentimentAnalysis.extractTextFromHTML = function(pRawHtml){
	var tidy = pRawHtml;

    return tidy.stripStyles().stripScripts().stripTags().stripComments().decodeHTML().trimWhitespace();

	// // strip style
	// tidy = tidy.replace(/\<style(.[^\<]*)\<\/style\>/g, '');
    //
	// // strip scripts
	// tidy = tidy.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/ig, '');
    //
	// // strip tags
	// tidy = tidy.replace(/<(?:.|\n)*?>/gm, '');
    //
	// // strip html comments
	// tidy = tidy.replace(/<!--[\s\S]*?-->/gm, '');
    //
	// // html entities
	// tidy = tidy.decodeHTML();
    //
	// // trim whitespaces
	// tidy = tidy.replace(/[\n|\n\r|\r|\v|\f|\t]+/g, ' ');
	// tidy = tidy.replace(/(^\s+)|\s(?=\s+)|(\s+$)/g, '');
    //
	// return tidy;
};

SentimentAnalysis.breakIntoSentences = function(pText){
	return pText.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
};

SentimentAnalysis.extractDomainFromURL = function(pURL){
	var matches = pURL.match(/(?!(http|https)(:\/\/))+([\w]+\.){1}([\w]+\.?)+/);
	return (matches.length > 0) ? matches[0] : pURL.substring(10);
};

// use callback function to handle result


exports.analyseWebPage = function(pURL, pHandleResult){
    var url = pURL;
    request(url, function(error, response, body){

		var tidy = SentimentAnalysis.extractTextFromHTML(body);
		var sent = sentiment(tidy);

        // if( typeof pHandleResult === 'function' ){
        //     pHandleResult( sent, pURL );
        //     return;
        // }

		var data = JSON.stringify(sent, null, '\t');

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
