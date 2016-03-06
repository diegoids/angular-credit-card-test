angular.module("netengine").controller("creditCardCtrl", function($scope, $http){
  
  // initialize some vars
  $scope.successCard  = false;
  $scope.errorCard    = false;
  $scope.ccinfo       = {'type': undefined};
  $scope.currentYear  = new Date().getFullYear();
  $scope.currentMonth = new Date().getMonth() + 1;
  
  $scope.newOrderPayment = {'order_id': '1'};

  // create an array of years from current year until the number provided in the function
  $scope.years = function(yearsLenght){
    var currentYear = $scope.currentYear,
        yearsArray  = [currentYear],
        i;

    for(i=1 ; i < yearsLenght ; i++ ){
      yearsArray.push(currentYear+i);
    };

    return yearsArray;
  };

  // make request to check the card data and return message to the user
  $scope.addNewOrderPayment = function(ccDetails){
    ccDetails.order_id = document.getElementsByName('order_id')[0].value;

    var URL = "lvh.me:3000/orders/" + ccDetails.order_id + "/payments";

    $http({
        method: "post",
        url: URL,
        headers: {'Content-Type': 'application/json'},
        data: ccDetails
    }).then(function successCallback(response) {
      
      $scope.successCardMsg = 'Success';
      $scope.successCard    = true;
      $scope.errorCard      = false;

    }, function errorCallback(response) {
      
      $scope.errorCardMsg = 'An error has occurred';
      $scope.errorCard    = true;
      $scope.successCard  = false;

    });
  };

});