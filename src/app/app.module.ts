import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ProjectGridComponent } from './project-grid/project-grid.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DatePipe } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'test', component: TestComponent}, 
	{path: 'create-account', component: CreateAccountComponent}, 
	{path: 'home', component: ProjectGridComponent}, 
	{path: 'calendar', component: CalendarComponent}
]

@NgModule({
	declarations: [
  		CreateAccountComponent,
		AppComponent, 
		LoginComponent, 
		TestComponent,
		ProjectGridComponent,
		CalendarComponent,
	], 
	imports: [
		BrowserModule, 
		BrowserAnimationsModule,
		FormsModule, 
		ReactiveFormsModule, 
		MatDialogModule, 
		MatFormFieldModule, 
		MatInputModule, 
		MatButtonModule, 
		HttpClientModule, 
		RouterOutlet, 
		RouterModule.forRoot(routes), 
	], 
	exports: [
		RouterModule,
		RouterOutlet
	], 
	providers: [DatePipe, provideAnimationsAsync()], 
	bootstrap: [AppComponent]
})

export class AppModule { }
