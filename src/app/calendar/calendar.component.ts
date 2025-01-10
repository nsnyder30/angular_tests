import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, style, animate, query, group } from '@angular/animations';
import { LayoutService } from '../services/layout.service';
import { HeaderService } from '../services/header.service';

@Component({
	selector: 'app-calendar',
	standalone: false,
	templateUrl: './calendar.component.html',
	styleUrl: './calendar.component.scss', 
	animations:  []
})

export class CalendarComponent implements OnInit {
	constructor(private layoutService: LayoutService, private headerService: HeaderService) {}

	ngOnInit() {
		this.layoutService.updateLayoutState({
			hasLpanel: true, 
			hasRpanel: false, 
			hasHeader: true, 
			hasFooter: false
		});

		this.headerService.setHeaderContent('Calendar Header');
	}

	view = 'Monthly';
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

	setDate(dt: Date) {
		this.selectedDate = dt;
		this.weekStart = dt.getTime() - dt.getDay() * 24 * 3600 * 1000;
		this.weekEnd = this.weekStart + 6 * 24 * 3600 * 1000;
	}

	transition(dir: string) {
		const coeff = dir == 'next' ? 1 : -1;
		let dt = new Date(this.selectedDate);
		switch(this.view) {
			case 'Yearly':
				dt.setFullYear(dt.getFullYear() + coeff);
				break;
			case 'Monthly':
				dt.setDate(1);
				dt.setMonth(dt.getMonth() + coeff);
				break;
			case 'Weekly':
				dt.setDate(dt.getDate() + 7 * coeff);
				break;
			case 'Daily':
				dt.setDate(dt.getDate() + coeff);
				break;

		}
		this.setDate(dt);
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
			this.setDate(this.idx_to_date(day));
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
			this.setDate(new Date(this.selectedDate.getFullYear(), this.selectedMonth, 1));
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
