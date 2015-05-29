socialNetwork.controller('WallController', function ($scope, $routeParams, $location, userServices, notify) {

    var startPost = '';
    var username = $routeParams.username;
    $scope.wallData = [];
    $scope.loadingPosts = false;
    $scope.noMorePostsToShow = false;

    $scope.getUserWall = function () {
        userServices.getUserWall(username, startPost, null)
            .then(
            function success(response) {
                $scope.loadingPosts = false;
                if (response.data.length > 0) {
                    $scope.wallData = $scope.wallData.concat(response.data);
                    startPost = response.data[response.data.length - 1].id;
                } else {
                    $scope.noMorePostsToShow = true;
                }
            },
            function error() {

            }
        )
    };

    $scope.redirectToUser = function (username) {
        $location.path('/users/' + username);
    };


    if (username) {
        $scope.getUserWall();
        $(window).scroll(function () {

            var scrollTop = $(window).scrollTop(),
                documentHeight = $(document).height(),
                windowHeight = $(window).height(),
                scrollOffset = 1;
            
            if ((documentHeight - scrollTop - windowHeight) <= scrollOffset && !$scope.loadingPosts) {

                $scope.getUserWall();
                $scope.loadingPosts = !$scope.noMorePostsToShow;
                console.log('Getting next 5 posts')
            }
        });
    }
});