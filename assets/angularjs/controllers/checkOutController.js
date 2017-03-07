posApp.controller('checkOutController', ['$scope', '$http', '$rootScope', '$location', '$route' ,'baseUrl', 'checkTable', function($scope, $http, $rootScope, $location, $route, baseUrl, checkTable){
    $scope.currentTableId = checkTable.currentTableId;
    $scope.currentTableTitle = checkTable.currentTableTitle;
    //Select 2 get all customer from API
    $http.get('http://webbase.com.vn/pos/customer-api')
    .then(function(response){
        var customers=[];
        angular.forEach(response.data, function(customerValue, customerKey){
            if(customerValue.tel == null && customerValue.id != 0)
            {
                customerValue.tel = 'No information';
            }else if(customerValue.id == 0)
            {
                customerValue.tel = '';
            }
            customers.push({
                Id      :   customerValue.id,
                Value   :   customerValue.first_name+' '+customerValue.last_name+' - '+customerValue.tel
            })
        })
        $scope.ItemList = customers;
    },function(response){
        console.log(response);
    });
    
    
    
    //Radio button payment method
    $scope.myStyle = {
        height : '70px'
    };
    $scope.paymentMethods = [
        {
            id      :   'cash',
            value   :   'Cash',
            ischecked   :   0
        },
        {
            id      :   'credit_card',
            value   :   'Credit Card',
            ischecked   :   0
        },
        {
            id      :   'visa',
            value   :   'Visa',
            ischecked   :   0
        }
    ];
    
    $scope.getPaymentMethod = function(value)
    {
        if(value == 'cash')
        {
            $scope.showCash = 1;
            $scope.myStyle = {
                height : '150px'
            }
        }else
        {
            $scope.showCash = 0;
            $scope.myStyle = {
                height : '70px'
            }
        }
    }
    
    //Get table shopcart from API
    $http.get('http://webbase.com.vn/pos/shopcart-api/shopcart-item?expand=item&table_id='+$scope.currentTableId)
    .then(function(response){
        $scope.scarts = response.data;
        //Get combo name from Combo Api
        $http.get('http://webbase.com.vn/pos/combo-api')
        .then(function(response){
            $scope.scart_combos = response.data;
            angular.forEach($scope.scarts, function(shopcartValue, shopcartKey){
                angular.forEach($scope.scart_combos, function(comboValue, comboKey){
                    if(comboValue.combo_id == shopcartValue.combo_id)
                    {
                        shopcartValue.combo_name = comboValue.title;
                    }
                })
            })
        },function(response){

        });

    },function(response){
        console.log(response);
    });
    
    //Function delete Food from shopcart
    $scope.removeFood = function(shopcart)
    {
        var fd = new FormData();
        fd.append('good_id', shopcart.good_id);
        $http.post('http://webbase.com.vn/pos/shopcart-api/remove-shopcart', fd, {
            headers : {
                'Content-Type' : undefined
            }
        }).then(function(response){
            //$rootScope.$broadcast('checkOut');
            $route.reload();
        },function(response){
            console.log(response);
        })
    }
    
//    //Function payment
//    $scope.payment = function(){
//        console.log($scope.SelectedItem);
//    }
}])