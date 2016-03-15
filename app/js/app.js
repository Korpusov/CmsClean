'use strict';

/* App Module */
var app = angular.module('app', ["firebase", "ngRoute"]);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) { 
    $routeProvider
        .when("/", {
            templateUrl: "table.html",
            controller: "Table"
        })
        .when("/chats", {
            templateUrl: "chats.html",
            controller: "ChatsCtrl"
        })
        .when("/calendar", {
            templateUrl: "calendar.html",
            controller: "calendar"
        })
        .when("/mailbox", {
            templateUrl: "mailbox.html",
            controller: "mailbox"
        })
        .when("/login", {
            templateUrl: "login.html",
            controller: "login"
        })
        .when("/register", {
            templateUrl: "register.html",
            controller: "register"
        })
        .otherwise({
            redirectTo: "/"
        })
}])