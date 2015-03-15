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
            url: '/form?application_type&section1&section2&section3&section4&section5',
            // url: '/form',
            templateUrl: 'forms/form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.section1', {
            url: '/section1',
            templateUrl: 'cases/i130/section1.html'

        })

        // url will be /form/interests
        .state('form.section2', {
            url: '/section2',
             // templateUrl: 'cases/i130/section2.html'

            templateProvider: function($http, $stateParams){

                var obj = $stateParams;
                console.log("parameter type: " + obj.application_type)
                var templateName = "cases/" + obj.application_type + "/" + "section2.html" ;
                console.log("template Name: " + templateName);
                

                    return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
            }

        })

        // url will be /form/interests
        .state('form.section3', {
            url: '/section3',
            templateUrl: 'cases/i130/section3.html'

        })

        // url will be /form/interests
        .state('form.section4', {
            url: '/section4',
            templateUrl: 'cases/i130/section4.html'

        })

        // url will be /form/interests
        .state('form.section5', {
            url: '/section5',
            templateUrl: 'forms/form-submit.html'

        })

        // url will be /form/interests
        .state('form.section6', {
            url: '/section6',
            templateUrl: 'cases/i130/section6.html'

        })
        
        // url will be /form/payment
        .state('form.section7', {
            url: '/section7',
            templateUrl: 'cases/i130/section7.html'
        })
        // url will be /form/payment
        .state('form.section8', {
            url: '/section8',
            templateUrl: 'cases/i130/section8.html'
        })
        .state('form.section9', {
            url: '/section9',
            templateUrl: 'cases/i130/section8.html'
        });

    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('form/section1?application_type=i130&section1&section2&section3&section4&section5');
});


app.controller("formController", function($scope) {

    //Object containing I-130 relative application options 
    $scope.formOptions = {} ; 
    
    // we will store all of our form data in this object
    // $scope.formData = obj2.section1;


    //function to choose forms
    $scope.chooseForm = function(category) {

    $scope.switchButtons = {}; //Create object to arrange form/section combination.
    var i = 3; 

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
    console.log($scope.switchButtons);
    location.assign('form/section1?application_type=i130&section1=i130-applicant&section2=i130-sponsor&section3=i130-option' +
     '&section4=' + $scope.switchButtons["section4"] +'&section5=' + $scope.switchButtons["section5"] + '&section6=' +
     $scope.switchButtons["section6"] + '&section7=' + $scope.switchButtons["section7"] + '&section8=' + '&section9=');
    };
    
    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');
    };
    
});
