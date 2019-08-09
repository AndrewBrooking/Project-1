async function queryAPI(url) {
    let results = await $.ajax({
        url: url,
        method: 'GET'
    }).then(function (data) {
        return data;
    });

    return results;
}