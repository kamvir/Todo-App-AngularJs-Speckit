module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/app.js',
      'app/services/**/*.js',
      'app/filters/**/*.js',
      'app/components/**/*.js',
      'tests/unit/**/*.spec.js'
    ],
    reporters: ['progress'],
    autoWatch: false,
    browsers: ['jsdom'],
    singleRun: true,
    client: {
      clearContext: false
    },
    plugins: [
      'karma-jasmine',
      'karma-jsdom-launcher'
    ]
  });
};
