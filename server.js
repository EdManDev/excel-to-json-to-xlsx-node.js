const express = require('express')
const app = express()
var xlsxtojson = require('xlsx-to-json')
var xlstojson = require('xls-to-json')
const fileupload = require("express-fileupload");


// File uploading
app.use(fileupload());


// ======================================================================================
// @desc      Upload photo for server
// @route     PUT /api/upload/
// @access    Local
// ======================================================================================
app.post('/api/upload/', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/public/uploads/filename.xlsx', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

// ======================================================================================

// app.use(function (req, res, next) { //allow cross origin requests
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//   res.header("Access-Control-Max-Age", "3600");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//   next();
// });

// configuration
app.use(express.static(__dirname + '/public'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.post('/api/show', function (req, res) {
  xlsxtojson({
    input: "./excel-to-json.xlsx",  // input xls 
    output: "output.json", // output json 
    lowerCaseHeaders: true
  }, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))