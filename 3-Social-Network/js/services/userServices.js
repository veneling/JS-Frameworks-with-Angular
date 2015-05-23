socialNetwork.factory('userServices', function ($http, baseUrl) {

    var serviceUrl = baseUrl + '/users';

    var service = {};

    service.UserLogin = function (loginData, success, error) {
        var responsePromise =  $http.post(serviceUrl + '/login', loginData)
            .success(function (data, status, headers, config) {
                success(data);
            })
            .error(function (data, status, headers, config) {
                error(data);
            });
    };

    service.UserRegister = function (registerData, success, error) {
        var responsePromise =  $http.post(serviceUrl + '/register', registerData)
            .success(function (data, status, headers, config) {
                success(data);
            })
            .error(function (data, status, headers, config) {
                error(data);
            });
    };

    service.SetCredentials = function (loginData) {
        localStorage['accessToken'] = loginData.access_token;
        localStorage['username'] = loginData.userName;
    };

    service.GetUsername = function () {
        return localStorage['username'];
    };

    service.ClearCredentials = function () {
        localStorage.clear();
    };

    service.GetHeaders = function() {
        return {
            Authorization: "Bearer " + localStorage['accessToken']
        };
    };

    service.isLogged = function () {
        return localStorage['accessToken'];
    };

    return service;
});