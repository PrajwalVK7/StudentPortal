import { Component } from '@angular/core';
import { Student } from '../student.model';
import Swal from 'sweetalert2';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent {
  student: any = {}
  constructor(private api: AdminapiService,private router:Router) { }
  addStudent() {
    const { id, name, email, status } = this.student;
    if (!id || !name || !email || !status) {
      Swal.fire({
        title: "oops!",
        text: "Please fill the form completely",
        icon: "error"
      })
    }
    else {
      this.api.registerStudent(this.student).subscribe({
        next: (res: any) => {
          console.log(res)
          Swal.fire({
            title: "wow!",
            text: "Successfully added student",
            icon: "success"
          })
          this.student={}
          this.router.navigateByUrl('students');
        },
        error: (err: any) => {
          Swal.fire({
            title: "oops!",
            text: "Failed to add student",
            icon: "error"
          })
          console.log(err)
        }
      })
    }
  }
  resetdata(){
    this.student="";
    
  }
}
