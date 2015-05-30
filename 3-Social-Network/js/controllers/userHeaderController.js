socialNetwork.controller('UserHeaderController', function ($scope, $rootScope, $routeParams, $location, userServices, notify) {


    $scope.getFullUserData = function (username) {
        userServices.getFullUserData(username)
            .then(
            function success(response) {
                //console.log(response);
                $rootScope.userHeader = response.data;
                if($rootScope.userHeader.coverImageData == null) {
                    $rootScope.userHeader.coverImageData = userServices.getDefaultBackgroundImage();
                }
                if($rootScope.userHeader.profileImageData == null) {
                    $rootScope.userHeader.profileImageData = userServices.getDefaultProfileImage();
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
                if(error.data.message == 'A pending request already exists.') {
                    notify({
                        message: 'You have pending request to this user which he/she still hasn\'t reviewed.',
                        duration: 5000,
                        position: 'center'
                    });
                }
            }
        )
    };
    
    $scope.getFullUserData($routeParams.username);

});