#!/usr/bin/env node

var request = require('request')
  , fs = require('fs')
  , download = require('download')
  , mkdirp = require('mkdirp')
  , mv = require('mv');

var fonts = 'fonts';

function main() {
  var input, url;
  // get our input 
  input = process.argv[2];
  
  if(!input) throw new Error('fontbomb expects one argument');  
  
  // extract url
  url = input.match(/(http:\/\/.*?)['\s]/);
  
  // is there a url?
  if(url && url[1]) {
    getCSS(url[1]);
  } else {
    throw new Error('Could not find a valid URL.')
  }
}

function getCSS(url) {
  var matches;
  console.log('Getting CSS...');
  
  request(url, function(err, res, body) {
    if(err) throw err;
    var css, cssPath;

    css = parseCSS(body);

    console.log('Adding new css file');
    fs.writeFile('css/fonts.css', css);
  });
}

function parseCSS(css) {
  var re, match, url, name;
  console.log('Parsing CSS...'); 

  // capture the name of the font and its URL  
  re = /src:.*url\((.*?)\)/g;
  
  while(match = re.exec(css)) {
    url = match[1];
    name = url.match(/\/(\w*\.ttf)$/)[1];
    
    // woff path must be relative to css
    css = css.replace(url, '../fonts/' + name);
    download(url, 'fonts');
  }
  
  return css;
}

main();
