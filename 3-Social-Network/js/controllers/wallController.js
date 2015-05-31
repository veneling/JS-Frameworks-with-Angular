socialNetwork.controller('WallController', function ($scope, $routeParams, $location, userServices, auxiliaryServices) {

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

                    for (var i = 0; i < response.data.length; i++) {
                        response.data[i].date = auxiliaryServices.convertDate(response.data[i].date);
                        for (var j = 0; j < response.data[i].comments.length; j++) {
                            response.data[i].comments[j].date = auxiliaryServices.convertDate(response.data[i].comments[j].date);
                        }
                    }

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

    if (username) {
        $scope.getUserWall();
        $(window).scroll(function () {

            var scrollTop = $(window).scrollTop(),
                documentHeight = $(document).height(),
                windowHeight = $(window).height(),
                scrollOffset = 10;

            if ((documentHeight - scrollTop - windowHeight) <= scrollOffset && !$scope.loadingPosts) {

                $scope.getUserWall();
                $scope.loadingPosts = !$scope.noMorePostsToShow;
                console.log('Getting next 5 posts')
            }
        });
    }
});