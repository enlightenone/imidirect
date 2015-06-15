// configuring our routes for main application process pages
// =============================================================================
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        // The parent view
        .state('app',{
            url: '/main',
            templateUrl: 'states/apps/main-container.html',
            controller: 'statusController'
        })
        // Route to questionnaire route
        .state('app.option',{
            url: '/option?case_id&app_id',
            templateUrl: 'states/questionnaires/questionnaire-main-template.html',
            controller: 'questionnaireController'
        })
        // route to show Main form 
        .state('app.form', {
            url: '/form?case_id&form_flag&application_type&section1&section2&section3&section4&section5&section6&section7&section8&section9',
            templateUrl: 'forms/form.html',
            controller: 'formController'
        })
        // nested states for form 
        // each of these sections will have their own view
        .state('app.form.section1', {
            url: '/section1',
            templateUrl: 'states/forms/sections/section1.html',
            controller: 'formController'
        })
        .state('app.form.section2', {
            url: '/section2',
            templateUrl: 'states/forms/sections/section2.html',
            controller: 'formController'
        })
        .state('app.form.section3', {
            url: '/section3',
            templateUrl: 'states/forms/sections/section3.html',
            controller: 'formController'
        })
        .state('app.form.section4', {
            url: '/section4',
            templateUrl: 'states/forms/sections/section4.html',
            controller: 'formController'
        })
        .state('app.form.section5', {
            url: '/section5',
            templateUrl: 'states/forms/sections/section5.html',
            controller: 'formController'
        })
        .state('app.form.section6', {
            url: '/section6',
            templateUrl: 'states/forms/sections/section6.html',
            controller: 'formController'
        })
        .state('app.form.section7', {
            url: '/section7',
            templateUrl: 'states/forms/sections/section7.html',
            controller: 'formController'
        })
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
        // url to fee summary display and link to credit card
        .state('app.charge', {
            url: '/charge?case_id&fees_calculation_flag',
            templateUrl: 'states/fees/fees-summary.html',
            controller: 'feeController'
        })
        // url to fee summary display and link to credit card
        .state('app.complete', {
            url: '/complete?case_id',
            templateUrl: 'states/pdfs/complete-page.html',
            controller: 'pdfController'
        });
    // Default Raout
    $urlRouterProvider.otherwise('');
});