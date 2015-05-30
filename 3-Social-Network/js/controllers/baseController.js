socialNetwork.controller('BaseController', function ($scope, $location, $route, userServices) {

    $scope.isLogged = function () {
        userServices.isLogged()
            .then(function success() {
                return true;
            },
            function error() {
                $location.path('/');
                return false;
            })
    };

    $scope.isLogged();

});
