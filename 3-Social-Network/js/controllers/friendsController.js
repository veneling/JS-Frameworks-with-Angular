socialNetwork.controller('FriendsController', function ($scope, $routeParams, $location, userServices) {

    $scope.getOwnFriends = function () {
        userServices.getOwnFriends()
            .then(function success(response) {
                for(var i = 0; i < response.data.friends.length; i++){
                    if(response.data.friends[i].profileImageData == null) {
                        response.data.friends[i].profileImageData = userServices.getDefaultProfileImage();
                    }
                }
                $scope.friendsList = response.data.friends;
                $scope.friendsListCount = response.data.totalCount;
                console.log($scope.friendsList);
            },
            function error(error) {
                console.log(error)
            })
    };

    $scope.getOwnFriends();

});