socialNetwork.controller('AuthController', function ($scope, $location, $route, userServices, notify) {

    $scope.login = function (user) {
        userServices.userLogin({
            username: user.loginUsername,
            password: user.loginPassword
        })
            .then(
            function success(response) {
                userServices.setCredentials(response);
                $location.path('/user/home');
            },
            function error(error) {
                notify({
                    message: 'The user name or password is incorrect.',
                    duration: 5000,
                    position: 'center'
                });
            })
    };

    $scope.register = function (user) {
        userServices.userRegister({
            username: user.registerUsername,
            password: user.registerPassword,
            confirmPassword: user.confirmPassword,
            name: user.name,
            email: user.email,
            gender: user.gender
        })
            .then( //sets default profile and background images upon registration
            function success(response) {
                userServices.setCredentials(response);
                var data = {};
                data.name = user.name;
                data.email = user.email;
                data.gender = user.gender;
                data.profileImageData = userServices.getDefaultProfileImage();
                data.coverImageData = userServices.getDefaultBackgroundImage();

                userServices.editProfile(data)
                    .then(
                    function success() {
                        $location.path('/user/home');
                    },
                    function error(error) {
                        console.log(error);
                    }
                );
            },
            function error(error) {
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
        notify({
            message: 'Successfully logged out',
            duration: 3000,
            position: 'center'
        });
        userServices.clearCredentials();
        $location.path('/');
    };

    $scope.changePassword = function (passwords) {
        userServices.changePassword({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
            confirmPassword: passwords.confirmPassword
        })
            .then(
            function (response) {
                $location.path('/user/home');
                notify({
                    message: 'Password succesfully changed.',
                    duration: 5000,
                    position: 'center'
                })
            },
            function (error) {
                notify({
                    message: 'Error during the password change.',
                    duration: 5000,
                    position: 'center'
                })
            })
    };
});
