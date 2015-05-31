socialNetwork.controller('PostController', function ($scope, $rootScope, $location, $route, userServices) {

    $scope.addNewPost = function (postContent, username) {


        var user = username || $rootScope.userData.username;

        userServices.addNewPost(postContent, user)
            .then(
            function success() {
                $route.reload();
            },
            function error() {

            }
        )
    };

    $scope.likePost = function (postId) {
        postServices.likePost()
            .then(function success(response) {
                
            },
            function error(error) {

            })
    };

    $scope.unlikePost = function (postId) {
        postServices.unlikePost()
            .then(function success(response) {

            },
            function error(error) {

            })
    }

});