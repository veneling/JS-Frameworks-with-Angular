socialNetwork.controller('FriendsController', function ($scope, $rootScope, $routeParams, $location, userServices, notify) {

    $scope.getOwnFriends = function () {

        userServices.getOwnFriends()
            .then(function success(response) {
                var friendsArray =  response.data.friends;
                for (var i = 0; i < friendsArray.length; i++) {
                    if (friendsArray[i].profileImageData == null) {
                        friendsArray[i].profileImageData = userServices.getDefaultProfileImage();
                    }
                }
                $scope.friendsList = friendsArray;
                $scope.friendsListCount = friendsArray.length;
            },
            function error(error) {
                console.log(error);

                if (error.data.message = 'Session token expired or not valid.') {
                    notify({
                        message: error.data.message,
                        duration: 5000,
                        position: 'center'
                    })
                } else {
                    notify({
                        message: 'Unexpected error. Please, login again.',
                        duration: 5000,
                        position: 'center'
                    });
                    $location.path('/');
                }
            })
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
                if (error.data.message == 'A pending request already exists.') {
                    notify({
                        message: 'You have pending request to this user which he/she still hasn\'t reviewed.',
                        duration: 5000,
                        position: 'center'
                    });
                }
            }
        )
    };

    $scope.getOwnFriends();

});