socialNetwork.factory('auxiliaryServices', function ($http, baseUrl, notify) {
    var service = {};

    service.convertDate = function (dateString) {
/*
        var date = new Date(utcDate);
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
*/      var date = new Date(dateString);
        return $.format.date(dateString, "dd/MM/yyyy HH:mm:ss");
    };

    return service;
});