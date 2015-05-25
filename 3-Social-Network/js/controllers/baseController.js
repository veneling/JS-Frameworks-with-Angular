socialNetwork.controller('BaseController', function ($scope, $location, $route, userServices, notify) {

    if (userServices.isLogged() == undefined) {
        $location.path('/');
    } else {
        if ($location.path() == '/') {
            $location.path('/user/home');
        }
    }

});
