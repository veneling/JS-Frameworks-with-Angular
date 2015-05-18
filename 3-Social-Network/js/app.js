var socialNetwork = angular.module('socialNetwork', ['ngRoute', 'controllers']);

socialNetwork.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/welcome.html',
                controller: 'welcomeController'
            })
            .when('/login', {
                templateUrl: 'partials/login-form.html',
                controller: 'loginController'
            })
            .when('/register', {
                templateUrl: 'partials/register-form.html',
                controller: 'registerController'
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);