socialNetwork.controller('PostController', function ($scope, $rootScope, $route, userServices, sharedService, postServices) {

    sharedService.set('PostController', $scope);

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
        var scopeNewsFeedController = sharedService.get('NewsFeedController', $scope.newsFeed);
        var newsFeed = scopeNewsFeedController.newsFeed;

        console.log(postId)
        console.log(newsFeed)

        postServices.likePost(postId)
            .then(function success(response) {
                var id = findPostById(postId, newsFeed);
                newsFeed[id].liked = true;
                newsFeed[id].likesCount++;
            },
            function error(error) {

            })

    };

    $scope.unlikePost = function (postId) {
        var scopeNewsFeedController = sharedService.get('NewsFeedController', $scope.newsFeed);
        var newsFeed = scopeNewsFeedController.newsFeed;

        postServices.unlikePost(postId)
            .then(function success(response) {
                var id = findPostById(postId, newsFeed);
                newsFeed[id].liked = true;
                newsFeed[id].likesCount--;
            },
            function error(error) {

            })
    };

    function findPostById(postId, target) {
        for (var i = 0; i < target.length; i++) {
            if (target[i].id == postId) {
                return i;
            }
        }
    }

});