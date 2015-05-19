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

controllers.controller('registerController', function ($http, $scope, notify) {

    $scope.submit = function (user) {

        var responsePromise = $http.post('http://softuni-social-network.azurewebsites.net/api/users/register', {
            username: user.username,
            password: user.password,
            confirmPassword: user.confirmPassword,
            name: user.name,
            email: user.email
        });

        responsePromise.success(function (data, status, headers, config) {
            console.log(data.access_token);
            console.log(data.userName);
        });
        responsePromise.error(function (data, status, headers, config) {

            //{"message":"The request is invalid.","modelState":{"":["Name veni is already taken."]}}
            //{"message":"Email is already taken."}
            //{"message":"The request is invalid.","modelState":{"model.Password":["The Password must be at least 6 characters long."]}} pwd < 6
            //{"message":"The request is invalid.","modelState":{"model.Password":["The Password must be at least 6 characters long."]}} pwd > 100

            var response;

            switch(data.message) {
                case 'The request is invalid.':
                    response = 'Name '+ user.username + ' is already taken.';
                    break;
                case 'Email is already taken.' :
                    response = data.message;
                    break;
            }

            notify({
                message: response,
                duration : 15000,
                position: 'center'
            });
        });

    }
});