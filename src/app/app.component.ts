import {View, Component} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, Router, Route} from 'angular2/router';
import {CharactersComponent} from './characters.component';
import {DashboardComponent} from './dashboard.component';

@Component({
  selector: 'my-app'
})
@View({
  template: `
    <div style="padding: 19px; background-color: #f5f5f5;">
      Angular 1 App path is {{path}}<br>
      <a [router-link]="['./Dashboard']">Dashboard</a>
      <a [router-link]="['./Characters']">Characters</a>
      <router-outlet></router-outlet>
    </div>
    `,
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
  // This should be passed in as an attribute to this component from Angular 1 App
  path = "/home/state2/angular2";
  constructor(router: Router) {
    var route1 = new Route({path: this.path + '/', component: DashboardComponent, as: 'Dashboard'});
    var route2 = new Route({path: this.path + '/characters', component: CharactersComponent, as: 'Characters'});
    router.config([route1, route2]);
    
    //router.navigate(['./Characters']); 
  }
 }
