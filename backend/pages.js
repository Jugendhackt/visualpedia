var url = "https://de.wikipedia.org";
var category = "Kategorie:";
function summary(page,callback){
    wikiURL = url+'/w/api.php?' + $.param({
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
function categories(page,callback){
    wikiURL = url+'/w/api.php?' + $.param({
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
            for(var a in data.parse.categories){
                if(!data.parse.categories[a]["*"].startsWith("Wikipedia:")&&data.parse.categories[a]["*"] != page){
                    callback(data.parse.categories[a]["*"].replace(/_/g," "));
                }
            }
        }
    });
}
function articleLinks(page,callback){
    wikiURL = url+'/w/api.php?' + $.param({
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
            for(var a in data.parse.links){
                if(!data.parse.links[a]["*"].startsWith("Wikipedia:")&&data.parse.links[a]["*"] != page){
                    callback(data.parse.links[a]["*"].replace(/_/g," "));
                }
            }
        }
    });
}
function articleLink(page,callback){
    callback(url+"/wiki/"+page);
}
function categoryLink(page,callback){
    callback(url+"/wiki/"+category+page);
}
function isArticle(page,yesCallback,noCallback){
    wikiURL = url+'/w/api.php?' + $.param({
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
            if("error" in data){
                noCallback();
            }else{
                yesCallback();
            }
        }
    });
}
function isCategory(page,yesCallback,noCallback){
    wikiURL = url+'/w/api.php?' + $.param({
        'action' : 'query',
        'titles' : category+page,
        'format':'json'
    });
    $.ajax( {
        async: false,
        url: wikiURL,
        dataType: 'jsonp',
        async:false,
        success: function(data){
            if("-1" in data.query.pages){
                noCallback();
            }else{
                yesCallback();
            }
        }
    });
}
function inCategory(page,callback){
    wikiURL = url+'/w/api.php?' + $.param({
        'action': "query",
        'list': "categorymembers",
        'cmtitle' : "Category:"+page,
        'format':'json'
    });
    $.ajax( {
        async: false,
        url: wikiURL,
        dataType: 'jsonp',
        async:false,
        success: function(data){
            for(var a in data.query.categorymembers){
                var member = data.query.categorymembers[a].title;
                console.log(member);
                if(member.startsWith(category)){
                    callback(member,true);
                }else{
                    callback(member,false);
                }
            }
            callback()
        }
    });
}