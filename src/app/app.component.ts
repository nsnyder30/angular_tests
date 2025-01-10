import { Component } from '@angular/core';
import { LayoutService } from './services/layout.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: false,
	styleUrl: './app.component.scss'
})

export class AppComponent {
	itle = 'angular_app';
	layoutClasses = {};
	
	constructor(private layoutService: LayoutService) {
		this.layoutService.layoutState$.subscribe((state) => {
			this.layoutClasses = { 
				hasRpanel: state.hasRpanel, 
				hasLpanel: state.hasLpanel, 
				hasHeader: state.hasHeader, 
				hasFooter: state.hasFooter
			  };
		  });
	  }
}
