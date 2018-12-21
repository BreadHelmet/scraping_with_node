console.log("running app.js");

var SentimentAnalysis = require('./SentimentAnalysis.js');
var url = "https://quillette.com/2018/12/18/confessions-of-a-soulless-troglodyte-how-my-brooklyn-literary-friendships-fell-apart-in-the-age-of-trump/";
SentimentAnalysis.analyseWebPage( url );
