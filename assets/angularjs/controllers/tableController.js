//Controller controls Table list
posApp.controller('tableController', ['$scope', '$http', '$rootScope', '$location', 'baseUrl', 'checkTable', 'checkFood', function($scope, $http, $rootScope, $location, baseUrl, checkTable, checkFood){
    //Refresh changeTable when changeTable
    $scope.$on('change-table', function(){
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
    })
    
    //Set baseUrl by setBaseUrl function in baseUrl service
    $scope.baseUrl = baseUrl.setBaseUrl('http://webbase.com.vn/pos');
    //Function click process link to listProduct (checkTable.status set to 1)
    $scope.pathToListProduct = function(table)
    {
        //Set the table is chosen
        checkTable.chooseTable(); //set checkTable.status = 1
        checkTable.setCurrentTable(table.id, table.title); //set checkTable.currentTableID = table.id and currentTableTitle = table.title
        $rootScope.$broadcast('chooseTable');
        //Set the food is chosen
        checkFood.chooseFood();
        $rootScope.$broadcast('chooseFood');
        $location.path('list_product');
    }
    //The table is cancel or not chosen
    $scope.$on('cancel-table', function(){
        $scope.changeTableStatus = checkTable.changeTableStatus;
    })
    //Check out hide changeTable
    $scope.$on('checkOut', function(){
        $scope.changeTableStatus = 0;
    })
    
    //The table is chosen
    $scope.$on('chooseTable', function(){
        $scope.changeTableStatus = checkTable.changeTableStatus;
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
    })
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
            checkTable.chooseTable();
            checkTable.setCurrentTable(table.id, table.title);
            $rootScope.$broadcast('chooseTable');
            $location.path('list_product');
        },function(response){
            console.log(response);
        })
    }
    
    //Function change table contain food
    $scope.changeTable = function(table){
        $scope.old_table = checkTable.currentTableId;
        $scope.new_table = table.id;
        
        var formData = new FormData();
        formData.append('old_table', $scope.old_table);
        formData.append('new_table', $scope.new_table);
        
        $http.post('http://webbase.com.vn/pos/booktable-api/changetable', formData, {
            headers : {
                'Content-Type' : undefined
            }
        })
        .then(function(response){
            //Change currentTableId to new_table and get new currentTableTitle
            checkTable.currentTableId   =   $scope.new_table;
            checkTable.currentTableTitle=   table.title;
            $rootScope.$broadcast('change-table');
        },function(response){
            console.log(response);
        })
    }
    
}])