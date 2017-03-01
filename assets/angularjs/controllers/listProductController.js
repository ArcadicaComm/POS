//Controller controls List product by category
posApp.controller('listProductController', ['$scope', '$http', '$rootScope', '$routeParams', 'baseUrl', 'checkTable', 'checkFood', function($scope, $http, $rootScope, $routeParams, baseUrl, checkTable, checkFood){
    //Set baseUrl by setBaseUrl function in baseUrl service
    $scope.baseUrl = baseUrl.setBaseUrl('http://webbase.com.vn/pos');
    $scope.category_id = $routeParams.id || -88;

    $http.get('http://webbase.com.vn/pos/category-api/food?expand=items')
    .then(function(response){
        $scope.cproducts = response.data;
    },function(resonse){

    })
    //Get current table and add food into shopcart
    $scope.currentTableId = checkTable.currentTableId;
    $scope.addToShopCart = function(product)
    {
        var fd = new FormData();
        fd.append('order_id', 1);
        fd.append('item_id', product.item_id);
        fd.append('table_id', $scope.currentTableId);
        fd.append('count', 1);
        fd.append('discount', product.discount);
        fd.append('price', product.price);
        
        $http.post('http://webbase.com.vn/pos/shopcart-api/add-shopcart', fd, {
            headers : {
                'Content-Type' : undefined
            }
        }).then(function(response){
            //Confirm Choose food
            checkFood.chooseFood();
            $rootScope.$broadcast('choose-food');
        },function(response){
            
        })
    }
}]);