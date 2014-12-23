module.exports = function(grunt) {

  grunt.config.merge({

    // cleanup bin directory
    clean: {
      build: [
        '<%= pkg.project.directories.bin %>'
      ]
    },

    // build subcomponents
    sudo_subcomponents: {
      build: {
        options: {
          cmd: 'grunt',
          args: ['build']
          // default option for components is pkg.project.components
        }
      }
    },

    sudo_components: {
      build: {
      //   options: {
      //     namespace: 'client',
      //     less: {
      //       // reference import!, you have to include this file to the client anyway
      //       imports: ['<%= pkg.project.directories.src %>app.less']
      //     },
      //     js: {
      //       beautify: false,
      //       warnings: true,
      //       mangle: false
      //     }
      //   },
      //   files: [{
      //     expand: true,
      //     cwd: '<%= pkg.project.directories.src %>',
      //     src: ['**/*'],
      //     dest: '<%= pkg.project.directories.bin %>'
      //   }],
      }
    },

    // compile jade files
    jade: {
      index: {
        // files: {
        //   '<%= pkg.project.directories.bin %>assets/index.html':
        //     '<%= pkg.project.directories.src %>el/index.jade'
        // }
      }
    },

    // copy/uglify js files + uglify templates output
    uglify: {
      // @TODO create a static map of files to include in its logical order for loading
      vendor: {
        options: {
          beautify: true,
          warnings: true,
          mangle: false,
          compress: false
        },
        src: [
        ],
        dest: '<%= pkg.project.directories.bin %>vendor.js'
      },
      client: {
        options: {
          beautify: true,
          warnings: true,
          mangle: false,
          compress: false
        },
        src: [],
        dest: '<%= pkg.project.directories.bin %>client.js'
      }
    },

    // compile less
    less: {
      build: {
        // files: {
        //   '<%= pkg.project.directories.bin %>app.css' : [
        //     '<%= pkg.project.directories.src %>app.less'
        //   ]
        // }
      }
    },
  });

  grunt.registerTask('build', 'Builds files from source.', []);
};
