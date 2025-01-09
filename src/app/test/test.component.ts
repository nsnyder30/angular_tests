import { Component } from '@angular/core';
import { trigger, transition, state, style, animate, query, group } from '@angular/animations';

@Component({
	selector: 'app-test',
	standalone: false,
	templateUrl: './test.component.html',
	styleUrl: './test.component.scss', 
	animations: [
		trigger('monthTransition', [
			state('selected', style({ width: '100%', height: '100%' })), 
			state('unselected', style({ opacity: 0 })), 
			transition('selected => unselected', animate('500ms ease-in')), 
			transition('unselected => selected', animate('500ms ease-out'))
		]), 
/*
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
*/
	]	
})

export class TestComponent {
	title = 'Test Title';
	testVar = 's1';
	view = 'Yearly';
	selectedDate = new Date();
	selectedMonth = -1;
	weekStart = this.selectedDate.getTime() - this.selectedDate.getDay() * 24 * 3600 * 1000;
	weekEnd = this.weekStart + 6 * 24 * 3600 * 1000;
	calendarTitle = this.selectedDate.getFullYear().toString();

	months = Array.from({ length: 12 }).map((v, i) => i);
	month_list = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	weeks = Array.from({ length: 5 }).map((v, i) => i);
	days = Array.from({ length: 35 }).map((v, i) => i);
	
	getMonthName(month: number, short?: boolean) {
		return short ? this.month_list[month].substr(0, 3) : this.month_list[month];
	}

	getDayText(day: number) {
		let dt = this.idx_to_date(day);
		return dt.getDate();
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
				this.calendarTitle = [this.getMonthName(this.selectedDate.getMonth()), this.selectedDate.getFullYear().toString()].join(' ');
				break;
			case 'Weekly':
				let week_start = new Date(this.selectedDate);
				let week_end = new Date(this.selectedDate);
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

	transition(dir: string) {
		const coeff = dir == 'next' ? 1 : -1;
		switch(this.view) {
			case 'Yearly':
				this.selectedDate.setFullYear(this.selectedDate.getFullYear() + coeff);
				break;
			case 'Monthly':
				this.selectedDate.setDate(1);
				this.selectedDate.setMonth(this.selectedDate.getMonth() + coeff);
				break;
			case 'Weekly':
				this.selectedDate.setDate(this.selectedDate.getDate() + 7 * coeff);
				break;
			case 'Daily':
				this.selectedDate.setDate(this.selectedDate.getDate() + coeff);
				break;

		}
		this.updateTitle();
	}

	titleClick() {
		switch(this.view) {
			case 'Monthly': this.toggleView('Yearly'); break;
			case 'Weekly': this.toggleView('Monthly');break;
			case 'Daily': this.toggleView('Weekly');break;
		}
	}
	
	idx_to_date(idx: number) {
		let dt = new Date(this.selectedDate);
		dt.setDate(1);
		dt.setDate(dt.getDate() + idx - dt.getDay());
		return dt;
	}

	selectDay(day: number) {
		if(this.view == 'Monthly' || this.view == 'Weekly' || this.view == 'Daily') {
			this.selectedDate = this.idx_to_date(day);
			this.weekStart = this.selectedDate.getTime() - this.selectedDate.getDay() * 24 * 3600 * 1000;
			this.weekEnd = this.weekStart + 6 * 24 * 3600 * 1000;
			const newView = this.view == 'Weekly' ? 'Daily' : 'Weekly';
			this.toggleView(newView);
		}
	}

	selectMonth(month: number) {
		if(this.selectedMonth == month && this.view == 'Monthly') {
			this.selectedMonth = -1;
			this.toggleView('Yearly');
		} else {
			this.selectedMonth = month;
			this.selectedDate.setDate(1);
			this.selectedDate.setMonth(month);
			this.toggleView('Monthly');
		}
	}
	
	selection(target: string, view: string, idx: number) {
		if(view != this.view) {
			return false;
		}

		switch(target) {
			case 'month':
				return this.selectedMonth === idx;
				break;
			case 'day':
				let dt = this.idx_to_date(idx).getTime();
				return view == 'Weekly' ? dt >= this.weekStart && dt <= this.weekEnd : dt == this.selectedDate.getTime();
				break;
		}

		return false;
	}

	hide(target: string, idx: number) {
		switch(target) {
			case 'month':
				return !(this.view == 'Monthly' && this.selectedMonth === idx || this.view == 'Yearly');
				break;
			case 'day':
				let dt = this.idx_to_date(idx).getTime();
				return !(this.view == 'Monthly' || this.view == 'Weekly' && dt >= this.weekStart && dt <= this.weekEnd || this.view == 'Daily' && dt == this.selectedDate.getTime());
				break;
		}

		return false;
	}
}
