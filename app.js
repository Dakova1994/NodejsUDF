var formidable = require('formidable');
var fs = require('fs')

const express = require('express');
const app = express();
const port = 8001;
const uploadedDir = __dirname + '/uploaded/';
const downloadDir = __dirname + '/download/';
app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

app.get('/success', function(req, res){
    res.sendFile(__dirname + '/success.html')
})

app.post('/fileupload', function (req, res) {
    form = new formidable.IncomingForm({uploadDir: uploadedDir,path: uploadedDir});
    form.parse(req, function(err, fields, files){
        var oldpath = files.filetoupload.path;
        var newpath = downloadDir + files.filetoupload.name;
        console.log(oldpath);
        console.log(newpath);
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    })
})

fs.readdirSync(downloadDir).forEach(file => {
  console.log(file);
});

app.get('/node.html', function(req, res){
    var filename = req.query.nazwa;
    var fullpath = downloadDir + filename;
    res.download(fullpath);
});


app.listen(port, () => console.log(`http://localhost:${port}`))