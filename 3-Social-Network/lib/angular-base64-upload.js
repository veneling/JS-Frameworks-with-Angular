/*! angular-base64-upload - v0.1.2
 * https://github.com/adonespitogo/angular-base64-upload
 * Copyright (c) Adones Pitogo <pitogo.adones@gmail.com> 2015;
 * Licensed MIT */
(function (window) {

    'use strict';

    //http://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
    window._arrayBufferToBase64 = function (buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    var mod = window.angular.module('naif.base64', []);

    mod.directive('baseSixtyFourInput', [
        '$window',
        function ($window) {

            var FILE_READER_EVENTS = ['onabort', 'onerror', 'onloadstart', 'onloadend', 'onprogress', 'onload'];
            var isolateScope = {
                onChange: '&'
            };

            for (var i = FILE_READER_EVENTS.length - 1; i >= 0; i--) {
                var e = FILE_READER_EVENTS[i];
                isolateScope[e] = '&';
            }

            return {
                restrict: 'A',
                require: '?ngModel',
                scope: isolateScope,
                link: function (scope, elem, attrs, ngModel) {

                    if (!ngModel) {
                        return;
                    }

                    // need set falsy to activate required state when user predefines value for model
                    ngModel.$setViewValue(null);

                    var rawFiles = [];
                    var fileObjects = [];

                    function _attachHandlerForEvent(eventName, handler, fReader, file, fileObject) {
                        fReader[eventName] = function (e) {
                            handler()(e, fReader, file, rawFiles, fileObjects, fileObject);
                        };
                    }

                    function _readerOnLoad(fReader, file, fileObject) {

                        return function (e) {

                            var base64 = $window._arrayBufferToBase64(e.target.result);
                            fileObject.base64 = base64;
                            fileObjects.push(fileObject);

                            if (attrs.onload) {
                                scope.onload()(e, fReader, file, rawFiles, fileObjects, fileObject);
                            }

                            _setViewValue();

                        };

                    }

                    function _attachEventHandlers(fReader, file, fileObject) {

                        for (var i = FILE_READER_EVENTS.length - 1; i >= 0; i--) {
                            var e = FILE_READER_EVENTS[i];
                            if (attrs[e] && e !== 'onload') { // don't attach handler to onload yet
                                _attachHandlerForEvent(e, scope[e], fReader, file, fileObject);
                            }
                        }

                        fReader.onload = _readerOnLoad(fReader, file, fileObject);
                    }

                    function _setViewValue() {
                        scope.$apply(function () {
                            var newVal = attrs.multiple ? fileObjects : (fileObjects[0]);
                            ngModel.$setViewValue(angular.copy(newVal));
                        });
                    }

                    function _readFiles() {

                        for (var i = rawFiles.length - 1; i >= 0; i--) {

                            var reader = new $window.FileReader();
                            var file = rawFiles[i];
                            var fileObject = {};

                            fileObject.filetype = file.type;
                            fileObject.filename = file.name;
                            fileObject.filesize = file.size;

                            _attachEventHandlers(reader, file, fileObject);

                            reader.readAsArrayBuffer(file);
                        }

                    }

                    function _onChange(e) {
                        if (attrs.onChange) {
                            scope.onChange()(e, rawFiles);
                        }
                    }

                    elem.on('change', function (e) {

                        if (!e.target.files.length) {
                            return;
                        }

                        fileObjects = [];
                        rawFiles = e.target.files; // use event target so we can mock the files from test
                        _readFiles();

                        _onChange(e);

                    });

                    // VALIDATIONS =========================================================

                    function _required(val) {
                        var valid = val.length ? (val.length > 0) : (val ? true : false);
                        ngModel.$setValidity('required', valid);
                        return val;
                    }

                    function _maxnum(val) {
                        if (attrs.maxnum && attrs.multiple) {
                            var valid = val.length <= parseInt(attrs.maxnum);
                            ngModel.$setValidity('maxnum', valid);
                        }
                        return val;
                    }

                    function _minnum(val) {
                        if (attrs.minnum && attrs.multiple) {
                            var valid = val.length >= parseInt(attrs.minnum);
                            ngModel.$setValidity('minnum', valid);
                        }
                        return val;
                    }

                    function _maxsize(val) {
                        var valid = true;

                        if (attrs.maxsize) {
                            for (var i = 0; i < val.length; i++) {
                                var file = val[i];
                                if (file.filesize > parseFloat(attrs.maxsize) * 1000) {
                                    valid = false;
                                    break;
                                }
                            }
                            ngModel.$setValidity('maxsize', valid);
                        }

                        return val;
                    }

                    function _minsize(val) {
                        var valid = true;

                        if (attrs.minsize) {
                            for (var i = 0; i < val.length; i++) {
                                var file = val[i];
                                if (file.filesize < parseFloat(attrs.minsize) * 1000) {
                                    valid = false;
                                    break;
                                }
                            }
                            ngModel.$setValidity('minsize', valid);
                        }

                        return val;
                    }

                    ngModel.$parsers.push(_required);
                    ngModel.$parsers.push(_maxnum);
                    ngModel.$parsers.push(_minnum);
                    ngModel.$parsers.push(_maxsize);
                    ngModel.$parsers.push(_minsize);

                }
            };

        }]);

})(this);