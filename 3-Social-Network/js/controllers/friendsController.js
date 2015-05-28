socialNetwork.controller('FriendsController', function ($scope, userServices) {

    $scope.findFriends = function (searchTerm) {
        return userServices.findFriends(searchTerm)

    };

});