import { Component } from '@angular/core';
import { trigger, transition, state, style, animate, query, group } from '@angular/animations';

@Component({
	selector: 'app-test',
	standalone: false,
	templateUrl: './test.component.html',
	styleUrl: './test.component.scss', 
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
	selectedDate = new Date();
	selectedMonth = -1;
	selectedDay = -1;
	calendarTitle = this.selectedDate.getFullYear().toString();

	months = Array.from({ length: 12 }).map((v, i) => i);
	month_list = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	weeks = Array.from({ length: 5 }).map((v, i) => i);
	days = Array.from({ length: 35 }).map((v, i) => i);
	
	getMonthName(month: number, short?: boolean) {
		if(short) {
			return this.month_list[month].substr(0, 3);
		}

		return this.month_list[month];
	}

	toggleTest() {
		this.testVar = this.testVar == 's1' ? 's2' : 's1';
	}

	updateTitle() {
		switch(this.view) {
			case 'Yearly':
				this.calendarTitle = (this.selectedDate.getFullYear()).toString();
				break;
			case 'Monthly':
				this.calendarTitle = this.getMonthName(this.selectedDate.getMonth());
				break;
			case 'Weekly':
				let week_start = this.selectedDate;
				let week_end = this.selectedDate;
				week_start.setDate(week_start.getDate() - week_start.getDay());
				week_end.setDate(week_end.getDate() + 6 - week_end.getDay());
				this.calendarTitle = [
							[(week_start.getMonth() + 1).toString(), week_start.getDate().toString()].join('/'), 
							[(week_end.getMonth() + 1).toString(), week_end.getDate().toString()].join('/')
				].join(' - ');
				break;
			case 'Daily':
				this.calendarTitle = [(this.selectedDate.getMonth() + 1).toString(), this.selectedDate.getDate().toString()].join('/');
				break;
		}
	}

	toggleView(view: string) {
		this.view = view;
		this.updateTitle();
	}

	selectDay(day: number) {
console.log({msg: 'select Day fired'});
	}

	selectMonth(month: number) {
console.log({msg: 'select Month fired'});
		if(this.selectedMonth == month) {
			this.selectedMonth = -1;
			this.toggleView('Yearly');
		} else {
			this.selectedMonth = month;
			this.toggleView('Monthly');
		}
	}

	showDays() {
		this.view == 'Monthly' || this.view == 'Weekly' || this.view == 'Daily';
	}
}
