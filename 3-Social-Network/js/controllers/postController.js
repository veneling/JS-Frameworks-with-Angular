socialNetwork.controller('PostController', function ($scope, $rootScope, $location, userServices, notify) {

    $scope.addNewPost = function (postContent) {

        userServices.addNewPost(postContent, $rootScope.userData.username)
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