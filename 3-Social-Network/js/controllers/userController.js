socialNetwork.controller('UserController', function ($scope, $rootScope, $location, $route, userServices, notify) {

    if (userServices.isLogged()) {
        $scope.userData = {};
        userServices.getFriendRequests()
            .then(function (friendRequests) {
                $scope.friendRequestsCount = friendRequests.data.length == 0 ? "" : friendRequests.data.length;
                $scope.friendRequests = friendRequests.data;
                userServices.getFullUserData(userServices.getUserName())
                    .then(
                    function (userData) {
                        $scope.userData = userData.data;
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            },
            function (error) {
                notify({
                    message: 'Your session has expired. Please sign in again.',
                    duration: 5000,
                    position: 'center'
                });
                userServices.clearCredentials();
                $location.path('/');
            })
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

        userServices.editProfile(data)
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
    
    $scope.approveFriendRequest = function (requestId, friendName) {
        userServices.approveFriendRequest(requestId)
            .then(
            function success(data) {
                notify({
                    message: 'You and ' + friendName + ' are now friends',
                    duration: 5000,
                    position: 'center'
                });
                $location.path('/user/home');
            },
            function error(error) {
                console.log(error)
            }
        )
    };

    $scope.rejectFriendRequest = function (requestId, friendName) {
        userServices.rejectFriendRequest(requestId)
            .then(
            function success(data) {
                notify({
                    message: 'You rejected ' + friendName + "'s request",
                    duration: 5000,
                    position: 'center'
                });
                $location.path('/user/home');
            },
            function error(error) {
                console.log(error)
            }
        )
    };

    $scope.findUsers = function (searchTerm) {
        return userServices.findUsers(searchTerm)
    };

});
