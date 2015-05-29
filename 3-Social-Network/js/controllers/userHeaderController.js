socialNetwork.controller('UserHeaderController', function ($scope, $routeParams, $location, userServices, notify) {


    $scope.getFullUserData = function (username) {
        userServices.getFullUserData(username)
            .then(
            function success(response) {
                //console.log(response);
                $scope.userHeader = response.data;
                if($scope.userHeader.coverImageData == null) {
                    $scope.userHeader.coverImageData = userServices.getDefaultBackgroundImage();
                }
                if($scope.userHeader.profileImageData == null) {
                    $scope.userHeader.profileImageData = userServices.getDefaultProfileImage();
                }
            },
            function error(error) {
                console.log(error);
            }
        )
    };
    
    $scope.sendFriendRequest = function () {
        userServices.sendFriendRequest($routeParams.username)
            .then(
            function success(response) {
                notify({
                    message: 'Request for friendship successfully sent',
                    duration: 5000,
                    position: 'center'
                });
            },
            function error(error) {
                console.log(error);
            }
        )
    };
    
    $scope.getFullUserData($routeParams.username);

});