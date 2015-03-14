// app.js
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router', "templates"])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)section1&
        .state('form', {
            url: '/form?section1&section2&section3&section4&section5',
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
            templateUrl: 'cases/i130/section2.html'

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
        });
        
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('form/section1?section1&section2&section3&section4&section5');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope, $stateParams) {
    
    // we will store all of our form data in this object
    $scope.formData = {};

    $stateParams.flag = "yes" ;

    console.log($stateParams.flag);
    
    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');
    };
    
});

