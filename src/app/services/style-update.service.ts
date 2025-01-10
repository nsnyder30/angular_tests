import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
	providedIn: 'root'
})

export class StyleUpdateService {
	constructor(@Inject(DOCUMENT) private document: Document ) {}

	setCustomProperty(property: string, value: string) {
		this.document.documentElement.style.setProperty(property, value);
	}
}
