var socialNetwork = angular.module('socialNetwork', ['ngRoute', 'cgNotify']);

socialNetwork.constant('baseUrl','http://softuni-social-network.azurewebsites.net/api');

socialNetwork.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/welcome.html',
                controller: 'BaseController'
            })
            .when('/login', {
                templateUrl: 'partials/login-form.html',
                controller: 'BaseController'
            })
            .when('/register', {
                templateUrl: 'partials/register-form.html',
                controller: 'BaseController'
            })
            .when('/logout', {
                templateUrl: 'partials/welcome.html',
                controller: 'BaseController'
            })
            .when('/user/home', {
                templateUrl: 'partials/user-header.html',
                controller: 'AuthController'
            })
            .when('/user/edit-profile', {
                templateUrl: 'partials/edit-profile.html'
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);