var socialNetwork = angular.module('socialNetwork', ['ngRoute', 'cgNotify', 'naif.base64']);

socialNetwork.constant('baseUrl','http://softuni-social-network.azurewebsites.net/api');

socialNetwork.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/welcome.html',
                controller: 'BaseController'
            })
            .when('/logout', {
                templateUrl: 'partials/welcome.html',
                controller: 'BaseController'
            })
            .when('/user/home', {
                templateUrl: 'partials/news-feed.html',
                controller: 'BaseController'
            })
            .when('/user/edit-profile', {
                templateUrl: 'partials/edit-profile.html',
                controller: 'BaseController'
            })
            .when('/user/change-password', {
                templateUrl: 'partials/change-password.html',
                controller: 'BaseController'
            })
            .when('/users/:username', {
                templateUrl: 'partials/user-wall.html',
                controller: 'BaseController'
            })
            .when('/users/:username/friends', {
                templateUrl: 'partials/view-friends/logged-user-all-friends.html',
                controller: 'BaseController'
            })
            .when('/me/friends/preview', {
                templateUrl: 'partials/view-friends/user-all-friends.html',
                controller: 'BaseController'
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);