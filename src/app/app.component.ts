import { Component, OnInit } from '@angular/core';
import { LayoutService } from './services/layout.service';
import { HeaderService } from './services/header.service';

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
	
	constructor(private layoutService: LayoutService, private headerService: HeaderService) {
	}

	ngOnInit() {
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
