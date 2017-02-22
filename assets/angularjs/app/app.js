var posApp = angular.module('posApp', ['ngRoute']);

posApp.config(function($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/list_product/:id', {
        templateUrl : 'pages/list_product.php',
        controller  : 'listProductController'
    }).when('/combo', {
        templateUrl : 'pages/combo.php',
        controller  : 'comboController'
    }).when('/', {
        templateUrl : 'pages/table_list.php',
        controller  : 'mainController'
    }).when('/takeaway', {
        templateUrl : 'pages/takeaway.php'
    }).when('/delivery', {
        templateUrl : 'pages/delivery.php'
    })
})

posApp.controller('categoriesController', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl){
    //Set baseUrl by setBaseUrl function in baseUrl service
    $scope.imageUrl = baseUrl.setBaseUrl('http://webbase.com.vn/pos');    
    //Lấy ra toàn bộ categories    
    $http.get('http://webbase.com.vn/pos/category-api')
    .then(function(response){
        $scope.categories = response.data;
    },function(response){
        
    });
}])

posApp.controller('listProductController', ['$scope', '$http', '$routeParams', 'baseUrl', function($scope, $http, $routeParams, baseUrl){
    //Set baseUrl by setBaseUrl function in baseUrl service
    $scope.imageUrl = baseUrl.setBaseUrl('http://webbase.com.vn/pos');
    $scope.category_id = $routeParams.id;
    $http.get('http://webbase.com.vn/pos/product-api')
    .then(function(response){
        $scope.products = response.data;
    },function(response){
        
    })
}]);

posApp.controller('comboController', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl){
    //Set baseUrl by setBaseUrl function in baseUrl service
    $scope.imageUrl = baseUrl.setBaseUrl('http://webbase.com.vn/pos');    
    //Get all of combo from ComboApi
    $http.get('http://webbase.com.vn/pos/combo-api')
    .then(function(response){
        $scope.combos = response.data;
    },function(response){
        
    });
    
    //Get all combo detail form ComboItem API
    $http.get('http://webbase.com.vn/pos/combo-api/combo-item?expand=item')
    .then(function(response){
        $scope.combos_items = response.data;
    },function(response){
        
    });
    
}]);

posApp.controller('mainController', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl){
    //Set baseUrl by setBaseUrl function in baseUrl service
    $scope.imageUrl = baseUrl.setBaseUrl('http://webbase.com.vn/pos');    
    //Get all Table and BookTable from Table API
    $http.get('http://webbase.com.vn/pos/table-api')
    .then(function(response){
        $scope.tables = response.data;
        $http.get('http://webbase.com.vn/pos/booktable-api')
        .then(function(response){
            $scope.booktables = response.data;
            angular.forEach($scope.tables, function(table_value, table_key){
                angular.forEach($scope.booktables, function(btable_value, btable_key){
                    if(table_value.id == btable_value.table_id)
                    {
                        $scope.tables[table_key].hide = 1;
                    }
                })
            });
        },function(response){

        })
    },function(response){
        
    });  
    
    //Choose table send table_id and status to server
    $scope.chooseTable = function(table){
        var fd = new FormData();
        fd.append('table_id', table.id);
        fd.append('status', 1);
        $http.post('http://webbase.com.vn/pos/booktable-api', fd, {
            //transformRequest : angular.identity,
            headers : {
                'Content-Type' : undefined,
            }
        })
        .then(function(response){
            //Get newest booktables after post
            $http.get('http://webbase.com.vn/pos/table-api')
            .then(function(response){
                $scope.tables = response.data;
                $http.get('http://webbase.com.vn/pos/booktable-api')
                .then(function(response){
                    $scope.booktables = response.data;
                    angular.forEach($scope.tables, function(table_value, table_key){
                        angular.forEach($scope.booktables, function(btable_value, btable_key){
                            if(table_value.id == btable_value.table_id)
                            {
                                $scope.tables[table_key].hide = 1;
                            }
                        })
                    });
                    console.log($scope.tables);
                },function(response){

                })
            },function(response){

            });
        },function(response){
            console.log(response);
        })
    }
}])