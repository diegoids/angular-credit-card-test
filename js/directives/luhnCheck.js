var luhnChk = function(luhn) {
  // the luhn algorithm
  var len = luhn.length,
      mul = 0,
      prodArr = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
      ],
      sum = 0;

  while (len--) {
    sum += prodArr[mul][parseInt(luhn.charAt(len), 10)];
    mul ^= 1;
  }

  return sum % 10 === 0 && sum > 0;
};

angular.module('netengine').directive('luhnCheck', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function($scope, $elm, $attrs, $ctrl) {

      // check if is a valid card number according luhn algorithm
      function luhnCheck(value) {
        $ctrl.$setValidity('luhn', luhnChk(value));
        return value;
      }

      $ctrl.$parsers.push(luhnCheck);
      $ctrl.$formatters.push(luhnCheck);
    }

  };
})