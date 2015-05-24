socialNetwork.controller('NotiController', function ($scope, notify) {

    $scope.note = function (message) {
        notify(message);
    }

});