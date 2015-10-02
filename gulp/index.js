// load tasks
'use strict';
var fs = require('fs');
var path = require('path');
var tasks;

tasks = fs.readdirSync('./gulp/tasks/').filter(function (name) { return /(\.(js)$)/i.test(path.extname(name)); });
// include every files in gulp/tasks
for (var i = 0; i < tasks.length; ++i) {
  require('./tasks/' + tasks[i]);
}

tasks = fs.readdirSync('./gulp/landing/').filter(function (name) { return /(\.(js)$)/i.test(path.extname(name)); });
// include every files in gulp/landing
for (var i = 0; i < tasks.length; ++i) {
  require('./landing/' + tasks[i]);
}
