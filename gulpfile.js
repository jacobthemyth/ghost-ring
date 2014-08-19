var gulp = require('gulp');
var ghostHelm = require('ghost-helm');
ghostHelm.setup({cleanDir: ['.tmp']}, gulp);
