module ng1App {
  // Used only in prod build for injecting templates as JS
  
  angular.module('oldApp', ['ui.router', 'templates'])
  .config(configFn);
    
  configFn.$inject = ['$stateProvider', '$urlRouterProvider'];
  export function configFn($stateProvider : angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {

  $urlRouterProvider.otherwise('/home');
  // Uncommenting these will get refresh on deepstates to work but will still has other problem
  // Will have to see if using ng-router in Angular 1 solves this problem
  /*$urlRouterProvider.otherwise(function($injector: angular.auto.IInjectorService, $location: angular.ILocationService){
        var $state = $injector.get('$state');
        $state.transitionTo('home.state2.angular2');
  });*/

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: 'app/home.html',
      controllerAs: 'HomeCtrl',
      controller: HomeCtrl
    })
    .state('home.state1', {
      url: "/state1",
      templateUrl: "app/state1/state1.html",
      controllerAs: 'HomeState1Ctrl',
      controller: function() {
        this.msg = "This is State 1 Page";
      }
    })
    .state('home.state2', {
      url: "/state2",
      templateUrl: 'app/state2/state2.html', 
      controllerAs: 'HomeState2Ctrl',
      controller: HomeState2Ctrl
    })
    .state('home.state2.list', {
      url: "/list",
      template: "<div ng-repeat='thing in HomeState2ListCtrl.things'> {{thing}} </div>",
      controllerAs: 'HomeState2ListCtrl',
      controller: function() {
        this.things = ["A", "List", "Of", "Items"];
      }
    })
    .state('home.state2.set', {
      url: "/set",
      template: "<div ng-repeat='thing in HomeState2SetCtrl.things'> {{thing}} </div>",
      controllerAs: 'HomeState2SetCtrl',
      controller: function() {
        this.things = ["A", "Set", "Of", "Things"];
      }
    })
    .state('home.state2.angular2', {
      url: "/angular2",
      templateUrl: 'app/state2/angular2/ag2.html',
      controllerAs: 'HomeState2Angular2Ctrl',
      controller: HomeState2Angular2Ctrl
    });
  }
}