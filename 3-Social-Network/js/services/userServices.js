socialNetwork.factory('userServices', function ($http, baseUrl) {

    var serviceUrl = baseUrl + '/users';

    var service = {};

    service.UserLogin = function (loginData) {
        return $http({
            method: 'POST',
            url: serviceUrl + '/login',
            data: loginData
        })
    };

    service.UserRegister = function (registerData) {
        return $http({
            method: 'POST',
            url: serviceUrl + '/register',
            data: registerData
        })
    };

    service.ChangePassword = function (passwords) {
        console.log(this.GetHeaders());
        return $http({
            method: 'PUT',
            url: baseUrl + '/me/changepassword',
            data: passwords,
            headers: this.GetHeaders()
        })
    };

    service.EditProfile = function (userData) {
        return $http({
            method: 'PUT',
            url: baseUrl + '/me',
            data: userData,
            headers: this.GetHeaders()
        })
    };

    service.GetFullUserData = function () {
        return $http({
            method: 'GET',
            url: serviceUrl + '/' + localStorage['username'],
            headers: this.GetHeaders()
        })
    };

    service.SetCredentials = function (loginData) {
        localStorage['accessToken'] = loginData.data.access_token;
        localStorage['username'] = loginData.data.userName;
    };

    service.GetUsername = function () {
        return localStorage['username'];
    };

    service.ClearCredentials = function () {
        localStorage.clear();
    };

    service.GetHeaders = function () {
        return {
            Authorization: "Bearer " + localStorage['accessToken']
        };
    };

    service.isLogged = function () {
        return localStorage['accessToken'];
    };

    return service;
});