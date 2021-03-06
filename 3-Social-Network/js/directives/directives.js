socialNetwork.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("unique", n);

            });
        }
    };
}]);

socialNetwork.directive('resizer', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, control) {

            var customDimentions = attrs.resizer.split(',');
            var width = parseInt(customDimentions[0]);
            var height = parseInt(customDimentions[1]);

            var sizeCheck = function () {
                return element[0].width > width && element[0].height > height;
            };

            scope.$watch(sizeCheck(), function () {
                element[0].width = width;
                element[0].height = height;
            })
        }
    }
}]);

socialNetwork.directive('pictureChecker', [function () {
    return {
        restrict: 'A',
        controller: 'NotiController',
        link: function (scope, element, attrs, control) {

            var imageType = attrs.pictureChecker.indexOf('profile') != -1;
            var sizeLimit = imageType ? 128 : 1024;

            element.bind('change', function () {

                var file = element[0].files[0];
                var sizeCheck = file.size / 1024 <= sizeLimit;
                var typeCheck = file.type.match(/image\/.*/);

                console.log(sizeCheck + ' ' + typeCheck);
                if (typeCheck != null && sizeCheck) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        if (imageType) {
                            scope.userData.profileImageData = reader.result;
                        } else {
                            scope.userData.coverImageData = reader.result;
                        }
                        $('#' + attrs.pictureChecker).attr('src', reader.result);
                    };
                    reader.readAsDataURL(file);
                } else {
                    var message;
                    if (!sizeCheck) {
                        message = 'File should be up to ' + sizeLimit + 'KB. ';
                    }
                    if (!typeCheck) {
                        message = 'File should be valid picture format (.jpg, .png...)';
                    }
                    scope.note({
                        message: message,
                        duration: 5000,
                        position: 'center'
                    });
                }
            });
        }
    }
}]);

socialNetwork.directive('autocomplete', ['$http', '$location', function ($http, $location) {
    return function (scope, element, attrs) {
        element.autocomplete({
            delay: 500,
            source: function (request, response) {
                scope.findUsers(request.term)
                    .success(function (data) {
                        response(data)
                    })
            },
            select: function (event, ui) {
                //redirect to user wall. ui holds the selected user as object.
                $location.path('/users/' + ui.item.username);
                scope.$apply();
                return false;
            }
        }).data('ui-autocomplete')._renderItem = function (ul, item) {
            var menuItem;
            if (item.profileImageData == null) {
                menuItem = '<a><img src="/4-Social-Network/img/default-profile.jpg" width="40" height="40">' + item.name + '</a>'
            } else {
                menuItem = '<a><img src="' + item.profileImageData + '" width="40" heigth="40">' + item.name + '</a>'
            }
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(menuItem)
                .appendTo(ul)
        }
    }
}]);