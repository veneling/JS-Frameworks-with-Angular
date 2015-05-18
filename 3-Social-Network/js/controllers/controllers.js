var controllers = angular.module('controllers', ['socialNetwork']);

controllers.controller('welcomeController', function ($scope) {

});

controllers.controller('loginController', function ($http, $scope) {

    $scope.submit = function (user) {

        var responsePromise = $http.post('http://softuni-social-network.azurewebsites.net/api/users/login', {
            username: user.username,
            password: user.password
        });

        responsePromise.success(function (data, status, headers, config) {
            console.log(data.access_token);
            console.log(data.userName);
        });
        responsePromise.error(function (data, status, headers, config) {
            console.log("AJAX failed!");
        });

    }

});

controllers.controller('registerController', function ($scope) {

});