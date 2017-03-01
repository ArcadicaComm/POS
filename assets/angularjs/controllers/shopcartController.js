//Controller controls shopcart
posApp.controller('shopcartController', ['$scope', '$http', '$location', '$rootScope', 'baseUrl', 'checkTable', 'checkFood', 'shopCart', function($scope, $http, $location, $rootScope, baseUrl, checkTable, checkFood, shopCart){
        //Set base Url
        $scope.baseUrl = baseUrl.setBaseUrl('http://webbase.com.vn/pos');
        //The table is canceled or not chosen
        $scope.$on('cancel-table', function(){
            $scope.changeTableStatus = checkTable.changeTableStatus;
            $scope.menu = checkTable.status;
            $scope.choose_food = checkFood.status;
        });
        
        //The table is chosen
        $scope.$on('choose-table', function(){
            $scope.menu = checkTable.status;
            $scope.currentTableId   =   checkTable.currentTableId;
            $scope.currentTableTitle=   checkTable.currentTableTitle;
            
            $scope.cancelTable = function(currentTableId){
                //Call Api to cancel table
                var fd = new FormData();
                fd.append('current_table', $scope.currentTableId)
                $http.post('http://webbase.com.vn/pos/booktable-api/cancel-table', fd, {
                    headers : {
                        'Content-Type' : undefined
                    }
                })
                .then(function(response){
                    //Cancel table successfull and then path to Home and checkTable.status set to 0 checkFood.status set to 0
                    checkTable.cancelTable();
                    checkFood.cancelFood();
                    $rootScope.$broadcast('cancel-table');
                    $location.path('/');
                },function(response){
                    
                })
            }
        });
        
        $scope.$on('choose-food', function(){
            $scope.total = 0;
            $scope.choose_food = checkFood.status;
            $scope.currentTableId = checkTable.currentTableId;
            //Get all shopcart from API
            $http.get('http://webbase.com.vn/pos/shopcart-api/shopcart-item?expand=item&table_id='+$scope.currentTableId)
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
                
                //Function get shopcart count
                $scope.getShopcartCount = function(shopcart)
                {
                    //calculate total shopcart price (When start without change quantity)
                    $scope.total += shopcart.price*shopcart.count;
                    return shopcart.count;
                };
                 //Function get shopcart id
                $scope.getShopcartId = function(shopcart)
                {
                    return shopcart.good_id;
                };
                
                //Function get total shopcart price when change quantity in shopcart
                $scope.getTotal = function(quantity){
                    if(quantity.number != null )
                    {
                        //Calculate total shopcart price
                        $scope.get_total = 0;
                        angular.forEach($scope.shopcarts, function(shopcart_value, shopcart_key){
                            if(shopcart_value.good_id == quantity.good_id)
                            {
                                shopcart_value.count = quantity.number;
                            }
                            $scope.get_total += shopcart_value.price * shopcart_value.count;
                        })
                        $scope.total = $scope.get_total;
                        
                        //Create count object and save all information
                        //TH1 : $scope.count.counts null
                        if(shopCart.count.length == 0)
                        {
                            shopCart.count.push(
                                {
                                    good_id : quantity.good_id,
                                    count   : quantity.number
                                }
                            )
                        }else
                        if(shopCart.count.length > 0)
                        {
                            var dem = 0;
                            angular.forEach(shopCart.count, function(countValue, countKey){
                                if(countValue.good_id == quantity.good_id)
                                {
                                    dem++;
                                    countValue.count = quantity.number;
                                }
                            });
                            if(dem == 0)
                            {
                                shopCart.count.push(
                                    {
                                        good_id : quantity.good_id,
                                        count   : quantity.number
                                    }
                                ) 
                            }
                        }
                    }
                }
            },function(response){
                console.log(response);
            });
        });
    //When change Table shopcart update to show new table
    $scope.$on('change-table', function(){
        $scope.currentTableId   =   checkTable.currentTableId;
        $scope.currentTableTitle=   checkTable.currentTableTitle;
    })
    
    //Function update shopcart
    $scope.updateShopcart = function(quantity)
    {
        var fd = new FormData();
        for(var i=0; i<shopCart.count.length; i++)
        {
            //Convert object to array
            fd.append('quantity['+shopCart.count[i].good_id+']', shopCart.count[i].count);
        }
        $http.post('http://webbase.com.vn/pos/shopcart-api/update-shopcart', fd, {
            headers : {
                'Content-Type' : undefined
            }
        }).then(function(response){
            alert('Update successfull!');
        },function(response){
            console.log(response);
        })
    }
    
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
            checkFood.chooseFood();
            $rootScope.$broadcast('choose-food');
        },function(response){
            console.log(response);
        })
    }
}])