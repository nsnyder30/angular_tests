import { Component } from '@angular/core';
import { trigger, transition, state, style, animate, query, group } from '@angular/animations';

@Component({
	selector: 'app-test',
	standalone: false,
	templateUrl: './test.component.html',
	styleUrl: './test.component.css', 
	animations: [
		trigger('monthTransition', [
			state('collapsed', style({ transform: 'scale(1)' })), 
			state('expanded', style({ transform: 'scale(2)' })), 
			transition('collapsed => expanded', animate('500ms ease-in')), 
			transition('expanded => collapsed', animate('500ms ease-out'))
		]), 
		trigger('testTransition', [
			state('s1', style({ backgroundColor: '#F00' , color: '#FFF', transform: 'scale(1)'})), 
			state('s2', style({ backgroundColor: '#FF0' , color: '#000', transform: 'scale(2)'})), 
			transition('s1 => s2', animate('500ms ease-in')), 
			transition('s2 => s1', animate('500ms ease-out'))
		]), 
		trigger('viewTransition', [
			state('Yearly', style({ backgroundColor: '#9F9'})), 
			state('Monthly', style({ backgroundColor: '#99F'})), 
			transition('Yearly => Monthly', animate('500ms ease-in')), 
			transition('Monthly => Yearly', animate('500ms ease-out'))
		])
	]	
})

export class TestComponent {
	title = 'Test Title';
	testVar = 's1';
	view = 'Yearly';
	selectedMonth = -1;
	
	toggleTest() {
		this.testVar = this.testVar == 's1' ? 's2' : 's1';
	}

	toggleView(view: string) {
		this.view = view;
	}

	selectMonth(month: number) {
		if(this.selectedMonth == month) {
			this.selectedMonth = -1;
			this.toggleView('Yearly');
		} else {
			this.selectedMonth = month;
			this.toggleView('Monthly');
		}
	}
}
