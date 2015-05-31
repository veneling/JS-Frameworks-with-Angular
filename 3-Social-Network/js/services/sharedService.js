socialNetwork.factory('sharedService', function ($rootScope) {

    var service = {};

    return {
        set: function (key, value) {
            $rootScope.$emit('scope.stored', key);
            service[key] = value;
        },
        get: function (key) {
            return service[key];
        }
    };

});