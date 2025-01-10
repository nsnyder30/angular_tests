import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LayoutService {
	private layoutState = new BehaviorSubject({
		hasRpanel: false, 
		hasLpanel: false, 
		hasHeader: false,
		hasFooter: false
	});

	layoutState$ = this.layoutState.asObservable();

	updateLayoutState(state: Partial<{ hasRpanel: boolean, hasLpanel: boolean, hasHeader: boolean, hasFooter: boolean }>) {
		this.layoutState.next({ ...this.layoutState.getValue(), ...state });
	}
}
