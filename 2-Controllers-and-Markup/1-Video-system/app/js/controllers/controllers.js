var videoControllers = angular.module('videoControllers', ['videoSystem']);

videoControllers.controller('ListVideosCtrl', function ($rootScope) {
    $rootScope.videos = $rootScope.videos || [
        new Video('The avengers', 'the_avengers.jpg', new Date(0, 0, 0, 1, 23), 'Action', new Date(2012, 4, 21), true),
        new Video('Hot pursuit', 'hot_pursuit.jpg', new Date(0, 0, 0, 1, 45), 'Action', new Date(2015, 4, 10), true),
        new Video('The D train', 'the_d_train.jpg', new Date(0, 0, 0, 1, 28), 'Comedy', new Date(2015, 3, 5), true),
        new Video('5 flights up', '5_flights_up.jpg', new Date(0, 0, 0, 1, 16), 'Drama', new Date(2014, 9, 22), false),
        new Video('Maggie', 'maggie.jpg', new Date(0, 0, 0, 2, 10), 'Thriller', new Date(2015, 1, 10), false),
        new Video('Saint Laurent', 'saint_laurent.jpg', new Date(0, 0, 0, 2, 30), 'Biography', new Date(2014, 7, 17), false),
        new Video('I am big bird: The Caroll Spinney Story', 'I_am_a_bird.jpg', new Date(0, 0, 0, 1, 30), 'Biography', new Date(2014, 5, 11), true),
        new Video('Noble', 'noble.jpg', new Date(0, 0, 0, 1, 40), 'Drama', new Date(2015, 2, 12), false),
        new Video('Skin Trade', 'skin_trade.jpg', new Date(0, 0, 0, 1, 36), 'Action', new Date(2014, 11, 11), true)
    ];
    $rootScope.orderProp = 'title';
    $rootScope.addVideo = function (video) {
        var newVideo = new Video(video.title, video.picture, video.length, video.category, video.date, video.haveSubtitles);
        $rootScope.videos.push(newVideo);
    }
});