socialNetwork.controller('CommentsController', function ($scope, $route, $location, userServices) {

    $scope.addNewComment = function (postId, commentContent) {
        var target;

        if ($scope.newsFeed == undefined) {
            target = $scope.wallData;
        } else {
            target = $scope.newsFeed;
        }
        console.log(target);
        userServices.addNewComment(postId, commentContent)
            .then(function success(response) {

                //console.log(response);
                var post = findPostById(postId, target);
                target[post].comments.unshift(response.data);
                target[post].totalCommentsCount++;

            },
            function error(error) {
                console.log(error)
            })
    };

    $scope.showAllComments = function (postId) {
        var target;

        if ($scope.newsFeed == undefined) {
            target = $scope.wallData;
        } else {
            target = $scope.newsFeed;
        }
        
        userServices.showAllComments(postId)
            .then(function success(response) {
                console.log(response);
                var post = findPostById(postId, target);
                target[post].comments = response.data;
            },
            function error(error) {
                console.log(error)
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