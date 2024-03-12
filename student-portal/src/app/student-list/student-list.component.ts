import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  allStudents: any = [];
  searchKey: string = "";
  p:number=1;
  constructor(private api: AdminapiService) { }
  ngOnInit(): void {
    this.getAllStudents();
  }
  getAllStudents() {
    this.api.getAllStudents().subscribe({
      next: (res: any) => {
        // console.log(res)
        this.allStudents = res;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  deleteStudent(id: any) {
    this.api.deleteStudent(id).subscribe({
      next: (res: any) => {
        // console.log(res)
        Swal.fire({
          title: "wow!",
          text: "Successfully deleted student",
          icon: "success"
        })
        this.getAllStudents()
      },
      error: (err) => {
        Swal.fire({
          title: "oops!",
          text: "Failed to delete student",
          icon: "error"
        })
      }
    })
  }

  sortById() {
    this.allStudents.sort((a: any, b: any) => {
      return a.id - b.id
    })
  }

  sortByname() {
    //  localcompare() is ued to compare strings
    this.allStudents.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name)
    })
  }

generatePdf(){
  const pdf = new jsPDF();
  let head:any=[['id','Name','Email','Status']]
  let body:any = []
    this.allStudents.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.status])
    })
    console.log(body)

    pdf.setFontSize(16);
    pdf.text('Student Details',10,10);
    autoTable(pdf,{head:head,body:body})
    pdf.output('dataurlnewwindow');
    pdf.save("student-detials.pdf")
}
}
