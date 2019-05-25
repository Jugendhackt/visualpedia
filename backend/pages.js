
function getSummary(page,callback){
    var wikiURL = "https://de.wikipedia.org/w/api.php";
    wikiURL += '?' + $.param({
        'action' : 'query',
        'titles' : page,
        'prop':'extracts',
        'format':'json',
        "exintro":"",
        "explaintext":""
    });
    $.ajax( {
        async: false,
        url: wikiURL,
        dataType: 'jsonp',
        async:false,
        success: function(data){
            for(var a in data.query.pages){
                var substr = data.query.pages[a].extract.split('\n');
                callback(substr[0]);
            }
        }
    });
}
function getTopics(page,callback){
    var summary;
    var wikiURL = "https://de.wikipedia.org/w/api.php";
    wikiURL += '?' + $.param({
        'action' : 'parse',
        'page' : page,
        'format':'json'
    });
    $.ajax( {
        async: false,
        url: wikiURL,
        dataType: 'jsonp',
        async:false,
        success: function(data){
            console.log(data);
        }
    });
}