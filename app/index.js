'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  props: {},

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.option('name', {
      desc: 'the projectname',
      type: String
    });
    this.option('desc', {
      desc: 'short description of the project',
      type: String
    });
    this.option('author', {
      desc: 'the projects initial author',
      type: String
    });
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Team sudo\'s ' + chalk.red('application maker')
    ));

    var prompts = [];
    
    if(this.options['name'] === undefined){
        prompts.push({
        type    : 'input',
        name    : 'application_name',
        message : 'What\'s your application name?',
        store   : true
      });
    }else{
      this.props['application_name'] = this.options['name'];
    }

    if(this.options['desc'] === undefined){
        prompts.push({
          type    : 'input',
          name    : 'application_desc',
          message : 'What\'s the description for your application?',
          store   : true
        });
    }else{
      this.props['application_desc'] = this.options['desc'];
    }
    
    if(this.options['author'] === undefined){
        prompts.push({
          type    : 'input',
          name    : 'author',
          message : 'What\'s your Name?',
          store   : true
        });
    }else{
      this.props['author'] = this.options['author'];
    }

    var self = this;
    this.prompt(prompts, function (props) {
      self.props['application_name'] = props['application_name'];
      self.props['application_desc'] = props['application_desc'];
      self.props['author'] = props['author'];
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('flow'),
        this.destinationPath('.flow')
      );
      this.fs.copy(
        this.templatePath('_setup.sh'),
        this.destinationPath('setup.sh')
      );
      this.fs.copy(
        this.templatePath('_setup.bat'),
        this.destinationPath('setup.bat')
      );
      this.fs.copy(
        this.templatePath('_Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          "application_name": this.props.application_name,
          "author": this.props.author,
          "application_desc": this.props.application_desc
        }
      );

      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {
          "application_name": this.props.application_name,
          "author": this.props.author,
          "application_desc": this.props.application_desc
        }
      );

      this.fs.copyTpl(
        this.templatePath('LICENSE-MIT'),
        this.destinationPath('LICENSE'),
        {
          "author": this.props.author,
          "year":   new Date().getUTCFullYear()
        }
      );

      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README')
      );

      this.directory(
        this.templatePath('structure'),
        this.destinationPath('./')
      );

      var ustring = require("underscore.string");

      this.mkdir(this.destinationPath('src/') + ustring.slugify(this.props.application_name));
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
