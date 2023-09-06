const fs = require('fs');
const path = require('path');
// console.log(path.join(__dirname,"..",'data','movies.json'))

module.exports = (data) => {
    fs.writeFileSync(path.join(__dirname, "..","data","movies.json"),JSON.stringify(data), "utf-8", (error) => {
        if(error) throw new Error(error);
        console.log("Data added to the file....");
    })
}