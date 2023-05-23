const express = require('express');
var myParser = require("body-parser");
const routes = require('./routes/index');

const app = express();
app.use(myParser.urlencoded({ extended: true }));
const path = require('path');
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "pages"));
app.use("/", routes);
app.use(express.static(__dirname + '/public'));

module.exports = app;