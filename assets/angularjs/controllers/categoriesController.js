//Controller controls categories
posApp.controller('categoriesController', ['$scope', '$http', 'baseUrl', 'checkTable', function($scope, $http, baseUrl, checkTable){
    //The table is chosen
    $scope.$on('choose-table',function(){
        $scope.menu = checkTable.status;
    });
    //The table is canceled or not chosen
    $scope.$on('cancel-table', function(){
        $scope.menu = checkTable.status;
    })
    
    //Lấy ra toàn bộ categories
    $http.get('http://webbase.com.vn/pos/category-api')
    .then(function(response){
        $scope.categories = response.data;
    },function(response){
        
    });
}])