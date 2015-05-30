socialNetwork.controller('BaseController', function ($scope, $rootScope, $location, $route, userServices) {

    $scope.isLogged = function () {

        userServices.isLogged()
            .then(function success() {
                $rootScope.loggedIn = true;
            }, function error() {
                $rootScope.loggedIn = false;
                $location.path('/');
            });
    };

    $scope.isLogged();

});
