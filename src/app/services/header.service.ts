import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable ({
	providedIn: 'root'
})

export class HeaderService {
	private headerContent = new BehaviorSubject<string>('');
	headerContent$ = this.headerContent.asObservable();
	setHeaderContent(content: string) {
		this.headerContent.next(content);
	}
}
