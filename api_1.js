var twit = require('twit');
var mongo = require('mongodb').MongoClient;


var stream = function(key,searchVar,address,storage,callback){
    var TwitterService = new twit(key);
    var count = 0;
    mongo.connect(address + "/" + storage ,function(er,db){
        if(er){
            console.log("Some error in connecting dataBase");
            throw er;
        }
        var streamed = TwitterService.stream('statuses/filter' , {track : searchVar.key});
        streamed.on('tweet',function(Tweet) {
            count += 1;
            Tweet = processed(Tweet);
            if(count == searchVar.count){
                streamed.stop();
                addToBase(db,storage,Tweet,callback);
            }else{
                addToBase(db,storage,Tweet);
            }
        });
    })
}


function processed(Tweet){
    obj = {};
    var vars = ["created_at","id_str","text","reply_count","retweet_count","favorite_count"];
    var users = ["name","location","id","screen_name","location","followers_count","friends_count","lang"];
    for(var i in vars){
        obj[vars[i]] = Tweet[vars[i]];
    }

    for(var i in users){
        obj["user_" + users[i]] = Tweet.user[users[i]];
    }

    obj["created_at"] = parseTwitterDate(obj["created_at"]);
    return obj
}


function addToBase(db,storage,tweet,callback){
    db.db(storage).collection("tweets").insertOne(tweet,function(){
        if(callback != null){
            db.close();
            callback();
        }
    })
}

function parseTwitterDate(aDate){   
  return new Date(Date.parse(aDate.replace(/( \+)/, ' UTC$1')));
}


module.exports = stream