import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  })
export class HomeComponent implements OnInit {
  country: any;
  admin: any;
  user: any;


  constructor(private service:CommonServiceService) { }

  ngOnInit(): void {

   this.readFromFile();
   this.service.getLoggedInCountry.subscribe((name: any)  => this.country = name);
  }

 async readFromFile()
  {
    await this.service.MethodToReadFromFile(this.service.MethodToGetCurrentEnv());
    this.readUserAdmin();
  }

  readUserAdmin() {
    if(localStorage.getItem('admin')!=null)
    {
     this.admin = this.service.MethodToGetAdminOption();
     console.log(this.admin);
     this.service.option1.next(this.admin['option1']);
     this.service.option2.next(this.admin['option2']);
    }
    else{
     this.user = this.service.MethodToGetUserOption();
     console.log(this.admin,this.user);
     this.service.option1.next(this.user['option1']);
     this.service.option2.next(this.user['option2']);
     this.service.forget_password.next(this.user['forget_password']);
    }
  }
}
