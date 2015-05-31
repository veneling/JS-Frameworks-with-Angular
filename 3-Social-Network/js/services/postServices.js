socialNetwork.factory('postServices', function ($http, baseUrl) {

    var serviceUrl = baseUrl + '/users';

    var service = {};

    service.likePost = function (postId) {
        return $http({
            method: 'POST',
            url: baseUrl + '/Posts/' + postId + 'likes',
            headers: this.getHeaders()
        })
    };

    service.unlikePost = function (postId) {
        return $http({
            method: 'DELETE',
            url: baseUrl + '/Posts/' + postId + 'likes',
            headers: this.getHeaders()
        })
    };

    return service;
});