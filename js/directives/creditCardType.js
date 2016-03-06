angular.module('netengine').directive('creditCardType', function(){
  return {
    restrict: 'A',
    require: 'ngModel', 
    link: function($scope, $elm, $attrs, $ctrl){
      $ctrl.$parsers.unshift(function(value){
        
        // verify card type according first digits
        $scope.ccinfo.type =
          (/^5[1-5]/.test(value)) ? "mastercard"
          : (/^4/.test(value)) ? "visa"
          : (/^3[47]/.test(value)) ? 'amex'
          : undefined

        $ctrl.$setValidity('cctype',!!$scope.ccinfo.type)
        return value
      })
    }
  }
})