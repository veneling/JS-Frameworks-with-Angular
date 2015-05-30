socialNetwork.controller('NewsFeedController', function ($scope, $routeParams, $location, userServices) {

    var startPost = '';
    $scope.newsFeed = [];
    $scope.loadingPosts = false;
    $scope.noMorePostsToShow = false;

    $scope.getMyNewsFeed = function () {
        userServices.getMyNewsFeed(startPost, null)
            .then(function success(response) {
                $scope.loadingPosts = false;
                if (response.data.length > 0) {
                    $scope.newsFeed = $scope.newsFeed.concat(response.data);
                    startPost = response.data[response.data.length - 1].id;
                } else {
                    $scope.noMorePostsToShow = true;
                }
            },
            function error(error) {

            })
    };

    $scope.getMyNewsFeed();

    $(window).scroll(function () {

        var scrollTop = $(window).scrollTop(),
            documentHeight = $(document).height(),
            windowHeight = $(window).height(),
            scrollOffset = 50;

        if ((documentHeight - scrollTop - windowHeight) <= scrollOffset && !$scope.loadingPosts) {

            $scope.getMyNewsFeed();
            $scope.loadingPosts = !$scope.noMorePostsToShow;
            console.log('Getting next 5 posts')
        }
    });

});