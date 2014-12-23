'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  props: {},

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Team sudo\'s ' + chalk.red('application maker')
    ));

    var prompts = [{
      type    : 'input',
      name    : 'application_name',
      message : 'What\'s your application name?',
      store   : true
    },
    {
      type    : 'input',
      name    : 'application_desc',
      message : 'What\'s the description for your application?',
      store   : true
    },
    {
      type    : 'input',
      name    : 'author',
      message : 'What\'s your Name?',
      store   : true
    }];

    var self = this;
    this.prompt(prompts, function (props) {
      self.props = props;
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
