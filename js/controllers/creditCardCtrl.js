angular.module("netengine").controller("creditCardCtrl", function($scope, $http){
  
  $scope.successCard = false;
  $scope.errorCard   = false;

  // create an array of years from current year until the number provided in the function
  $scope.years = function(yearsLenght){
    var currentYear = new Date().getFullYear(),
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
        headers: {'Content-Type': 'application/application/json'},
        data: ccDetails
    }).then(function successCallback(response) {
      $scope.successCardMsg = 'Success';
      $scope.successCard    = true;
      $scope.errorCard      = false;
    }, function errorCallback(response) {
      console.info(response)
      $scope.errorCardMsg = 'Error';
      $scope.errorCard    = true;
      $scope.successCard  = false;
    });
  };

});