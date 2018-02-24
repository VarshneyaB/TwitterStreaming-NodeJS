var client = require("mongodb").MongoClient;
var mongo = require("mongodb");

var indexes = [{key: { _id : 1, text : 1},name: "text",unique: true}];


function modify(query,callback){
    var ints = ["created_at","favorite_count","reply_count","retweet_count","user_id","user_followers_count","user_friends_count"]
    var obj = {};
    if(query.search != null){
        obj['$text'] = { '$search' : query.search};
    }

    if(query.filter != null){
        for(var i in ints){
            if(query.filter[ints[i]] != null){
                var oj = {}
                var filterobj = query.filter[ints[i]];
                if(filterobj.min != null){
                    oj['$gte'] = filterobj.min;
                }
                if(filterobj.max != null){
                    oj['$lte'] = filterobj.max;
                }
                obj[ints[i]] = oj;
            }
        }
    }
    callback(obj);
}



function getTweets(address,storage,q,callback){
    client.connect(address + "/" + storage,function(er,db){            //first we need to connect to MongoDB
    modify(q,function(query){                          //Modify function is called with q(params) which after processing
        var sortobj = q["sort"];                            //calls another function 
        var base = db.db(storage);
        base.collection('tweets').createIndexes(indexes,function(){                                //creating indexes for text search support on "user_name","text"
            base.collection('tweets').find(query).sort(sortobj).toArray(function(err,results){  //After creating indices,query and sorting is done here.
                callback(err,results);                                                          //Result
                db.close()});                                                           //closing database
        })})
    });
}

module.exports = getTweets;






























