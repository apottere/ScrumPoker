angular.module("app", ['ngAnimate'])
    .run(function() {
        FastClick.attach(document.body);

        //create a new instance of shake.js.
        var myShakeEvent = new Shake({
            threshold: 10 // optional shake strength threshold
        });
        myShakeEvent && myShakeEvent.start();
    })
    .controller("PokerController", function($scope) {

        $scope.numbers = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
        $scope.staged = false;
        $scope.revealed = false;
        $scope.selected = null;

        $scope.hasStandalone = typeof navigator.standalone === 'boolean';
        $scope.standalone = navigator.standalone === true;

        $scope.hasVibrate = 'vibrate' in navigator;

        $scope.onInit = function() {
            window.addEventListener('shake', function() {
                $scope.$apply(function() {
                    if($scope.staged && !$scope.revealed) {
                        $scope.revealClicked();
                        if($scope.hasVibrate) {
                            navigator.vibrate(100);
                        }
                    }
                });
            }, false);
        };

        $scope.clickNumber = function(number) {
            $scope.staged = true;
            $scope.selected = number;
        };

        $scope.revealClicked = function() {
            $scope.staged = false;
            $scope.revealed = true;
        };

        $scope.clearClicked = function() {
            $scope.revealed = false;
        };

        $scope.backgroundClick = function() {
            if($scope.staged && !$scope.revealed) {
                $scope.revealClicked();

            } else if($scope.revealed && !$scope.staged) {
                $scope.clearClicked();
            }
        };

        $scope.noPropogate = function($event) {
            $event.stopPropagation();
        };
    }
);