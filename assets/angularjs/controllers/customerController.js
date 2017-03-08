posApp.controller('customerController', ['$scope', '$http', '$route', function($scope,$http,$route){
    $scope.$on('checkOut', function(){
        $scope.customerStyle = {
            width : '350px'
        };
        $scope.addCustomerStatus = 1;
        $scope.customer = {};
        $scope.getGender = function(gender){
            $scope.customer.gender = gender;
        }
        $scope.addCustomer = function(){
            if($scope.customer.first_name != null && $scope.customer.last_name && $scope.customer.tel != null)
            {
                //Check telephone number is exit or not
                var customer_count = 0;
                $http.get('http://webbase.com.vn/pos/customer-api')
                .then(function(response){
                    angular.forEach(response.data, function(customerValue, customerKey){
                        if($scope.customer.tel == customerValue.tel)
                        {
                            customer_count++;
                        }
                    });
                    if(customer_count > 0)
                    {
                        swal({
                            title: 'Customer is exit!',
                            text: '',
                            type: "error",
                        });
                        $scope.newStyle = {
                            display : 'none'
                        };
                        $scope.customerStyle = angular.extend($scope.customerStyle, $scope.newStyle);
                        $scope.customer = {};
                        $route.reload();
                    }else if(customer_count == 0)
                    {
                        console.log($scope.customer.discount_percent);
                        var fd = new FormData();
                        fd.append('first_name', $scope.customer.first_name);
                        fd.append('last_name', $scope.customer.last_name);
                        fd.append('tel', $scope.customer.tel);
                        if($scope.customer.email != undefined)
                        {
                            fd.append('email', $scope.customer.email);
                        }
                        if($scope.customer.address != undefined)
                        {
                            fd.append('address', $scope.customer.address);
                        }
                        if($scope.customer.gender != undefined)
                        {
                            fd.append('gender', $scope.customer.gender);
                        }
                        if($scope.customer.discount_percent != undefined)
                        {
                            fd.append('discount_percent', $scope.customer.discount_percent);
                        }else
                        {
                            fd.append('discount_percent', 0);
                        }
                        $http.post('http://webbase.com.vn/pos/customer-api', fd, {
                            headers : {
                                'Content-Type' : undefined
                            }
                        }).then(function(response){
                            swal({
                                title: 'Add new customer successfull!',
                                text: '',
                                type: "success",
                            });
                            $scope.newStyle = {
                                display : 'none'
                            };
                            $scope.customerStyle = angular.extend($scope.customerStyle, $scope.newStyle);
                            $scope.customer = {};
                            $route.reload();
                        },function(response){
                            console.log(response);
                        })
                    }
                },function(response){
                    console.log(response);
                })
            }
        };
        
        $scope.showAddCustomer = function(){
            $scope.customerStyle = {
                width : '350px'
            }
        };
    })
    $scope.$on('checkPayment', function(){
        $scope.addCustomerStatus = 0;
    })
}])