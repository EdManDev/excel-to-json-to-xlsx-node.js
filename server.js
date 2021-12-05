const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
var xlsxtojson = require("xlsx-to-json");

const fileupload = require("express-fileupload");
const cors = require("cors");

// middleware
app.use(morgan("dev"));
app.use(cors(""));

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
// @desc      GET Employee Photo
// @route     GET /api/uploads/   [Body: form-data | KEY: file, VALUE: exel-to-json.xlsx]
// @access    Public
// ======================================================================================
var fs = require("fs");
app.use("/Photos", express.static(__dirname + "/Photos"));
// ======================================================================================
app.post("/api/uploads/", (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send("No files were uploaded.");
	}

	fs.writeFile(
		"./uploads/" + req.files.file.name,
		req.files.file.data,

		function (err) {
			if (err) {
				res.json(err);
			}
			// res.json(req.files.file.name);
			res.send({ message: "file uploaded" });
		}
	);
});

// ====================================================================================
// @desc      Show data from XSLX Document
// @route     POST /api/show/
// @access    Local
// ====================================================================================
app.get("/api/show", function (req, res) {
	xlsxtojson(
		{
			input: "./uploads/excel-to-json.xlsx", // input xls
			output: "./uploads/excel-to-json.json", // output json
			lowerCaseHeaders: true,
		},
		(err, result) => {
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
