import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable ({
	providedIn: 'root'
})

export class HeaderService {
	private headerTemplate = new BehaviorSubject<TemplateRef<any> | null>(null);
	headerTemplate$ = this.headerTemplate.asObservable();

	setHeaderTemplate(template: TemplateRef<any>) {
		this.headerTemplate.next(template);
	}
}
