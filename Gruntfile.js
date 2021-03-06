/**
 * @namespace BuildConfiguration
 * @desc
 * Documents the constants used during build and compilation as builtin
 * compilation and build configuration documentation
 *
 * The build is executed through Grunt the generic taskrunner.
 */

/**
 * @constant mochaTestFiles
 * @memberof BuildConfiguration
 * @type {String[]}
 * @desc
 * Array of files to use to run the Unittests on the code base
 */
var mochaTestFiles = [
    "tests/index.js",
    "tests/model/*.js",
    "tests/errors/*.js"
];

/**
 * @constant coverageHtml
 * @memberof BuildConfiguration
 * @type {string}
 * @desc
 * Destination path to the unittest coverage report
 */
var coverageHtml = "tests/results/coverage.html";

/**
 * @constant junitReportFile
 * @memberof BuildConfiguration
 * @type {string}
 * @desc
 * Destination path for the JUnit XML format report of the UnitTest run
 */
var junitReportFile = "tests/results/junit.xml";

/**
 * @constant jsdocSourceFiles
 * @memberof BuildConfiguration
 * @type {String[]}
 * @desc
 * Array of file sources to generate the documentation from
 */
var jsdocSourceFiles = [
    "lib/**/*.js",
    "./*.js",
    "node_modules/soasta-repository/lib/**/*.js"
];

/**
 * @constant jsdocTutorialPath
 * @memberof BuildConfiguration
 * @type {string}
 * @desc
 * Directory containing tutorials and other documentation not to be distributed as source code files
 */
var jsdocTutorialPath = "doc/tutorials";

/**
 * @constant sourcePaths
 * @memberof BuildConfiguration
 * @type {string[]}
 * @desc
 * A list of all paths to javascript files
 */
var sourcePaths = [
    "./lib/**/*.js",
    "./Gruntfile.js",
    "./index.js",
    "./tests/**/*.js"
];

/* eslint-env node */
module.exports = function(grunt) {
    "use strict";

    var lintFiles = [
        "*.js",
        "cli/*.js",
        "cliAnnotation/*.js",
        "cliTimeline/*.js",
        "lib/**/*.js",
        "tests/**/*.js"
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        eslint: {
            console: {
                src: lintFiles,
                options: {
                    format: "compact"
                }
            },
            build: {
                options: {
                    outputFile: "eslint.xml",
                    format: "jslint-xml",
                    silent: true
                },
                src: lintFiles
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: "spec",
                    clearRequireCache: true
                },
                src: mochaTestFiles
            },
            build: {
                options: {
                    reporter: "tap",
                    captureFile: "tests/mocha.tap",
                    clearRequireCache: true
                },
                src: mochaTestFiles
            }
        },
        jsdoc: {
            dist: {
                options: {
                    destination: "doc",
                    readme: "README.md",
                    package: "package.json",
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json",
                    plugins: [
                        "node_modules/grunt-jsdoc/node_modules/jsdoc/plugins/markdown",
                        "node_modules/grunt-jsdoc/node_modules/jsdoc/plugins/summarize"
                    ]
                },
                src: [
                    "lib/**/*.js",
                    "cli/*.js",
                    "cliAnnotation/*.js",
                    "cliTimeline/*.js"
                ]
            }
        }
    });

    //
    // Plugins
    //
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.loadNpmTasks("gruntify-eslint");
    grunt.loadNpmTasks("grunt-jsdoc");

    //
    // Tasks
    //
    grunt.registerTask("test", ["mochaTest:test"]);
    grunt.registerTask("test:build", ["mochaTest:build"]);

    grunt.registerTask("lint", ["eslint:console"]);
    grunt.registerTask("lint:build", ["eslint:build"]);

    //
    // Task Groups
    //
    grunt.registerTask("default", ["lint", "test"]);
    grunt.registerTask("build", ["lint:build", "test:build"]);
};
