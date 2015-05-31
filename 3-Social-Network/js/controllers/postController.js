socialNetwork.controller('PostController', function ($scope, $rootScope, $route, userServices, sharedService, postServices) {

    sharedService.set('PostController', $scope);

    $scope.addNewPost = function (postContent, username) {

        if (username == undefined) {
            var scopeNewsFeedController = sharedService.get('NewsFeedController', $scope.newsFeed);
            target = scopeNewsFeedController.newsFeed;
        } else {
            var scopeWallController = sharedService.get('WallController', $scope.wallData);
            target = scopeWallController.wallData;
        }

        var user = username || $rootScope.userData.username;

        postServices.addNewPost(postContent, user)
            .then(
            function success(response) {
                target.unshift(response.data);
            },
            function error() {

            }
        )
    };

    $scope.likePost = function (postId) {
        var target;
        if (sharedService.get('NewsFeedController', $scope.newsFeed) == undefined) {
            var scopeWallController = sharedService.get('WallController', $scope.wallData);
            target = scopeWallController.wallData;
        } else {
            var scopeNewsFeedController = sharedService.get('NewsFeedController', $scope.newsFeed);
            target = scopeNewsFeedController.newsFeed;
        }

        postServices.likePost(postId)
            .then(function success(response) {
                var id = findPostById(postId, target);
                target[id].liked = true;
                target[id].likesCount++;
            },
            function error(error) {

            })
    };

    $scope.unlikePost = function (postId) {
        var target;
        if (sharedService.get('NewsFeedController', $scope.newsFeed) != undefined) {
            var scopeNewsFeedController = sharedService.get('NewsFeedController', $scope.newsFeed);
            target = scopeNewsFeedController.newsFeed;
        } else {
            var scopeWallController = sharedService.get('WallController', $scope.wallData);
            target = scopeWallController.wallData;
        }

        postServices.unlikePost(postId)
            .then(function success(response) {
                console.log(response)
                var id = findPostById(postId, target);
                target[id].liked = false;
                target[id].likesCount--;
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