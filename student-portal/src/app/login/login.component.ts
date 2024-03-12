import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private api: AdminapiService, private router:Router) { }
  email: String = "";
  password: String = "";

  adminLogin() {
    if (!this.email || !this.password) {
      Swal.fire({
        title: "Oops!",
        text: "Please fill the form completely",
        icon: "info"
      });
    }
    else {
      this.api.loginAdmin().subscribe({
        next: (res: any) => {
          // console.log(res)
          if(this.email===res.email&&this.password===res.password){
            Swal.fire({
              title: "wow",
              text: "Login Successfull",
              icon: "success"
            })    
            this.api.updateData({data:true})
            localStorage.setItem("username",res.name)  
            localStorage.setItem("password",res.password)
            this.router.navigateByUrl('dashboard')   
            
          
          }
            else{
              Swal.fire({
                title: "oops!",
                text: "Invalid Email Or Password",
                icon: "error"
              }) 
            }
        },
        error: (res: any) => {
          console.log(res)
        }
      });

    }

  }
}
