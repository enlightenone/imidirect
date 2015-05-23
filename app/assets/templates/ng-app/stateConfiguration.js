// configuring our routes 
// =============================================================================
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app',{
            url: '',
            templateUrl: 'states/apps/main-container.html',
            controller: 'statusController'
        })
        .state('app.option',{
            url: '/option',
            templateUrl: 'states/questionnaires/questionnaire-main-template.html',
            controller: 'questionnaireController'
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
            templateUrl: 'states/forms/sections/section1.html',
            controller: 'formController'
        })
        // url wil /form/interests
        .state('app.form.section2', {
            url: '/section2',
            templateUrl: 'states/forms/sections/section2.html',
            controller: 'formController'
        })
        // url will be /form/interests
        .state('app.form.section3', {
            url: '/section3',
            templateUrl: 'states/forms/sections/section3.html',
            controller: 'formController'
        })
        // url will be /form/interests
        .state('app.form.section4', {
            url: '/section4',
            templateUrl: 'states/forms/sections/section4.html',
            controller: 'formController'
        })
        // url will be /form/interests
        .state('app.form.section5', {
            url: '/section5',
            templateUrl: 'states/forms/sections/section5.html',
            controller: 'formController'
        })
        // url will be /form/interests
        .state('app.form.section6', {
            url: '/section6',
            templateUrl: 'states/forms/sections/section6.html',
            controller: 'formController'
        })
        // url will be /form/payment
        .state('app.form.section7', {
            url: '/section7',
            templateUrl: 'states/forms/sections/section7.html',
            controller: 'formController'
        })
        // url will be /form/payment
        .state('app.form.section8', {
            url: '/section8',
            templateUrl: 'states/forms/sections/section8.html',
            controller: 'formController'
        })
        .state('app.form.section9', {
            url: '/section9',
            templateUrl: 'states/forms/sections/section9.html',
            controller: 'formController'
        })
        //Payment route
        .state('app.charge', {
            url: '/charge?case_id&fees_calculation_flag',
            templateUrl: 'states/fees/fees-summary.html',
            controller: 'formController'
        });
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('form/section1?case_id&form_flag&application_type=i130&section1&section2&section3&section4&section5&section6&section7&section8&section9');
});