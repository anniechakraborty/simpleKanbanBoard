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
  protected todoTasks: [] = [];
  protected inProgressTasks: [] = [];
  protected finishedTasks: [] = [];

  tasksForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl(''),
  });

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(): void {
      this.getAllTasks()
  }

  onSubmit(): void{
    console.log(this.tasksForm.value);
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
}
