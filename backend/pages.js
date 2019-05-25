
function getBasicInformation(page){
    $.ajax({
        url: 'https://de.wikipedia.org/w/api.php',
        data: { action: 'query', list: 'search', srsearch: $("input[name=Wikipedia]").val(), format: 'json' },
        dataType: 'jsonp',
        success: function (x) {
            console.log('title', x.query.search[0].title);
        }
    });
    return null;
}