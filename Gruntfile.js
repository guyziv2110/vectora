module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      all: ['.tmp']
    },
    concat: {
      js: {
        src: [
          'client/bower_components/jquery/dist/jquery.js',
          'client/bower_components/angular/angular.js',
          'client/bower_components/bootstrap/dist/js/bootstrap.js',
          'client/bower_components/ng-file-upload/angular-file-upload-all.js',
          'client/js/app.js',
          'client/js/controllers/controllers.js',
          'client/js/services/services.js'
        ],
        dest: 'client/dist/vectora.js'
      },
      css: {
        src: [
          'client/bower_components/bootstrap/dist/css/bootstrap.css',
          'client/bower_components/font-awesome/css/font-awesome.css',
          'client/css/style.css'
        ],
        dest: 'client/dist/vectora.css'
      }
    },
    'string-replace': {
      dist: {
        files: {
          'client/dist/vectora.css': 'client/dist/vectora.css',
        },
        options: {
          replacements: [
            {
              pattern: /..\/fonts\/fontawesome/ig,
              replacement: '/bower_components/font-awesome/fonts/fontawesome'
            }
          ]
        }
      }
    },
    uglify: {
      js: {
        files: {
          'client/dist/vectora.min.js': ['client/dist/vectora.js']
        }
      },
      options: {
        mangle: false
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  return grunt.registerTask('default', ['clean', 'concat:js', 'concat:css', 'string-replace', 'uglify:js']);
};