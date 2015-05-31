socialNetwork.controller('UserHeaderController', function ($scope, $rootScope, $routeParams, $location, userServices, notify) {

    $scope.getFullUserData = function (username) {
        userServices.getFullUserData(username)
            .then(
            function success(response) {
                $rootScope.currentUser = response.data;
                if($rootScope.currentUser.coverImageData == null) {
                    $rootScope.currentUser.coverImageData = userServices.getDefaultBackgroundImage();
                }
                if($rootScope.currentUser.profileImageData == null) {
                    $rootScope.currentUser.profileImageData = userServices.getDefaultProfileImage();
                }
            },
            function error(error) {
                console.log(error);
            }
        )
    };
    
    $scope.getFullUserData($routeParams.username);

});