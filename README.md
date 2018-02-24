# TwitterStreaming-NodeJS

## Dependencies
1. mongodb
2. twit

## Usage

# API_1:

## params
1. Auth key as file
2. Object describing 
    a. key value to search
    b. count to specify number of tweets to be streamed
3. Database's path
4. Database's Name
5. Callback to be called after download is done

# API_2

## params
1. Database's address
2. Database's name
3. object to specify:
    a. search - {search : "text"}
    b. filter - {variable : { min : "Val" , max : "Val"}}
    c. sort - {variable : 1/0}   1,0 mean ascending/descending
