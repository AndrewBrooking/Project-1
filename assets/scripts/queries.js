function queryAPI(url) {
    let results = null;

    $.ajax({
        url: url,
        method: 'GET'
    }).then(function (data) {
        results = data;
    });

    return results;
}