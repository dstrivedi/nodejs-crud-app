const parser = require('../utils/requestBodyParser');
const crypto = require('crypto');
const writeToFile = require('../utils/write.to.file');

module.exports = async (req, res) => {
    if(req.url = "/api/movies") {
        try{
            let body = await parser(req);
            // console.log("request body : ",body);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            writeToFile(req.movies);
            res.writeHead(201,{"Content-Type" : "applicatiton/json"});
            res.end(`Movie ${body.id} successfully created!!`);
        } catch(error) {
            console.log(error);
            res.writeHead(400, {"Content-Type": "application/json"});
            res.end(JSON.stringify({title: "Validation failed", message: "Request body is not valid"}))
        }
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Not found", message: "Route not found"}))
    }
}