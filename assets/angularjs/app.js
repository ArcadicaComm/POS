var posApp = angular.module('posApp', ['ngRoute']);

posApp.config(function($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/list_product/:id', {
        templateUrl : 'pages/list_product.php',
        controller  : 'listProductController'
    }).when('/combo', {
        templateUrl : 'pages/combo.php',
        controller  : 'comboController'
    })
})

posApp.controller('categoriesController', ['$scope', '$http', function($scope, $http){
    //Lấy ra toàn bộ categories    
    $http.get('http://webbase.com.vn/pos/category-api')
    .then(function(response){
        $scope.categories = response.data;
    },function(response){
        
    });
}])

posApp.controller('listProductController', ['$scope', '$http', '$routeParams',function($scope, $http, $routeParams){
    $scope.category_id = $routeParams.id;
    $http.get('http://webbase.com.vn/pos/product-api')
    .then(function(response){
        $scope.products = response.data;
    },function(response){
        
    })
}]);

posApp.controller('comboController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    //Lấy ra toàn bộ combo
    $http.get('http://webbase.com.vn/pos/combo-api')
    .then(function(response){
        $scope.combos = response.data;
    },function(response){
        
    });
    
    //Lấy ra toàn bộ combo detail
    $http.get('http://webbase.com.vn/pos/combo-api/combo-item?expand=item')
    .then(function(response){
        $scope.combos_items = response.data;
    },function(response){
        
    });
}])