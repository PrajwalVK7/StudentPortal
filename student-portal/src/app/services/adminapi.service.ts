import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../student.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(private http: HttpClient) { }
  serverURL = 'https://student-portal-server-z0fp.onrender.com';

  loginAdmin() {
    return this.http.get(`${this.serverURL}/student/1`)
  }
  registerStudent(student: any) {
    return this.http.post(`${this.serverURL}/student`, student)
  }
  getAllStudents() {
    return this.http.get(`${this.serverURL}/student`)
  }
  deleteStudent(id: any) {
    return this.http.delete(`${this.serverURL}/student/${id}`)

  }
  viewStudentById(id: any) {
    return this.http.get(`${this.serverURL}/student/${id}`)
  }
  updateStudent(id: any, reqBody: any) {
    return this.http.put(`${this.serverURL}/student/${id}`, reqBody)
  }

  updateAdmin(reqBody: any) {
    return this.http.put(`${this.serverURL}/student/1`, reqBody)
  }
  // create a behavioral subject with an initial value
  public shareData = new BehaviorSubject(false)
  //create a function to update value

  updateData(data: any) {
    this.shareData.next(data)
  }
}
