app.factory('feesSummaryDisplay', ['$resource', function($resource) {

  var service = {}; // Object with methods and variables available for access


    // function to fetch fees information from Rails charge model
    return  function(current_case_id, flag, fee_summary) {
      // var Fee =  $resource('/api/cases/1/charges/:id', {id:'@id'}) ; // fetch fee information from Rails charge controller
      // assign corresponding fees to an object and to be render on Fees summary template.
      // if (flag) {

         console.log("Beginning of GetInfo Function");
        fee_summary.get({id: current_case_id }, function(data){
          // var totalFee = data['total_fee'] ;

            console.log("Inside Summary Display Directive: " + data['total_fee'] )


            return 'hello';
            // service.sub_total_fees =  data['sub_total_fees'] ;  
            // service.converted_total_fee =  data['total_fee'] + "00" ;
  // 

            // console.log("Fee Summary Object: " + service.feesSummary);
          });

        console.log("End of GetInfo Function");



      // } else {
      //   console.log("Error Message: Issue with rendering fess summary");
      // }

    };

 // return service ;
}]);