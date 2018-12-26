
String.prototype.decodeHTML = String.prototype.decodeHTML || function(){
	var map = {"gt":">" /* , … */};
	return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
        if ($1[0] === "#") {
            return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16)  : parseInt($1.substr(1), 10));
        } else {
            return(' ');
        }
	});
};

String.prototype.stripStyles = String.prototype.stripStyles || function(){
    return this.replace(/\<style(.[^\<]*)\<\/style\>/g, '');
};

String.prototype.stripScripts = String.prototype.stripScripts || function(){
    return this.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/ig, '');
};

String.prototype.stripTags = String.prototype.stripTags || function(){
    return this.replace(/<(?:.|\n)*?>/gm, '');
};

String.prototype.stripComments = String.prototype.stripComments || function(){
    return this.replace(/<!--[\s\S]*?-->/gm, '');
};

String.prototype.trimWhitespace = String.prototype.trimWhitespace || function(){
    return this.replace(/[\n|\n\r|\r|\v|\f|\t]+/g, ' ').replace(/(^\s+)|\s(?=\s+)|(\s+$)/g, '');
};

String.prototype.extractDomainFromURL = String.prototype.extractDomainFromURL || function(){
    var matches = this.match(/(?!(http|https)(:\/\/))+([\w]+\.){1}([\w]+\.?)+/);
    return (matches.length > 0) ? matches[0] : pURL.substring(10);
};
