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
            url: '/form?case_id&application_type&section1&section2&section3&section4&section5&section6&section7&section8&section9',
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
        })
        
        //Payment route
        .state('charge', {
            url: '/charge?case_id&fees_calculation_flag',
            templateUrl: 'charges/new.html',
            controller: 'formController'
        });


    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('form/section1?case_id&application_type=i130&section1&section2&section3&section4&section5&section6&section7&section8&section9');
});