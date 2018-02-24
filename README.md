# TwitterStreaming-NodeJS

##Dependencies
1.mongodb
2.twit
console.log("Programme has started.");


var key = require('./keys');
var stream = require('.api_1');
var fetch = require('.api_2');

stream(key,{key : "hollywood",count : 5},"mongodb://localhost:27017","holly",function(){
    console.log("Stored everything on database.");
    fetch("mongodb://localhost:27017","holly",{},function(err,results){
        console.log(results);
    });
);
