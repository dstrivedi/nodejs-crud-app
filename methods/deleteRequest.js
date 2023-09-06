const writeToFile = require('../utils/write.to.file');

module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    const id = req.url.split("/")[3];
    const regEx = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if(!regEx.test(id)) {
        res.statusCode = 400;
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify({title: "Validation failed", message: 'UUID is not valid.'}));
    } else if(req.url === "/api/movies/" + id) {
        const index = req.movies.findIndex((m) => m.id === id);
        if(index != -1) {
            req.movies = req.movies.filter((m) => m.id !== id);
            writeToFile(req.movies);
            res.statusCode = 204;
            res.setHeader("Content-Type","application/json");
            res.end(JSON.stringify(req.movies));
        } else {
            res.writeHead(400, {"Content-Type":'application/json'});
            res.end(JSON.stringify({title: "Not found", message: "Movie not found"}));
        }
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Not found", message: "Route not found"}))
    }

}