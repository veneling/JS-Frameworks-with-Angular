socialNetwork.controller('BaseController', function ($scope, $location, $route, userServices, notify) {

    if (userServices.isLogged()) {
        $location.path('/user/home');
    }


});