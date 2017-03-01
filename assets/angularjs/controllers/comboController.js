//Controller controls combo
posApp.controller('comboController', ['$scope', '$http', '$rootScope', 'baseUrl', 'checkTable', 'checkFood', function($scope, $http, $rootScope, baseUrl, checkTable, checkFood){
    //Set baseUrl by setBaseUrl function in baseUrl service
    $scope.baseUrl = baseUrl.setBaseUrl('http://webbase.com.vn/pos');    
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
    
    $scope.currentTableId = checkTable.currentTableId;
    $scope.addToCart = function(combo){
        var fd = new FormData();
        fd.append('order_id', 1);
        fd.append('count', 1);
        fd.append('combo_id', combo.combo_id);
        fd.append('table_id', $scope.currentTableId);
        fd.append('discount', 0);
        fd.append('price', combo.price);
        
        $http.post('http://webbase.com.vn/pos/shopcart-api/add-shopcart', fd, {
            headers : {
                'Content-Type' : undefined
            }
        }).then(function(response){
             //Confirm Choose food
            checkFood.chooseFood();
            $rootScope.$broadcast('choose-food');
        },function(response){
            console.log(response);
        });
    }
}]);