app.directive('scNgCategory', function(){
// custom directive to dynamycally display the content of category page based on individual case
return {
    restrict: "E",
    controller: ['$scope', '$stateParams', 'ActiveCaseStatusResource', 'generateCase', function($scope, $stateParams, ActiveCaseStatusResource, generateCase){
         /* This method is initiated at loading of the home index page. It will return user id if the active
      user is logged in and determine if the active user has on going active case. */
    $scope.root_url = location.origin;

   $scope.getCurrentUserId = function(){

     $scope.current_user_id = current_user_id; // assign current logged in user id if available
     $scope.app_id = app_id; // assign selected application id
     var template_url = "/templates/category/";
     $scope.i130_option = { flag: false, category: "Family Petition", template: template_url +  "i130-category-text.html" };
     $scope.i765_option = { flag: false, category: "Work Permit", template: template_url +  "i765-category-text.html" };
     $scope.i485_option = { flag: false, category: "Adjustment Of Status", template: template_url + "i485-category-text.html" }

     switch($scope.app_id){
        case 1:
          $scope.i130_option.flag = true;
          $scope.bread_crumb_category =  $scope.i130_option.category;
          $scope.category_text = $scope.i130_option.template;
          break;
        case 9:
          $scope.i765_option.flag = true;
          $scope.bread_crumb_category =  $scope.i765_option.category;;
          $scope.category_text =  $scope.i765_option.template;
          break;
        case 10:
          $scope.i485_option.flag = true;
          $scope.bread_crumb_category =  $scope.i485_option.category;;
          $scope.category_text =  $scope.i485_option.template;
          break;
        default: 
          $scope.i130_option.flag = true;
          $scope.bread_crumb_category =  $scope.i130_option.category;;
          $scope.category_text =  $scope.i130_option.template;
     } // end of switch block



      // if the user log in, it will fetch active case state from the Rails API
     if ($scope.current_user_id){
        ActiveCaseStatusResource.get({id: $scope.current_user_id }, function(data){ 
          $scope.case_active_status = data["active_case_status"]; // fetch case status
          $scope.current_url = data["current_url"]; // fetch current url path of active case
          console.log("Active Case status: " + $scope.case_active_status );
        });// end of ActivCaeStatusResource method
      } // end of if statement 
   };// end of getCurrentUserId method

   // This method is to initiate application process. It will reroute to the appropriate page based on
   //   the active state of the user and case activity. If the user is not logged in, it will redirect
   //   to log in page. The case id is generated if there is no active ongoing case under the user  
   $scope.applyMyCase = function(){
       if(!$scope.current_user_id){
          location.assign('/sessions/new');
       } else if($scope.current_user_id && (!$scope.case_active_status)) {
          generateCase.initiate($scope.current_user_id, $scope.app_id);
        
          var form_url =  '/users/' + $scope.current_user_id + '/apps/1#/main/option?case_id=' + generateCase.case_id() + '&app_id=' + $scope.app_id;
          var firefox_detection = navigator.userAgent.indexOf("Firefox");
          var url_host = location.host;
          var url_protocol = location.protocol;

          // Firefox has issue with reroute to questionnaire page. The following block
          // will add protocol and host to the url link in order for Firefox to route
          // properly to questionnaire page.
          if (firefox_detection != -1){
            //form_url = url_protocol + "//"+ url_host + form_url ;
            form_url = url_host + form_url ;
          } // End of if statement.

          location.assign(form_url);

          //location.assign( '/users/' + $scope.current_user_id + '/apps/1#/main/option?case_id=' + generateCase.case_id() + '&app_id=' + app_id);
       } else {
          console.log("Active Case Already Exist");
       }
  };//end of applyMyCase function 

    }],
    templateUrl: "/templates/category/category.html"
} // End of return object bracket

})