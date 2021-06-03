import { Router } from '@angular/router';
import { CommonServiceService } from './../common-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  country: any;
  forms: FormGroup;
  isLoginError: boolean = false;
  option1: boolean;
  option2: boolean;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,public service: CommonServiceService,private router:Router ) { }

  ngOnInit(): void {
    this.forms = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

   this.service.getLoggedInCountry.subscribe((name: any)  => this.country = name);
   this.service.option1.subscribe((a: any)  => this.option1 = a);
   this.service.option2.subscribe((b: any)  => this.option2 = b);
   console.log("option1",this.option1);
   console.log("option2",this.option2);
  }

  logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('admin');
    this.service.loggedIn.next(false);
    this.router.navigateByUrl('/login');
  }

}
