
function getSummary(page,callback){
    var summary;
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
                callback(data.query.pages[a].extract);
            }
        }
    });
}