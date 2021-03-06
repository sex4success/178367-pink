"use strict";

module.exports = function(grunt) {
/*grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-sass"); 
  
  grunt.loadNpmTasks("grunt-css-mqpacker"); 
  grunt.loadNpmTasks("grunt-csso"); 
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-svgstore"); 
  grunt.loadNpmTasks("grunt-svgmin");
  grunt.loadNpmTasks("grunt-contrib-copy"); 
  grunt.loadNpmTasks("grunt-contrib-clean");*/
  
  require("load-grunt-tasks")(grunt);
  
  grunt.initConfig({
    sass: {
      style: {
        files: {
          "build/css/style.css": "sass/style.scss"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 1 version",
              "last 2 Chrome versions",
              "last 2 Firefox versions",
              "last 2 Opera versions",
              "last 2 Edge versions"
            ]}),
            require("css-mqpacker")({
              
            })   
          ]
        },
        src: "build/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"  
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]  
        }
      }  
    },
  
    uglify: {
      my_target: {
        files: {
        "build/js/script.min.js": ["js/script.js"],
        "build/js/picturefill.min.js": ["js/picturefill.js"],
        }
      }
    },
   
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }  
    },
    
    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["build/img/icons/*.svg"]
        }]  
      }
    },
    
    svgstore: {
      options: {
        svg: {
          style: "display: none"  
        }  
      },
      symbols: {
        files: {
          "build/img/symbols.svg": ["img/icons/*.svg"]  
        }  
      }  
    },
    
    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]  
      },
      html: {
        files: [{
          expand: true,
          src: ["*.html"],
          dest: "build"
        }]  
      }
    },
    
    clean: {
        build: ["build"]
    },
    
    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html"]
      },
      style: {
        files: ["sass/**/*.{scss,sass}"],
        tasks: ["sass", "postcss", "csso"],
        options: {
          spawn: false
        }
      }
    }
  });
    
  grunt.registerTask("symbols", ["svgmin", "svgstore"]);  
  grunt.registerTask("serve", ["browserSync", "watch"]);
  
  grunt.registerTask("build", [
    "clean",
    "copy",     
    "sass",
    "postcss",
    "csso",
    "uglify",
    "symbols",
    "imagemin"
  ]);
  
};
