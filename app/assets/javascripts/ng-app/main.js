// app.js
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router', "templates"])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form?form1&form2&form3&form4&form5&form6&form7',
            templateUrl: 'forms/form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.form1', {
            url: '/form1',
            templateUrl: 'cases/i130/form1.html'

        })
        
        // url will be /form/interests
        .state('form.form2', {
            url: '/form2',
            templateUrl: 'cases/i130/form2.html'

        })

        // url will be /form/interests
        .state('form.form3', {
            url: '/form3',
            templateUrl: 'cases/i130/form4.html'

        })

        // url will be /form/interests
        .state('form.form4', {
            url: '/form4',
            templateUrl: 'cases/i130/form4.html'

        })

        // url will be /form/interests
        .state('form.form5', {
            url: '/form5',
            templateUrl: 'cases/i130/form5.html'

        })

        // url will be /form/interests
        .state('form.form6', {
            url: '/form6',
            templateUrl: 'cases/i130/form6.html'

        })
        
        // url will be /form/payment
        .state('form.form7', {
            url: '/form7',
            templateUrl: 'cases/i130/form7.html'
        });
        
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('form?form1&form2&form3&form4&form5&form6&form7/');
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

