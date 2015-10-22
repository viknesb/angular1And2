module ng1App {
  
  export class HomeCtrl {
    
    public static $inject = ['$state'];
    constructor(public $state: angular.ui.IStateService) {
    }
    
    gotoState(state: number) {
      switch(state) {
        case 1:
          this.$state.go('home.state1');
          break;
        case 2:
          this.$state.go('home.state2');
          break;
        default:
          this.$state.go('home');
      }
    }
  }
  
  export class HomeState2Ctrl {
		  
    public static $inject = ['$state'];
    constructor(public $state: angular.ui.IStateService) {
    }
		
    gotoState(state: number) {
      switch(state) {
        case 1:
          this.$state.go('home.state2.list');
          break;
        case 2:
          this.$state.go('home.state2.set');
          break;
        case 3:
          this.$state.go('home.state2.angular2');
          break;
        default:
          this.$state.go('home.state2.list');
      }
    }
  }
  
  export class HomeState2Angular2Ctrl {
    
    relativePath : String;
    
    public static $inject = ['$location'];
    constructor($location: angular.ILocationService) {
          
      this.relativePath = $location.url();
      var angular2App : any;
      if(angular2App = window.angular2App) {
        angular2App.init();
      } else {
        System.import('src/app/bootstrap');
      }
          
    }
  }
  
}