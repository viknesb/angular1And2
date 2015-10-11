var ng1App;
(function (ng1App) {
    angular.module('oldApp', ['ui.router'])
        .config(configFn);
    configFn.$inject = ['$stateProvider', '$urlRouterProvider'];
    function configFn($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(function ($injector, $location) {
            // Uncommenting these will get refresh on deepstates to work but will still has other problem
            // Will have to see if using ng-router in Angular 1 solves this problem
            //var $state = $injector.get('$state');
            //$state.transitionTo('home.state2.angular2');
        });
        $stateProvider
            .state('home', {
            url: "/home",
            template: "<div>" +
                "<a class='link' ng-click='HomeCtrl.gotoState();'><h1>Angular 1 App </h1></a><br>" +
                "<a class='link' href='' ng-click='HomeCtrl.gotoState(1);'>State 1</a><a class='link' href='' ng-click='HomeCtrl.gotoState(2);'>State 2</a><br><div ui-view></div></div>",
            controllerAs: 'HomeCtrl',
            controller: ng1App.HomeCtrl
        })
            .state('home.state1', {
            url: "/state1",
            template: "<h2> {{HomeState1Ctrl.msg}} </h2>",
            controllerAs: 'HomeState1Ctrl',
            controller: function () {
                this.msg = "This is State 1 Page";
            }
        })
            .state('home.state2', {
            url: "/state2",
            template: "<div>" +
                "<h2> This is state2 page</h2>" +
                "<div>" +
                "<a class='link' href='' ng-click='HomeState2Ctrl.gotoState(1);'>List</a>" +
                "<a class='link' href='' ng-click='HomeState2Ctrl.gotoState(2);'>Set</a>" +
                "<a class='link' href='' ng-click='HomeState2Ctrl.gotoState(3);'>Angular 2</a>" +
                "</div><br>" +
                "<div ui-view></div>" +
                "</div>",
            controllerAs: 'HomeState2Ctrl',
            controller: ng1App.HomeState2Ctrl
        })
            .state('home.state2.list', {
            url: "/list",
            template: "<div ng-repeat='thing in HomeState2ListCtrl.things'> {{thing}} </div>",
            controllerAs: 'HomeState2ListCtrl',
            controller: function () {
                this.things = ["A", "List", "Of", "Items"];
            }
        })
            .state('home.state2.set', {
            url: "/set",
            template: "<div ng-repeat='thing in HomeState2SetCtrl.things'> {{thing}} </div>",
            controllerAs: 'HomeState2SetCtrl',
            controller: function () {
                this.things = ["A", "Set", "Of", "Things"];
            }
        })
            .state('home.state2.angular2', {
            url: "/angular2",
            template: "<div>" +
                "<my-app path='{{HomeState2Angular2Ctrl.relativePath}}'>Loading...</my-app>" +
                "</div>",
            controllerAs: 'HomeState2Angular2Ctrl',
            controller: ng1App.HomeState2Angular2Ctrl
        });
    }
    ng1App.configFn = configFn;
})(ng1App || (ng1App = {}));
//# sourceMappingURL=app.js.map