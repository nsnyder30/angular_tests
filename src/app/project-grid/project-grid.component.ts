import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { DatePipe } from '@angular/common';
import { LayoutService } from '../services/layout.service';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-project-grid',
  standalone: false,
  
  templateUrl: './project-grid.component.html',
  styleUrl: './project-grid.component.scss'
})

export class ProjectGridComponent implements OnInit {
	@ViewChild('projectGridHeader', { static: true }) projectGridHeader!: TemplateRef<any>;
	@ViewChild('taskDialog', { static: true }) 
	taskDialog!: TemplateRef<any>;
	taskCreationForm!: FormGroup;
	dialogRef!: MatDialogRef<any>;

	projects: any[] = [];
	
	constructor(private layoutService: LayoutService, 
		    private taskService: TaskService, 
		    private headerService: HeaderService, 
		    private datePipe: DatePipe, 
		    private dialog: MatDialog, 
		    private fb: FormBuilder) {}

	ngOnInit(): void {
		const userId = 1;

		this.taskService.getTasks(userId).subscribe((data) => {
			this.projects = data;
		});

		this.layoutService.updateLayoutState({
			hasLpanel: true, 
			hasRpanel: false, 
			hasHeader: true, 
			hasFooter: false
		})

		this.headerService.setHeaderTemplate(this.projectGridHeader);

		this.taskCreationForm = this.fb.group({
			task_name: ['', [Validators.required, Validators.minLength(3)]]
		});
	}

	openTaskDialog(): void {
		this.dialogRef = this.dialog.open(this.taskDialog, { width: '400px' });
	}

	closeDialog(): void {
		if (this.dialogRef) {
			this.dialogRef.close();
		}
	}

	submitTask(): void {
		if(this.taskCreationForm.valid) {
			const taskData = {
				task_name: this.taskCreationForm.value.task_name, 
				task_owner: 1, 
				task_parent: -1
			};
			this.taskService
				.createTask(taskData)
				.subscribe((data) => {
					this.projects.push(data);
					this.closeDialog();
					this.taskCreationForm.reset();
				});
		} else {
		}
	}

	createProject(): void {
		this.openTaskDialog();
	}

	toggleTask(task: any): void {
		if(task.active) {
			this.taskService.deactivateTask(task.tsk_id).subscribe(() => {
				task.active = false;
			});
		} else {
			const now = new Date();
			const inp_time = this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss') as string;
			this.taskService.activateTask(task.tsk_id, 1, 1, inp_time).subscribe(() => {
				task.active = true;
			});
		}
	}
}
