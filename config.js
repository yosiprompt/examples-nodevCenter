var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.set('view engine', 'html');
    app.engine('html', require('ejs-mate'));
    app.set('views', path.join(__dirname, '/public/views'));


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.static(path.join(__dirname, '/bower_components')));
    app.use(express.static(path.join(__dirname, '/module')));
}