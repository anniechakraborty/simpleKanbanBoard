import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TasksInterface } from '../../interfaces/tasks-interface';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private apiUrl: string = "http://127.0.0.1:5000/tasks";
  protected todoTasks: TasksInterface[] = [];
  protected inProgressTasks: TasksInterface[] = [];
  protected finishedTasks: TasksInterface[] = [];
  modalTitle: string = '';

  tasksForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(): void {
      this.modalTitle = 'Add Task';
      this.getAllTasks();
  }

  addTask(){
    this.modalTitle = 'Add Task';
    this.tasksForm.reset();
  }

  onSubmit(): void{
    console.log(this.tasksForm.valid);
    this.http.post(
      this.apiUrl + '/',
      this.tasksForm.value,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    ).subscribe(data => {
      console.log('Task added successfully', data);
      this.tasksForm.reset();
      this.getAllTasks();
    })
  }

  getAllTasks() {
    this.http.get(
      this.apiUrl + '/',
      {
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('token')
        }
      }
    ).subscribe((res: any) => {
      console.log('Tasks fetched : ', res);
      if(res && res.task){
        this.todoTasks = res.task.filter((task: TasksInterface)=> Number(task.status) === 0);
        this.inProgressTasks = res.task.filter((task: TasksInterface)=> Number(task.status) === 1);
        this.finishedTasks = res.task.filter((task: TasksInterface)=> Number(task.status) === 2);
      }
    })
  }

  getTaskById(taskId: string){
    console.log(taskId);
    this.http.get(
      this.apiUrl + '/' + taskId,
      {
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('token')
        }
      }
    ).subscribe((res: any) => {
      console.log('Task fetched : ', res);
      if(res.status == 200) {
        this.modalTitle = 'Edit Task';
        this.tasksForm.patchValue({
          title: res.task.title,
          description: res.task.description,
          status: res.task.status
        });
      }
    })
  }
}
