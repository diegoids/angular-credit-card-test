angular.module('netengine').directive('cardExpiration', function(){
  return {
    require: 'ngModel',
    link: function($scope, $elm, $attrs, $ctrl){
      // watch the elements
      $scope.$watch('[newOrderPayment.credit_card.expiry_month, newOrderPayment.credit_card.expiry_year]',function(value){
        $ctrl.$setValidity('expiration',true)
        
        console.info($scope.newOrderPayment.credit_card.expiry_year)
        console.info($scope.newOrderPayment.credit_card.expiry_month)

        // verify if expiry date is less than current date
        if( $scope.newOrderPayment.credit_card.expiry_year == $scope.currentYear && $scope.newOrderPayment.credit_card.expiry_month <= $scope.currentMonth ){
          $ctrl.$setValidity('expiration',false)
        }

        return value
      },true)
    }
  }
})