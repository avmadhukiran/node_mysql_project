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



    var foo;

    function getCategory() {
        foo = getParameterByName('event');
        var cat = foo.charAt(0);
        while (foo.charAt(0) === 'J' || foo.charAt(0) === 'S')
            foo = foo.substr(1);

        if (cat === 'J') {
            cat = "Junior";
        } else if (cat === 'S') {
            cat = "Senior";
        }
        return cat;
    }

    var categorys = getCategory();
    console.log(categorys);
    var eventname = "contact." + foo;
    var events = foo;
    $scope.events = foo;
    $scope.cats=categorys;
$scope.searcha="ARHN";
    var refresh = function() {
        $http.get('/contactlist/' + events).success(function(response) {
            $scope.contactlist = response;
            $scope.contact = "";
            $scope.count=response.length;
            console.log($scope.count);

        });


    };

    var refresha = function() {
        $http.get('/contactlist/' + events).success(function(response) {
            $scope.contactlist = response;
            $scope.contact = "";
            added();
            $scope.count=response.length;
            console.log($scope.count);
        });
    };

    var refresha = function() {
        $http.get('/contactlist/' + events).success(function(response) {
            $scope.contactlist = response;
            $scope.contact = "";
            added();
            $scope.count=response.length;
        	console.log($scope.count);
        });
    };
    var refreshb = function() {
        $http.get('/contactlist/' + events).success(function(response) {
            $scope.contactlist = response;
            $scope.contact = "";
            delmes();
            $scope.count=response.length;
            console.log($scope.count);
        });
    };


    $scope.search = function(name) {};

    refresh();

    $scope.addContact = function() {

        var model = $parse(eventname);
        model.assign($scope, true);


        $http.get('/aarohanregistrationpage/' + $scope.contact.aarohanid).success(function(response) {
            if (response.length != 0) {
                for (var key in response) {
                    $scope.contact.names = response[key].names;
                    $scope.contact.school = response[key].school;
                    $scope.contact.category = response[key].category;
                    $scope.contact.aarohanid = response[key].aarohanid;
                }

                $http.get('/contactlist/ev/' + $scope.contact.aarohanid).success(function(response) {
                  console.log(response);
                    if (response.length == 0) {

                        if ($scope.contact.category === categorys) {
                            $http.post('/contactlist', $scope.contact).success(function(response) {
                                refresha();
                            });
                        }

                        else {
                            console.log("Student Doest Belong to this Category");
                              belong();
                        }
                    }
                    else if (response.length == 1) {


                        if (!response[key][events]) {
                            if ($scope.contact.category === categorys) {
                                $http.put('/contactlist/'+events, $scope.contact).success(function(response) {
                                    refresha();
                                });
                            } else {
                                console.log("Student Doest Belong to this Category");
                                  belong();
                            }

                        }
                        else {
                            console.log("Entry Already Exists here");
                            already();
                        }

                    } else {
                        console.log("Entry Already Exists");
                        already();
                    }
                });
            } else {
                console.log("Error No Such Aarohan ID");
                nosuch();

            }
        });
    }



    $scope.remove = function(id) {
        $http.put('/contactlist/del/'+events, id).success(function(response) {
          console.log(response);
            refreshb();
        });
    };





}]);﻿
