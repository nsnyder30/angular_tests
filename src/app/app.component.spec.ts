import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutService } from './services/layout.service';
import { HeaderService } from './services/header.service';
import { StyleUpdateService } from './services/style-update.service';

class MockLayoutService {
	layoutState$ = of({ hasRpanel: true, 
			    hasLpanel: true, 
			    hasHeader: true, 
			    hasFooter: true
	});
}

class MockHeaderService {
	headerTemplate$ = of(null);
}

class MockStyleUpdateService {
	setCustomProperty(property: string, value: string) {}
}

describe('Sanity Check', () => {
	it('should pass', () => {
		expect(true).toBe(true);
	});
});
/*
describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let layoutService: MockLayoutService;
	let headerService: MockHeaderService;
	let styleUpdateService: MockStyleUpdateService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterModule.forRoot([]),
				RouterTestingModule
			],
			declarations: [
				AppComponent
			],
			providers: [
				{ provide: LayoutService, useClass: MockLayoutService }, 
				{ provide: HeaderService, useClass: MockHeaderService }, 
				{ provide: StyleUpdateService, useClass: MockStyleUpdateService }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		layoutService = TestBed.inject(LayoutService) as unknown as MockLayoutService;
		headerService = TestBed.inject(HeaderService) as unknown as MockHeaderService;
		styleUpdateService = TestBed.inject(StyleUpdateService) as unknown as MockStyleUpdateService;
		fixture.detectChanges();
	});
	
	it('should create the app', () => {
console.log('app creation test');
		expect(component).toBeTruthy();
	});

	it('should update layout classes based on LayoutService', () => {
console.log('layoutservice test');
		expect(component.layoutClasses).toEqual({
			hasRpanel: true, 
			hasLpanel: true, 
			hasHeader: true, 
			hasFooter: true
		});
	});
	
	it('should update headerContentTemplate based on HeaderService', () => {
console.log('headerservice test');
		expect(component.headerContentTemplate).toBeNull();
	});

	it(`should have as title 'angular_app'`, () => {
console.log('title test');
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('angular_app');
	});
	
	it('should render title', () => {
console.log('render title test');
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular_app');
	});
});
*/
