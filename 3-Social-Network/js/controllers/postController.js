socialNetwork.controller('PostController', function ($scope, $rootScope, $location, $route, userServices, notify) {

    $scope.addNewPost = function (postContent, username) {


        var user = username || $rootScope.userData.username;
        console.log(user)
        /*
        userServices.addNewPost(postContent, user)
            .then(
            function success() {
                $location.path('/users/' + username);
            },
            function error() {

            }
        )
        */
    };

    //console.log('current user is ' + $scope.currentUser.username);
    //console.log('user data is ' + $scope.userData.username);
});