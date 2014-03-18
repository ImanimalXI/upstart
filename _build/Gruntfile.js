module.exports = function(grunt) {
    'use strict';

    require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        less: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: '../css/alternative_1.css.map'
                },
                files: [{
                    expand: true,        // Enable dynamic expansion.
                    cwd: '../less',  // Src matches are relative to this path.
                    src: ['*.less'],     // Actual pattern(s) to match.
                    dest: '../css',  // Destination path prefix.
                    ext: '.css',         // Dest filepaths will have this extension.
                }]
            }
        },

        watch: {
            all: {
                files: ['../less/**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.registerTask('default', ['less',  'watch']);
};
