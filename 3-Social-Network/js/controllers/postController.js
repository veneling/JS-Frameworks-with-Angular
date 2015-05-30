socialNetwork.controller('PostController', function ($scope, $rootScope, $location, $route, userServices, notify) {

    $scope.addNewPost = function (postContent, username) {

        var user = username || $rootScope.userData.username;
        userServices.addNewPost(postContent, user)
            .then(
            function success() {
                $location.path('/users/' + username);
                $route.reload();
            },
            function error() {

            }
        )
    }

});