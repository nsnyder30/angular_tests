import { Component } from '@angular/core';
import { trigger, transition, state, style, animate, query, group } from '@angular/animations';

type CalendarView = 'Yearly' | 'Monthly' | 'Weekly' | 'Daily';

@Component({
	selector: 'app-calendar',
	standalone: false,
	templateUrl: './calendar.component.html',
	styleUrl: './calendar.component.scss', 
	animations: [
		trigger('testTransition', [
			state('s1', style({ backgroundColor: '#F00' })), 
			state('s2', style({ backgroundColor: '#00F' })), 
			transition('s1 => s2', animate('500ms ease-in')), 
			transition('s2 => s1', animate('500ms ease-out'))
		]), 
		trigger('viewTransition', [
	  		transition('Yearly2Monthly', [
				query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }), 
				group([
					query(':leave', [
						style({ transform: 'scale(1)', opacity: 1 }), 
						animate('500ms ease-in', style({ transform: 'scale(2)', opacity: 0}))
					], { optional: true}), 
					query(':enter', [
						style({ transform: 'scale(0.5)', opacity: 0 }), 
						animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1}))
					], {optional: true })
				])
			]), 
			transition('Monthly2Yearly', [
				query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }), 
				group([
					query(':leave', [
						style({ transform: 'scale(1)', opacity: 1 }), 
						animate('500ms ease-in', style({ transform: 'scale(0.5)', opacity: 0}))
					], { optional: true }), 
					query(':enter', [
						style({ transform: 'scale(2)', opacity: 0 }), 
						animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
					], { optional: true })
				])
			])
		])
	]
})

export class CalendarComponent {
	month_list = ['January','February','Match','April','May','June','July','August','September','October','November','December'] as const;
	view: CalendarView = 'Yearly';
	selectedDate: Date = new Date();
	testVar = 's1';

	toggleTest() {
		this.testVar = this.testVar == 's1' ? 's2' : 's1'
	}

	switchView(view: CalendarView): void { 
console.log({msg: 'switchView called', view: view});
		this.view = view;
	}

	selectMonth(month: number) {
		this.selectedDate.setMonth(month);
		this.switchView('Monthly');
	}

	navigate(direction: 'previous' | 'next'): void {
console.log({msg: 'navigate called', direction: direction });
		const date = new Date(this.selectedDate);
		const sgn = direction === 'next' ? 1 : -1;
		if (this.view === 'Yearly') {
			date.setFullYear(date.getFullYear() + sgn);
		} else if (this.view === 'Monthly') {
			date.setMonth(date.getMonth() + sgn);
		} else if (this.view === 'Weekly') {
			date.setDate(date.getDate() + sgn * 7);
		} else if (this.view === 'Daily') {
			date.setDate(date.getDate() + sgn);
		}

		this.selectedDate = date;
	}

	getMonthName(mnth: number) {
		mnth = mnth < 0 || mnth > 11 ? 0 : mnth;
		return this.month_list[mnth];
	}

	getWeeks() {
		let curDate = new Date(this.selectedDate);
		curDate.setDate(1);
		curDate.setDate(curDate.getDate() - curDate.getDay());

		let endDate = new Date(this.selectedDate);
		endDate.setDate(1);
		endDate.setMonth(endDate.getMonth() + 1);
		endDate.setDate(endDate.getDate() - 1);
		endDate.setDate(endDate.getDate() + 6 - endDate.getDay());

		const numWeeks = Math.ceil((endDate.getTime() - curDate.getTime()) / (7 * 24 * 3600 * 1000));
		const weeks = Array.from({ length: numWeeks }, () => Array(7).fill(null));
		for(let week = 0; week < numWeeks; week++) {
			for(let day = 0; day < 7; day++) {
				weeks[week][day] = curDate.getDate();
				curDate.setDate(curDate.getDate() + 1);
			}
		}

		return weeks;
	}
}
