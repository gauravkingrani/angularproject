import { Router } from '@angular/router';
import { CommonServiceService } from './../common-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  forms: FormGroup;
  isLoginError: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private service: CommonServiceService,private router:Router ) { }

  ngOnInit(): void {
    this.forms = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  submit() {
    console.log(this.forms.value);
    if(this.forms.valid)
    {
      this.service.userAuthentication(this.forms.getRawValue(),"India").subscribe((data: any)=> {
        localStorage.setItem('admin',data.access_token);
        this.service.loggedIn.next(true);
        this.router.navigate(['/'])
      },
      (error: HttpErrorResponse)=>{
        this.isLoginError=true;
      });
    }
  }
}
