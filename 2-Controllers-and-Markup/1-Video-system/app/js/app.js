var videoSystem = angular.module('videoSystem', ['ngRoute', 'videoControllers', 'videoFilters']);

videoSystem.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/add', {
                templateUrl: 'partials/add-video.html',
                controller: 'ListVideosCtrl'
            })
            .when('/show', {
                templateUrl: 'partials/videos-list.html',
                controller: 'ListVideosCtrl'
            })
            .otherwise({
                redirectTo: '/show'
            })
    }]);



