import { Router } from '@angular/router';
import { CommonServiceService } from './../common-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  forms: FormGroup;
  isLoginError: boolean = false;
  selected:any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private service: CommonServiceService,private router:Router ) { }

  ngOnInit(): void {
    this.forms = this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })

  }


  submit() {
    console.log(this.forms.value);
    if(this.forms.valid)
    {

      if(String(this.forms.controls.email.value).includes("admin"))
      {
        this.service.userAuthentication(this.forms.getRawValue(),this.selected).subscribe((data: any)=> {
          localStorage.setItem('admin',data.access_token);
          this.service.loggedIn.next(true);
          this.router.navigate(['/'])
        },
        (error: HttpErrorResponse)=>{
          this.isLoginError=true;
        });
      }
      else{
      this.service.userAuthentication(this.forms.getRawValue(),this.selected).subscribe((data: any)=> {
        localStorage.setItem('userToken',data.access_token);
        this.service.loggedIn.next(true);
        this.router.navigate(['/'])
      },
      (error: HttpErrorResponse)=>{
        this.isLoginError=true;
      });
    }
    }
  }
}
