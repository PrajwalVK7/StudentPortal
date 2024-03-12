import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentdata: any = {}
  constructor(private router: ActivatedRoute, private api: AdminapiService, private route:Router) { }
  ngOnInit(): void {
    this.router.params.subscribe((res: any) => {
      const { id } = res;
      // console.log(id)
      this.getStudentDetails(id)
    })
  }
  getStudentDetails(id: any) {
    this.api.viewStudentById(id).subscribe({
      next: (res: any) => {
        this.studentdata = res;
        // console.log(this.studentdata)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  editStudent(id:any){
    this.api.updateStudent(id,this.studentdata).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: "wow!",
          text: "Successfully Updated student",
          icon: "success"
        })       
         this.route.navigateByUrl('students')

      },
      error:(err)=>{
        console.log(err)
        Swal.fire({
          title: "oops!",
          text: "Failed to update student",
          icon: "error"
        }) 
      }
    })
  }
  restore(id:any){
    this.getStudentDetails(id)
  }
  
}
