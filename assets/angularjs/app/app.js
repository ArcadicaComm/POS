var posApp = angular.module('posApp', ['ngRoute']);

posApp.config(function($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/list_product/:id', {
        templateUrl : 'assets/angularjs/views/list_product.html',
        controller  : 'listProductController'
    }).when('/list_product',{
        templateUrl : 'assets/angularjs/views/list_product.html',
        controller  : 'listProductController'
    }).when('/combo', {
        templateUrl : 'assets/angularjs/views/combo.html',
        controller  : 'comboController'
    }).when('/', {
        templateUrl : 'assets/angularjs/views/table_list.html',
        controller  : 'tableController'
    }).when('/takeaway', {
        templateUrl : 'assets/angularjs/views/takeaway.html'
    }).when('/delivery', {
        templateUrl : 'assets/angularjs/views/delivery.html',
        controller  : 'deliveryController'
    }).when('/check_out', {
        templateUrl : 'assets/angularjs/views/check_out.html',
        controller  : 'checkOutController'
    }).when('/invoice', {
        templateUrl : 'assets/angularjs/views/invoice.html',
        controller  : 'invoiceController'
    })
})