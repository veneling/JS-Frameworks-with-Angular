socialNetwork.controller('AuthController', function ($scope, $location, $route, userServices, notify) {


    $scope.login = function (user) {

        userServices.UserLogin({
                username: user.username,
                password: user.password
            },
            function (response) {
                userServices.SetCredentials(response);
                $location.path('/user/home');
                console.log(response)
            },
            function (error) {
                notify({
                    message: 'The user name or password is incorrect.',
                    duration: 5000,
                    position: 'center'
                });
            })
    };

    $scope.register = function (user) {
        userServices.UserRegister({
                username: user.username,
                password: user.password,
                confirmPassword: user.confirmPassword,
                name: user.name,
                email: user.email
            },
            function (response) {
                $location.path('/user/home');
                console.log(response.access_token);
                console.log(response.userName);
            },
            function (error) {

                var response;

                switch (error.message) {
                    case 'The request is invalid.':
                        response = 'Name ' + user.username + ' is already taken.';
                        break;
                    case 'Email is already taken.' :
                        response = error.message;
                        break;
                }

                notify({
                    message: response,
                    duration: 5000,
                    position: 'center'
                });

                console.log(error)
            })
    };

    $scope.logout = function () {
        userServices.ClearCredentials();
        $location.path('/');
    }
});