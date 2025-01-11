import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutService } from './services/layout.service';
import { HeaderService } from './services/header.service';
import { StyleUpdateService } from './services/style-update.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: false,
	styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
	title = 'angular_app';
	layoutClasses = {};
	headerContent: string = 'Default Header';
	
	constructor(private router: Router, 
		    private layoutService: LayoutService, 
		    private headerService: HeaderService, 
		    private styleUpdateService: StyleUpdateService) {
	}

	ngOnInit() {
		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
			this.headerService.setHeaderContent('Default Header');
			this.styleUpdateService.setCustomProperty('--hpanel-height', '50px');

		});

		this.layoutService.layoutState$.subscribe((state) => {
			this.layoutClasses = { 
				hasRpanel: state.hasRpanel, 
				hasLpanel: state.hasLpanel, 
				hasHeader: state.hasHeader, 
				hasFooter: state.hasFooter
			};
		});

		this.headerService.headerContent$.subscribe(content => {
			this.headerContent = content;
		});
	}
}
