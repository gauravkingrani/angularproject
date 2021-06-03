import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AppConfig } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  readonly rootUrl = 'http://localhost:8000';
   loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   public getLoggedInCountry:BehaviorSubject<any> = new BehaviorSubject<any>('undefined');
   public option1 = new Subject();
   public option2 = new Subject();
    forget_password: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
   public user: any;
   public admin: any;


  constructor(private http:HttpClient,private config: AppConfig) { }

  userAuthentication(signInForm:any,country:any)
  {
    this.getLoggedInCountry.next(country);
    return this.http.post(this.rootUrl+'/auth/login',signInForm);
  }

  userRegistration(signUpForm: any)
  {
    return this.http.post(this.rootUrl+'/auth/register',signUpForm);
  }

  getUserProducts(){
   if( localStorage.getItem('admin')!=null)
    {
    return this.http.get(this.rootUrl+'/products',{headers: new HttpHeaders ({ 'Authorization' : 'Bearer '+localStorage.getItem('admin')})});
  }
  else { return this.http.get(this.rootUrl+'/products',{headers: new HttpHeaders ({ 'Authorization' : 'Bearer '+localStorage.getItem('userToken')})});}
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  MethodToGetUserOption() {
    // will print 'localhost'
    console.log("Users",this.user);
    return this.user;
}

 MethodToGetAdminOption() {
  // will print 'localhost'
  console.log("Admin",this.admin);
  return this.admin;
}

 MethodToGetCurrentEnv() {
    // will print 'development'
    console.log("Env",this.config.getEnv('env'));
    return this.config.getEnv('env');
}

  async MethodToReadFromFile(env:any){
   console.log(env,this.getLoggedInCountry.getValue());
  switch (env) {
    case 'production': {
       var request =  await this.http.get('../assets/data/config.' +env+'.'+this.getLoggedInCountry.getValue()+'.json').toPromise();
       if (request) {
            this.admin = JSON.parse(JSON.stringify(request)).admin;
            this.user = JSON.parse(JSON.stringify(request)).user;
    } else {
        console.error('environmentconfig file environment.json is not valid');
    }
    } break;
    case 'development': {
      let request = await this.http.get('../assets/data/config.' +env+'.'+this.getLoggedInCountry.getValue() +'.json').toPromise();
    if (request) {
        this.admin = JSON.parse(JSON.stringify(request)).admin;
        this.user = JSON.parse(JSON.stringify(request)).user;
    } else {
        console.error('environmentconfig file environment.json is not valid');
    }
   } break;
   case 'default': {
    console.error('Environment file is not set or invalid');
  } break;

  }

}
}
