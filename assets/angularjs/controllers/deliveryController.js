posApp.controller('deliveryController', ['$scope', 'baseUrl', function($scope, baseUrl){
        $scope.baseUrl = baseUrl.setBaseUrl('http://webbase.com.vn/pos');
}])