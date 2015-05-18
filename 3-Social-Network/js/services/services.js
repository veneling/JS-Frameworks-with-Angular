var services = angular.module('services', ['ngResource']);

services.factory('loginService', ['$resource', '$rootScope', '$http',
    function ($resource) {
        return $resource('http://softuni-social-network.azurewebsites.net/api/users/login', {
            username : 'veni', password : 'veniveni' }, {
            query: {method:'GET'}
            })
    }]);