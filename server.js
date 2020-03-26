const express = require('express')
const app = express()
var xlsxtojson = require('xlsx-to-json')
var xlstojson = require('xls-to-json')
const fileupload = require("express-fileupload");


// File uploading
app.use(fileupload());


// ======================================================================================
// @desc      Upload photo for bootcamp
// @route     PUT /api/upload/
// @access    Local
// ======================================================================================


app.put('/api/upload/', (req, res) => {

  res.send('Hello World!')

  console.log(req.files.foo); // the uploaded file object

})


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

app.post('/api/xlstojson', function (req, res) {
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