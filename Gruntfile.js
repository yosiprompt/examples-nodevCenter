module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ['module/chat/*.js']
		},

		concat: {
			chat: {
				src: ['module/chat/*.js', 'module/chat/**/*.js'],
				dest: 'public/js/chat.js'
			},
			tictactoe: {
				src: ['module/tictactoe/*.js', 'module/tictactoe/**/*.js'],
				dest: 'public/js/tictactoe.js'
			},
			posts: {
				src: ['module/posts/*.js', 'module/posts/**/*.js'],
				dest: 'public/js/posts.js'
			}
		},

		uglify: {
			options: {
		    	mangle: false
		    },
			chat: {
				files: {
					'public/js/chat.min.js': ['module/chat/*.js', 'module/chat/**/*.js']
				}
			},
			tictactoe: {
				files: {
					'public/js/tictactoe.min.js': ['module/tictactoe/*.js', 'module/tictactoe/**/*.js']
				}
			},
			posts: {
				files: {
					'public/js/posts.min.js': ['module/posts/*.js', 'module/posts/**/*.js']
				}
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/css/style.css': 'module/style.scss'
				}
			}
		},

		watch: {
			css: {
				files: ['module/**/*.scss'],
				tasks: ['sass']
			},
			
			js: {
				files: ['module/**/*.js'],
				tasks: ['jshint', 'uglify', 'concat']
			}
		},

		nodemon: {
			dev: {
				script: 'server.js'
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['sass', 'jshint', 'uglify', 'concat', 'concurrent']);
}