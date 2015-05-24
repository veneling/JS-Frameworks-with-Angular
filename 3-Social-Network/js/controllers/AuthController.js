socialNetwork.controller('AuthController', function ($scope, $location, $route, userServices, notify) {

    $scope.login = function (user) {

        userServices.UserLogin({
            username: user.loginUsername,
            password: user.loginPassword
        })
            .then(
            function success(response) {
                userServices.SetCredentials(response);
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
        userServices.UserRegister({
            username: user.registerUsername,
            password: user.registerPassword,
            confirmPassword: user.confirmPassword,
            name: user.name,
            email: user.email
        })
            .then(
            function success(response) {
                $location.path('/user/home');
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
        userServices.ClearCredentials();
        $location.path('/');
    };

    $scope.changePassword = function (passwords) {
        userServices.ChangePassword({
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

    $scope.editProfile = function (userData) {
        var data = {};
        data.name = userData.name;
        data.email = userData.email;
        data.profileImageData = userData.profileImageData.base64;
        data.coverImageData = userData.coverImageData.base64;
        data.gender = userData.gender;

        if (data.profileImageData == undefined) {
            data.profileImageData = userData.profileImageData;
        }

        if (data.coverImageData == undefined) {
            data.coverImageData = userData.coverImageData;
        }

        userServices.EditProfile(data)
            .then(
            function success() {
                $location.path('#/user/home');
                notify({
                    message: 'Your profile was successfully updated',
                    duration: 5000,
                    position: 'center'
                })
            },
            function error(error) {
                notify({
                    message: 'Error during profile update',
                    duration: 5000,
                    position: 'center'
                })
            }
        );
    };
});