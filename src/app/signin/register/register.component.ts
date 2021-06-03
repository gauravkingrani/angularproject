import { CommonServiceService } from './../../common-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  forms: FormGroup;

  constructor(private formBuilder: FormBuilder,public service: CommonServiceService,private router: Router) { }

  ngOnInit(): void {
    this.forms = this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })

    console.log("forget pass",this.service.forget_password.getValue())
  }

  submit(): void {
    console.log(this.forms.value);
    this.service.userRegistration(this.forms.getRawValue())
    .subscribe(res => {console.log(res);
      this.router.navigate(['/login']);
    })
  }


}
