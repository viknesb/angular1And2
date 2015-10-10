var oldApp = angular.module('oldApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise(function($injector, $location){
        // Uncommenting these will get refresh on deepstates to work but will still has other problem
        // Will have to see if using ng-router in Angular 1 solves this problem
        //var $state = $injector.get('$state');
        //$state.transitionTo('home.state2.angular2');
    });

  $stateProvider
    .state('home', {
      url: "/home",
      template: "<div>" +
      "<a class='link' ng-click='gotoState();'><h1>Angular 1 App </h1></a><br>" + 
      "<a class='link' href='' ng-click='gotoState(1);'>State 1</a><a class='link' href='' ng-click='gotoState(2);'>State 2</a><br><div ui-view></div></div>",
      controller: function($scope, $state) {
        $scope.gotoState = function(state) {
          switch(state) {
            case 1:
              $state.go('home.state1');
              break;
            case 2:
              $state.go('home.state2');
              break;
            default:
              $state.go('home');
          }
        }
      }
    })
    .state('home.state1', {
      url: "/state1",
      template: "<h2> This is state1 page</h2>",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('home.state2', {
      url: "/state2",
      template: "<div>" +
                  "<h2> This is state2 page</h2>" +
                  "<div>" + 
                    "<a class='link' href='' ng-click='gotoState(1);'>List</a>" + 
                    "<a class='link' href='' ng-click='gotoState(2);'>Set</a>" + 
                    "<a class='link' href='' ng-click='gotoState(3);'>Angular 2</a>" +
                  "</div><br>" +
                  "<div ui-view></div>" +
                "</div>",
      controller: function($scope, $state) {
        $scope.gotoState = function(state) {
          switch(state) {
            case 1:
              $state.go('home.state2.list');
              break;
            case 2:
              $state.go('home.state2.set');
              break;
            case 3:
              $state.go('home.state2.angular2');
              break;
            default:
              $state.go('home.state2.list');
          }
        }
      }
    })
    .state('home.state2.list', {
      url: "/list",
      template: "<div ng-repeat='thing in things'> {{thing}} </div>",
      controller: function($scope) {
        $scope.things = ["A", "List", "Of", "Items"];
      }
    })
    .state('home.state2.set', {
      url: "/set",
      template: "<div ng-repeat='thing in things'> {{thing}} </div>",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    })
    .state('home.state2.angular2', {
      url: "/angular2",
      template: "<div>" +
                  "<my-app path='{{relativePath}}'>Loading...</my-app>" +
                "</div>",
      controller: function($scope, $state, $location) {
        
        $scope.relativePath = $location.url();
        var angular2App;
        if(angular2App = window.angular2App) {
          angular2App.init();
        } else {
          System.import('app/bootstrap');
        }
        
      }
    });
});