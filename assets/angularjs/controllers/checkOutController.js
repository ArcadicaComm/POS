posApp.controller('checkOutController', ['$scope', '$http', '$rootScope', '$location', '$route' ,'baseUrl', 'checkTable', 'sale', function($scope, $http, $rootScope, $location, $route, baseUrl, checkTable, sale){
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
    //Get all payment method from API
    $http.get('http://webbase.com.vn/pos/payment-api')
    .then(function(response){
        $scope.paymentMethods = response.data;        
    },function(response){
        
    });
    
    $scope.value    = '';
    $scope.received = '';
    $scope.comment  = '';
    $scope.getPaymentMethod = function(value)
    {
        if(value == 1)
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
    $scope.getReceived = function(received)
    {
        $scope.received = received;
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
    
    //Function payment
    $scope.payment = function(){
        //Fill full information required save to sale table
        if($scope.SelectedItem != undefined && $scope.value != '')
        {
            //A: Received is null when chosse payment method = cash alert validate
            if($scope.value == 1 && $scope.received == '')
            {
                swal({
                    title: 'Received must be filled!',
                    text: '',
                    type: "error",
                });
            }
            //B: payment method is visa or credit card received = null
            if($scope.value != 1)
            {
                //Payment method = credit_card or visa
                $scope.received = 0;
            }
            var fd = new FormData();
            $scope.token_id = Math.floor((Math.random() * 999999) + 1);
            fd.append('customer_id', $scope.SelectedItem);
            fd.append('user_id', 1);
            fd.append('table_id', checkTable.currentTableId);
            fd.append('payment_id', $scope.value);
            fd.append('comment', $scope.comment);
            fd.append('total', $scope.total);
            fd.append('received', $scope.received);
            fd.append('token_id', $scope.token_id);

            $http.post('http://webbase.com.vn/pos/sale-api', fd, {
                headers : {
                    'Content-Type' : undefined
                }
            }).then(function(response){
                //Save to sale table success full -> get sale_id and save to sale_id table
                $http.get('http://webbase.com.vn/pos/sale-api/get-saleid?table_id='+checkTable.currentTableId+'&token_id='+$scope.token_id)
                .then(function(response){
                    $scope.sale_id = response.data;
                    angular.forEach($scope.scarts, function(sValue, sKey){
                        var fd = new FormData();
                        fd.append('item_id', sValue.item_id);
                        fd.append('combo_id', sValue.combo_id);
                        fd.append('count', sValue.count);
                        fd.append('price', sValue.price);
                        fd.append('discount', sValue.discount);
                        fd.append('sale_id', $scope.sale_id);
                        $http.post('http://webbase.com.vn/pos/sale-item-api', fd, {
                            headers : {
                                'Content-Type' : undefined
                            }
                        }).then(function(response){
                            sale.sale_id = $scope.sale_id;
                            $rootScope.$broadcast('checkPayment');
                            $location.path('/invoice');
                        },function(response){
                            console.log(response)
                        })
                    })
                },function(response){
                    console.log(response)
                })
            },function(response){
                console.log();
            })
        };
        
        if($scope.SelectedItem == undefined || $scope.value == '')
        {
            var form_null = [];
            var message_alert = '';
            //Validate
            if($scope.SelectedItem == undefined)
            {
                form_null.push('Customer');
            }
            if($scope.value == '')
            {
                form_null.push('Payment method');
            }
            if($scope.value == 1 && $scope.received == '')
            {
                form_null.push('Received');
            }
            for(var i=0; i<form_null.length; i++)
            {
                if(i == 0)
                {
                    message_alert += form_null[i] + ', ';
                }else if (i == form_null.length - 1)
                {
                    message_alert += form_null[i];
                }
            }
            swal({
                title: message_alert + ' must be filled!',
                text: '',
                type: "error",
            });
        }
    }
}])