socialNetwork.controller('PostController', function ($scope, $rootScope, $location, userServices, notify) {

    $scope.addNewPost = function (postContent, username) {

        var user = username || $rootScope.userData.username;
        userServices.addNewPost(postContent, user)
            .then(
            function success() {
                console.log('post posted');
                $location.path('/user/home');
            },
            function error() {

            }
        )
    }

});