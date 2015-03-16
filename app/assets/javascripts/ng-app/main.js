// app.js
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
var app = angular.module('formApp', ['ngAnimate', 'ui.router', "templates"]);

app.config(['$httpProvider',
    function ($httpProvider) {
      // send security token to rails with every angular http request
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);  // .config

// configuring our routes 
// =============================================================================
app.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('option',{
            url: '/option',
            templateUrl: 'options/i130-option.html',
            controller: 'formController'

        })
    
        // route to show our basic form (/form)section1&
        .state('form', {
            url: '/form?application_type&section1&section2&section3&section4&section5&section6&section7&section8&section9',
            templateUrl: 'forms/form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.section1', {
            url: '/section1',
            templateProvider: function($http, $stateParams){

                var obj = $stateParams;
                var templateName = "cases/" + obj.application_type + "/" + obj.section1 + ".html" ;

                    return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
            },
            controller: 'formController'

        })

        // url will be /form/interests
        .state('form.section2', {
            url: '/section2',
            templateProvider: function($http, $stateParams){
                var obj = $stateParams;
                var templateName = "cases/" + obj.application_type + "/" + obj.section2 + ".html" ;
                
                    return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
            },
            controller: 'formController'

        })

        // url will be /form/interests
        .state('form.section3', {
            url: '/section3',
            templateProvider: function($http, $stateParams){

                var obj = $stateParams;
                var templateName = "cases/" + obj.application_type + "/" + obj.section3 +".html" ;
                

                    return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
            },
            controller: 'formController'
        })

        // url will be /form/interests
        .state('form.section4', {
            url: '/section4',
            templateProvider: function($http, $stateParams){
                var obj = $stateParams;
                var templateName = "cases/" + obj.application_type + "/" + obj.section4 +".html" ;
                
                    return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
            },
            controller: 'formController'

        })

        // url will be /form/interests
        .state('form.section5', {
            url: '/section5',
            templateProvider: function($http, $stateParams){
                var obj = $stateParams;
                var templateName = "cases/" + obj.application_type + "/" + obj.section5 +".html" ;

                    return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
            },
            controller: 'formController'

        })

        // url will be /form/interests
        .state('form.section6', {
            url: '/section6',
            templateProvider: function($http, $stateParams){

                var obj = $stateParams;
                var templateName = "cases/" + obj.application_type + "/" + obj.section6 +".html" ;
                
                    return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
            },
            controller: 'formController'

        })
        
        // url will be /form/payment
        .state('form.section7', {
            url: '/section7',
            templateProvider: function($http, $stateParams){

                var obj = $stateParams;
                var templateName = "cases/" + obj.application_type + "/" + obj.section7 +".html" ;

                    return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
            },
            controller: 'formController'

        })
        // url will be /form/payment
        .state('form.section8', {
            url: '/section8',
            templateProvider: function($http, $stateParams){

                var obj = $stateParams;
                var templateName = "cases/" + obj.application_type + "/" + obj.section8 +".html" ;

                    return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
            },
            controller: 'formController'
        })
        .state('form.section9', {
            url: '/section9',
            templateProvider: function($http, $stateParams){

                var obj = $stateParams;
                var templateName = "cases/" + obj.application_type + "/" + obj.section9 +".html" ;

                    return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
            },
            controller: 'formController'
        });

    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('form/section1?application_type=i130&section1&section2&section3&section4&section5&section6&section7&section8&section9');
});


app.controller("formController", function($scope ,  $stateParams) {

    //Object containing I-130 relative application options 
    $scope.formOptions = {} ; 
    $scope.switchOptions = $stateParams ; // To retain form options after the fomr has been submitted.


    //function to choose forms
    $scope.chooseForm = function(category) {

    $scope.switchButtons = {}; //Create object to arrange form/section combination.
    var i = 3; 

    $scope.switchButtons["application_type"] = "i130";
    $scope.switchButtons["section1"] = "i130-applicant";
    $scope.switchButtons["section2"] = "i130-sponsor";
    $scope.switchButtons["section3"] = "i130-option";
    // Loop through formOptions to assign form to specific switch button.
    for (key in $scope.formOptions){
        if($scope.formOptions[key] == true){
            i++;
       $scope.switchButtons["section" + i] = key;  
    }
    }
    // Assign submit button to the last section.
    i++;
    $scope.switchButtons["section" + i] = "submit";

    location.assign('#form/section1?application_type='+ $scope.switchButtons["application_type"] + '&section1=' + $scope.switchButtons["section1"] + '&section2=' + $scope.switchButtons["section2"]
                + '&section3=' + $scope.switchButtons["section3"] + '&section4=' + $scope.switchButtons["section4"] + '&section5=' + $scope.switchButtons["section5"] 
                + '&section6=' + $scope.switchButtons["section6"] + '&section7=' + $scope.switchButtons["section7"] + '&section8=' + $scope.switchButtons["section8"] 
                + '&section9=' + $scope.switchButtons["section9"]
                );
    };
    
    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');
    };
    
});
