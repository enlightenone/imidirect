// app.js
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
var app = angular.module('formApp', ['ngAnimate', 'ui.router', "templates"]);


app.config(['$httpProvider',
    function ($httpProvider) {
      // send security token to rails with every angular http request
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);  // .config





