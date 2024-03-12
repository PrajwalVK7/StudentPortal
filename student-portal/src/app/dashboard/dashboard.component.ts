import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: any = ""
  studentCount: number = 0
  showSideBar: boolean = true;
  selected: Date | null = new Date()
  Highcharts = Highcharts;
  chartOptions: {}
  adminDetails: any = {}
  profileImage: string = './assets/images/sample-profile.jpg'
  editAdminStatus: boolean = false
  constructor(private api: AdminapiService) {
    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Student Details'
      },
      tooltip: {
        valueSuffix: '%'
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      series: [
        {
          name: 'Percentage',
          colorByPoint: true,
          data: [
            {
              name: 'B.tech',
              y: 55.02
            },
            {
              name: 'MCA',
              sliced: true,
              selected: true,
              y: 26.71
            },
            {
              name: 'BCA',
              y: 10.2
            },
            {
              name: 'Mtech',
              y: 15.5
            },
            {
              name: 'Diploma',
              y: 1.68
            }
          ]
        }
      ]
    };

  }

  ngOnInit(): void {
    this.getTotalStudents()
    if (localStorage.getItem("username")) {
      this.username = localStorage.getItem("username")
    }
    this.api.loginAdmin().subscribe((res: any) => {
      this.adminDetails = res;
      // console.log(this.adminDetails)
      if (res.picture) {
        this.profileImage = res.picture;
      }
    })
  }

  menuBar() {
    this.showSideBar = !this.showSideBar
  }
  getTotalStudents() {
    this.api.getAllStudents().subscribe({
      next: (res: any) => {
        console.log(res)
        this.studentCount = res.length - 1;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  edit() {
    this.editAdminStatus = true
  }
  returnFromEdit() {

    this.editAdminStatus=false
  }
  getFile(event: any) {
    let fileDetails = event.target.files[0];
    console.log(fileDetails)
    // filereader is used to convert the image selected into url
    let fr = new FileReader();
    fr.readAsDataURL(fileDetails)
    fr.onload = (event: any) => {
      // console.log(event.target.result)
      this.profileImage = event.target.result;
      this.adminDetails.picture = this.profileImage;
    }

  }
  updateAdmin() {
    {
      console.log(this.adminDetails)
      this.api.updateAdmin(this.adminDetails).subscribe({
        next: (res: any) => {
          console.log(res)
          localStorage.setItem("username", res.name)
          localStorage.setItem("pasword", res.password)
          this.username = localStorage.getItem("username")
          this.editAdminStatus=false

        },
        error: (err: any) => {
          console.log(err)
        }

      })
    }

  }
}
