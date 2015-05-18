angular.module('imageSource', [])
    .controller('controller', ['$scope', function ($scope) {
        $scope.url = '';
    }])
    .directive('imageCheck', function () {
        return {
            link: function (scope, element, attrs) {

                scope.$watch('url', function () {
                    scope.validUrl = (scope.url).match(/\.(jpeg|jpg|gif|png)$/) != null ? true : false;
                    element.text(scope.validUrl ? 'valid image' : 'invalid image');
                });
            }
        }
    })
    .directive('imageDestination', function () {
        return {
            link: function (scope, element, attrs) {
                scope.$watch('url', function () {
                    if (scope.validUrl) {
                        console.log(scope.url);
                        element.attr('src',scope.url);
                    }
                });
            }
        }
    });