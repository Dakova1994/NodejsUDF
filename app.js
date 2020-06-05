var formidable = require('formidable');
var fs = require('fs')

const express = require('express');
const app = express();
const port = 8002;
var uploadedPath = __dirname + '/uploaded/';
var downloadPath = __dirname + '/download/';

app.use(express.static('/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})



app.get('/node.html',function(req,res){
    let nazwa = req.query.nazwa;
    console.log("name: ", nazwa);
    var downPath= downloadPath+nazwa; 
    res.download(downPath);
    });


app.post('/fileupload', function (req, res) {
    form = new formidable.IncomingForm({uploadDir: uploadedPath,path: uploadedPath});
    form.parse(req, function(err, fields, files){
        var oldpath = files.filetoupload.path;
        var newpath = downloadPath + files.filetoupload.name;
        console.log(oldpath);
        console.log(newpath);
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    })
})

fs.readdirSync(downloadPath).forEach(file => {
  console.log(file);
});





app.listen(port, () => console.log(`http://localhost:${port}`))