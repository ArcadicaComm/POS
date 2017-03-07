var posApp = angular.module('posApp', ['ngRoute']);

posApp.config(function($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/list_product/:id', {
        templateUrl : 'assets/angularjs/views/list_product.php',
        controller  : 'listProductController'
    }).when('/list_product',{
        templateUrl : 'assets/angularjs/views/list_product.php',
        controller  : 'listProductController'
    }).when('/combo', {
        templateUrl : 'assets/angularjs/views/combo.php',
        controller  : 'comboController'
    }).when('/', {
        templateUrl : 'assets/angularjs/views/table_list.php',
        controller  : 'tableController'
    }).when('/takeaway', {
        templateUrl : 'assets/angularjs/views/takeaway.php'
    }).when('/delivery', {
        templateUrl : 'assets/angularjs/views/delivery.php',
        controller  : 'deliveryController'
    }).when('/check_out', {
        templateUrl : 'assets/angularjs/views/check_out.html',
        controller  : 'checkOutController'
    })
})