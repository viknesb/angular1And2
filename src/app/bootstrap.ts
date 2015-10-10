import {bind, bootstrap} from 'angular2/angular2';
import {routerBindings, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {CharacterService} from './character.service';
import {AppComponent} from './app.component';

interface Window {
	angular2App: any;
}

window.angular2App = {
		init : function() {
			bootstrap(AppComponent, [
				routerBindings(AppComponent),
				CharacterService,
				bind(LocationStrategy).toClass(HashLocationStrategy)
			]);
		}
	};
	
window.angular2App.init();
