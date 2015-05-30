socialNetwork.controller('FriendsController', function ($scope, $routeParams, $location, userServices, notify) {

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
            },
            function error(error) {
                if(error.data.message = 'Session token expired or not valid.') {
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

    $scope.getOwnFriends();

});