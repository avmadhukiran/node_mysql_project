var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', '$parse', function($scope, $http, $parse) {


    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    var foo=getParameterByName('username');

    
    var categorys = getCategory();
    console.log(categorys);
    var eventname = "contact." + foo;
    var events = foo;
    $scope.events = foo;

        $http.get('/petsofowner/' + events).success(function(response) {
            $scope.contactlist = response;
            $scope.contact = "";
            $scope.count=response.length;
            console.log($scope.count);

        });

    $scope.remove = function(id) {
        $http.put('/contactlist/del/'+events, id).success(function(response) {
          console.log(response);
      });
    };





}]);﻿
