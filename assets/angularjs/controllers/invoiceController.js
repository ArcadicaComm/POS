posApp.controller('invoiceController', ['$scope', '$http', '$rootScope', '$location', 'checkTable', 'baseUrl', 'sale', function($scope, $http, $rootScope, $location, checkTable, baseUrl, sale){
    if(sale.sale_id != undefined)
    {
        $scope.checkPayment = 1;
        $scope.baseUrl = baseUrl.setBaseUrl('http://webbase.com.vn/pos');
        //Get invoice from sale table
        $http.get('http://webbase.com.vn/pos/finish-api/invoice/'+sale.sale_id)
        .then(function(response){
            $scope.sale = response.data;
            //Get item in shopcart from API
            $http.get('http://webbase.com.vn/pos/shopcart-api/shopcart-item?expand=item&table_id='+checkTable.currentTableId)
            .then(function(response){
                $scope.shopcarts = response.data;
                //Get combo name from Combo Api
                $http.get('http://webbase.com.vn/pos/combo-api')
                .then(function(response){
                    $scope.shopcart_combos = response.data;
                    angular.forEach($scope.shopcarts, function(shopcartValue, shopcartKey){
                        angular.forEach($scope.shopcart_combos, function(comboValue, comboKey){
                            if(comboValue.combo_id == shopcartValue.combo_id)
                            {
                                shopcartValue.combo_name = comboValue.title;
                            }
                        })
                    })
                },function(response){
                    
                })
            },function(response){
                console.log(response);
            });
        },function(response){
            console.log(response)
        })
        
        //Function finish deletable booktable and shopcart_goods
        $scope.finish = function(){
            swal({
                title: "Are you sure?",
                text: "You will remove all information about this table!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, finish!",
                closeOnConfirm: false
            },
            function(){
                $http.get('http://webbase.com.vn/pos/finish-api/end/'+checkTable.currentTableId)
                .then(function(response){
                    swal("Finished!", "success");
                    $location.path('/');
                },function(response){
                    swal("Can't finish. Please try again!", "error");
                })

            });
        }
    }
}])