var Grunt = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            js: {
                files: ['es6/**/*.js', 'es6/*.js'],
                tasks: ['browserify' /*,'jshint'*/ , 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['scss/**/*.scss', 'scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            },
            img: {
                files: ['img/**/*.png', 'img/**/*.jpg', 'img/*.png', 'img/*.jpg'],
                tasks: ['img'],
                options: {
                    spawn: false,
                },
            },
        },
        // img:{
        //     src: ['img/**/*.png','img/**/*.jpg', 'img/*.png','img/*.jpg'],
        //     dest: '../public/img'
        // },
        image: {
            static: {
                options: {
                    pngquant: true,
                    optipng: false,
                    zopflipng: true,
                    jpegRecompress: false,
                    mozjpeg: true,
                    guetzli: false,
                    gifsicle: true,
                    svgo: true
                }//,
                // files: {
                //     'dist/img.png': 'src/img.png',
                //     'dist/img.jpg': 'src/img.jpg',
                //     'dist/img.gif': 'src/img.gif',
                //     'dist/img.svg': 'src/img.svg'
                // }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: '../public/img'
                }]
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            loose: "all"
                        }]
                    ]
                },
                files: {
                    "./js/app.js": ["./es6/index.js"]
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                multistr: true,
                globals: {
                    jQuery: true
                },
            },
            all: ['js/app.js']
        },
        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    '../public/js/min.js': [
                        'js/app.js'
                    ]
                }
            }
        },

        sass: {
            compile: {
                options: {
                    check: false,
                    style: 'compressed',
                },
                files: {
                    '../public/css/min.css': ['scss/index.scss'],
                },
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '../public/css/min.css': ['css/index.css']
                }
            }
        }
    });
    grunt.registerTask('default', ['browserify', 'uglify']);
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('img', ['image']);
};
module.exports = Grunt;
