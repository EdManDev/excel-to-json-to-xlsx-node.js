const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
var xlsxtojson = require("xlsx-to-json");
var xlstojson = require("xls-to-json");
const fileupload = require("express-fileupload");
app.use(morgan("dev"));

// File uploading
app.use(fileupload());

// ======================================================================================
// @desc      Test My server
// @route     GET /api/
// @access    Local
// ======================================================================================
app.get("/api/", (req, res) => {
	res.send({ message: "API is running...." });
});

// ======================================================================================
// app.use(function (req, res, next) {
// 	//allow cross origin requests
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
// 	res.header("Access-Control-Max-Age", "3600");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
// 	);
// 	next();
// });

// configuration
app.use(express.static(__dirname + "/public"));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

// ======================================================================================
// @desc      Upload photo for server
// @route     PUT /api/upload/
// @access    Local
// ======================================================================================
app.post("/api/upload/", function (req, res) {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send("No files were uploaded.");
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.sampleFile;

	// Use the mv() method to place the file somewhere on your server
	//(---------------------------- METHODE DEPRECATED-------------------------------------)
	sampleFile.mv("/public/uploads/", function (err) {
		if (err) return res.status(500).send(err);

		res.send("File uploaded!");
	});
});

// ====================================================================================
// @desc      Show data from XSLX Document
// @route     POST /api/upload/
// @access    Local
// ====================================================================================
app.get("/api/show", function (req, res) {
	xlsxtojson(
		{
			input: "./excel-to-json.xlsx", // input xls
			output: "output.json", // output json
			lowerCaseHeaders: true,
		},
		function (err, result) {
			if (err) {
				res.json(err);
			} else {
				res.json(result);
			}
		}
	);
});

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in :${process.env.PORT} listening at http://localhost:${PORT}`
	)
);
