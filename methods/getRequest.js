module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    // console.log(baseUrl);
    const id = req.url.split("/")[3];
    // console.log(baseUrl+id === req.url);
    const regEx = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if(req.url === "/api/movies") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    } else if(!regEx.test(id)) {
        res.statusCode = 400;
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify({title: "Validation failed", message: 'UUID is not valid.'}));
    } else if(regEx.test(id) && req.url === '/api/movies/'+id) {
        let filterMovie = req.movies.filter((m) => m.id === id);
        if(filterMovie.length > 0) {
            res.statusCode = 200;
            res.setHeader("Content-Type","application/json");
            res.write(JSON.stringify(filterMovie));
            res.end();
        } else {
            res.writeHead(404, {"Content-Type":'application/json'});
            res.end(JSON.stringify({title: "Not found", message: "Movie not found"}));
        }
    } else  {
        res.writeHead(404, {"Content-Type":'application/json'});
        res.end(JSON.stringify({title: "Not found", message: "Route not found"}))
    }
}