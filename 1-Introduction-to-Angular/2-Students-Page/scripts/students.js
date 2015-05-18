'use strict';

var app = angular.module('studentsPage', []);

var student = {
    "name": "Pesho",
    "photo": "http://www.nakov.com/wp-content/uploads/2014/05/SoftUni-Logo.png",
    "grade": 5,
    "school": "High School of Mathematics",
    "teacher": "Gichka Pesheva"
};

app.controller('studentsController', function ($scope) {
    $scope.name = student.name;
    $scope.photo = student.photo;
    $scope.grade = student.grade;
    $scope.school = student.school;
    $scope.teacher = student.teacher;
});