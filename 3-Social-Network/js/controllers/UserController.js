socialNetwork.controller('UserController', function ($scope, $location, $route, userServices, notify) {

    if (userServices.isLogged()) {
        $scope.userData = {};
        userServices.GetFullUserData()
            .then(
            function (userData) {
                $scope.userData = userData.data;
                checkForEmptyImages($scope.userData);
                $scope.userData.gender = 1;
            },
            function (error) {
                notify({message: 'Unable to get current user data'})
            }
        );
    }

    function checkForEmptyImages(userData) {
        if (userData.coverImageData == null) {
            userData.coverImageData = 'http://www.tutorialrepublic.com/lib/images/bootstrap/twitter-bootstrap-image-styling.png';
        }

        if (userData.profileImageData == null) {
            userData.profileImageData = "http://www.unipartners.org/sites/default/files/default_images/user_blank_3.png";

        }
    }

    $scope.avatarChanged = function (element) {
        convertImage(element.files[0], 'profile', 128);
    };

    $scope.backgroundChanged = function (element) {
        convertImage(element.files[0], 'background', 1024);
    };

    var convertImage = function (file, imageType, sizeLimit) {
        var sizeCheck = file.size / 1024 <= sizeLimit;
        var typeCheck = file.type.match(/image\/.*/);

        console.log(sizeCheck + ' ' + typeCheck);
        if (typeCheck != null && sizeCheck) {
            var reader = new FileReader();
            reader.onload = function () {
                if (imageType == 'profile') {
                    console.log(reader.result);
                    $scope.userData.profileImageData = reader.result;
                } else {
                    $scope.userData.coverImageData = reader.result;
                }
            };
            reader.readAsDataURL(file);
        } else {
            notify({
                message: 'File type not supported!',
                duration: 5000,
                position: 'center'
            });
        }
    };

});