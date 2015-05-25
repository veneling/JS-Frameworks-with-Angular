socialNetwork.controller('UserController', function ($scope, $location, $route, userServices, notify) {


    if (userServices.isLogged()) {
        $scope.userData = {};
        userServices.GetFullUserData()
            .then(
            function (userData) {
                $scope.userData = userData.data;
            },
            function (error) {
                notify({
                    message: 'Unable to get current user data',
                    duration: 5000,
                    position: 'center'
                })
            }
        );
    }

    function replaceEmptyImages(userData) {
        if (userData.coverImageData == null) {
            userData.coverImageData = 'http://www.tutorialrepublic.com/lib/images/bootstrap/twitter-bootstrap-image-styling.png';
        }

        if (userData.profileImageData == null) {
            userData.profileImageData = "http://www.unipartners.org/sites/default/files/default_images/user_blank_3.png";
        }
    }

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
                $location.path('/user/home');
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
