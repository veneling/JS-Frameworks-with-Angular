socialNetwork.controller('FriendFriendsController', function ($scope, $rootScope, $routeParams, $location, userServices, notify) {

    $scope.getFriendFriends = function () {

        var username = $routeParams.username;
        userServices.getFriendFriends(username)
            .then(function success(response) {
                var friendsArray = response.data;
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
                
            })
    };

    $scope.getFriendFriends();

});