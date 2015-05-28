socialNetwork.controller('WallController', function ($scope, $routeParams, $location, userServices, notify) {

    $scope.wallData = [];
    var username = $routeParams.username;
    var startPost;

    $scope.getUserWall = function (username, startPos, pageSize) {
        userServices.getUserWall(username, startPos, pageSize)
            .then(
            function success(response) {
                console.log(response);
                if (response.data.length > 0) {
                    $scope.wallData = $scope.wallData.concat(response.data);
                }
            },
            function error(error) {
                console.log(error);
            }
        )
    };

    $scope.redirectToUser = function (username) {
        $location.path('/users/' + username);
    };

    $scope.getUserWall(username, null, 10);
});