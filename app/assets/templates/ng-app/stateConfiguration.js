// configuring our routes 
// =============================================================================
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app',{
            url: '',
            templateUrl: 'apps/main-container.html',
            controller: 'statusController'
        })
        .state('app.option',{
            url: '/option',
            templateUrl: 'options/i130-option.html',
            controller: 'formController'
        })
        // route to show our basic form (/form)section1&
        .state('app.form', {
            url: '/form?case_id&form_flag&application_type&section1&section2&section3&section4&section5&section6&section7&section8&section9',
            templateUrl: 'forms/form.html',
            controller: 'formController'
        })
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('app.form.section1', {
            url: '/section1',
            templateUrl: 'templates/sections/section1.html',
            // templateProvider: function($http, $stateParams){
            //     var obj = $stateParams;
            //     var templateName = "cases/" + obj.application_type + "/" + obj.section1 + ".html" ;
            //         return $http
            //           .get(templateName)
            //           .then(function(tpl){
            //             return tpl.data;
            //           });
            // },
            controller: 'formController'
        })
        // url wil /form/interests
        .state('app.form.section2', {
            url: '/section2',
            templateUrl: 'templates/sections/section2.html',
            // templateProvider: function($http, $stateParams){
            //     var obj = $stateParams;
            //     var templateName = "cases/" + obj.application_type + "/" + obj.section2 + ".html" ;
            //         return $http
            //           .get(templateName)
            //           .then(function(tpl){
            //             return tpl.data;
            //           });
            // },
            controller: 'formController'
        })
        // url will be /form/interests
        .state('app.form.section3', {
            url: '/section3',
            templateUrl: 'templates/sections/section3.html',
            // templateProvider: function($http, $stateParams){
            //     var obj = $stateParams;
            //     var templateName = "cases/" + obj.application_type + "/" + obj.section3 +".html" ;
            //         return $http
            //           .get(templateName)
            //           .then(function(tpl){
            //             return tpl.data;
            //           });
            // },
            controller: 'formController'
        })
        // url will be /form/interests
        .state('app.form.section4', {
            url: '/section4',
            templateUrl: 'templates/sections/section4.html',
            // templateProvider: function($http, $stateParams){
            //     var obj = $stateParams;
            //     var templateName = "cases/" + obj.application_type + "/" + obj.section4 +".html" ;
            //         return $http
            //           .get(templateName)
            //           .then(function(tpl){
            //             return tpl.data;
            //           });
            // },
            controller: 'formController'
        })
        // url will be /form/interests
        .state('app.form.section5', {
            url: '/section5',
            templateUrl: 'templates/sections/section5.html',
            // templateProvider: function($http, $stateParams){
            //     var obj = $stateParams;
            //     var templateName = "cases/" + obj.application_type + "/" + obj.section5 +".html" ;
            //         return $http
            //           .get(templateName)
            //           .then(function(tpl){
            //             return tpl.data;
            //           });
            // },
            controller: 'formController'
        })
        // url will be /form/interests
        .state('app.form.section6', {
            url: '/section6',
            templateUrl: 'templates/sections/section6.html',
            // templateProvider: function($http, $stateParams){
            //     var obj = $stateParams;
            //     var templateName = "cases/" + obj.application_type + "/" + obj.section6 +".html" ;
            //         return $http
            //           .get(templateName)
            //           .then(function(tpl){
            //             return tpl.data;
            //           });
            // },
            controller: 'formController'
        })
        // url will be /form/payment
        .state('app.form.section7', {
            url: '/section7',
            templateUrl: 'templates/sections/section7.html',
            // templateProvider: function($http, $stateParams){
            //     var obj = $stateParams;
            //     var templateName = "cases/" + obj.application_type + "/" + obj.section7 +".html" ;
            //         return $http
            //           .get(templateName)
            //           .then(function(tpl){
            //             return tpl.data;
            //           });
            // },
            controller: 'formController'
        })
        // url will be /form/payment
        .state('app.form.section8', {
            url: '/section8',
            templateUrl: 'templates/sections/section8.html',
            // templateProvider: function($http, $stateParams){
            //     var obj = $stateParams;
            //     var templateName = "cases/" + obj.application_type + "/" + obj.section8 +".html" ;
            //         return $http
            //           .get(templateName)
            //           .then(function(tpl){
            //             return tpl.data;
            //           });
            // },
            controller: 'formController'
        })
        .state('app.form.section9', {
            url: '/section9',
            templateUrl: 'templates/sections/section9.html',
            // templateProvider: function($http, $stateParams){
            //     var obj = $stateParams;
            //     var templateName = "cases/" + obj.application_type + "/" + obj.section9 +".html" ;
            //         return $http
            //           .get(templateName)
            //           .then(function(tpl){
            //             return tpl.data;
            //           });
            // },
            controller: 'formController'
        })
        //Payment route
        .state('app.charge', {
            url: '/charge?case_id&fees_calculation_flag',
            templateUrl: 'charges/new.html',
            controller: 'formController'
        });
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('form/section1?case_id&form_flag&application_type=i130&section1&section2&section3&section4&section5&section6&section7&section8&section9');
});