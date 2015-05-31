socialNetwork.factory('postServices', function ($http, baseUrl, userServices) {

    var serviceUrl = baseUrl + '/users';

    var service = {};

    service.addNewPost = function (postContent, username) {
        return $http({
            method: 'POST',
            url: baseUrl + '/posts',
            data : {
                postContent : postContent,
                username : username
            },
            headers: this.getHeaders()
        })
    };
    
    service.deletePost = function (postId) {
        return $http({
            method: 'DELETE',
            url: baseUrl + '/Posts/' + postId,
            headers: userServices.getHeaders()
        })
    };
    
    service.likePost = function (postId) {
        return $http({
            method: 'POST',
            url: baseUrl + '/Posts/' + postId + '/likes',
            headers: userServices.getHeaders()
        })
    };

    service.unlikePost = function (postId) {
        return $http({
            method: 'DELETE',
            url: baseUrl + '/Posts/' + postId + '/likes',
            headers: userServices.getHeaders()
        })
    };



    return service;
});