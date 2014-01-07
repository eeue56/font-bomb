#!/usr/bin/env node

var request = require('request')
  , fs = require('fs')
  , mkdirp = require('mkdirp');

var fonts = 'fonts';
var makeWoffPath = makePath('fonts', 'woff');
var makeCSSPath = makePath('css', 'css');

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

function makePath(folder, extension) {
  // just in case it doesn't exist
  mkdirp(folder);
  
  return function(file) {
    return folder + '/' + file + '.' + extension;
  }
}

function getCSS(url) {
  var matches;
  console.log('Getting CSS...');
  
  request(url, function(err, res, body) {
    if(err) throw err;
    var css, cssPath;

    css = parseCSS(body);
    cssPath = makeCSSPath('fonts');

    console.log('Adding new css file at', cssPath);
    fs.writeFile(cssPath, css);
  });
}

function parseCSS(css) {
  var re, match, url, name, woffPath;
  console.log('Parsing CSS...'); 

  // capture the name of the font and its URL  
  re = /src: local.* local\('(.*?)'\).*url\((.*?)\)/g;
  while(match = re.exec(css)) {
    name = match[1];
    url = match[2];
    woffPath = makeWoffPath(name);
    css = css.replace(url, woffPath);
    saveWoff(url, woffPath);
  }
  
  return css;
}

function saveWoff(url, destination) {
  console.log('Get Woff from', url);
  request(url, function(err, res, body) {
    if(err) throw err;
    console.log('Adding new woff file at', destination);
    fs.writeFile(destination, body);
  });
}

main();
