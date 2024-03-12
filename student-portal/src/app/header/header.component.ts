import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogged : boolean = false
  constructor(private router:Router,private api : AdminapiService){
    this.api.shareData.subscribe((data:any)=>{
      this.isLogged=data;
    })
  }
logout(){
  localStorage.removeItem("username");
  localStorage.removeItem("password")
  this.isLogged=false
  this.router.navigateByUrl("")
}
}
